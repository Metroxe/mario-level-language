import p from 'path';
import fs from 'fs-extra';
import axios from 'axios';
import JSZip from "jszip";

// CONSTANTS
const GET_REPO = 'https://api.github.com/repos/';
const regex = /(http(s)?:(\/\/))?(www\.)?github.com(\/.+\/.+)/;
const hostRegex = /(http(s)?:(\/\/))?(www\.)?github.com\//;
const gitRegex = /.*(.git)/;
const jsRegex = /(\w*)\.js$/;
const regexList = [/.*(eslint(.+).js).*/, /.*(test.js)/];

/**
 * Save the repo to a temporary directory, every repo saved should have its own temporary
 * directory to avoid overlapping repos being analyzed at the same time. At the end, return
 * the path of the directory
 * @param url of the repo
 */
async function saveRepo(url: string): Promise<string> {
	if (!regex.test(url)) {
		throw new Error(`${url} is not a valid url`);
	}

	try {
		const request = generatePathAndRequest(url);
		// await createDirectory(path);
		let path =await fetchRepo(request);
		return p.join(__dirname, path);
	} catch(e) {
		throw new Error(e);
	}
}

/**
 * remove the repo from the directory. This function is called in case of errors, so make sure
 * it still works even if there is nothing at the directory
 * @param directory of the repo on the local
 */
async function deleteRepo(directory: string): Promise<void> {
	console.log(`Deleting directory: ${directory}`);
	await fs.remove(directory);
	return;
}

/**
 * Return path of directory
 * @param url is the url to fetch the repo
 */
async function fetchRepo(url: string): Promise<string> {
	let path;
	try {
		console.log(`Fetching Repo: ${url}`);
		// get response as array buffer
		let res = await axios.get(url , {responseType: 'arraybuffer'});
		console.log('Done Fetching Repo');

		const zip = new JSZip();
		let data = await zip.loadAsync(res.data);
		for (let [key, value] of Object.entries(data.files)) {
			(path) ? await saveFile(value) : path = await saveFile(value);
		}

		return path;
	} catch (e) {
		throw new Error(e);
	}
}

/**
 * return path of file
 * @param file is the loaded file
 */
async function saveFile(file: JSZip.JSZipObject): Promise<string> {
	if (file.dir) {
		await createDirectory(p.join(__dirname, file.name));
		return file.name;
	} else {
		if (isJS(file.name) && !isMatch(file.name)) {
			try {
				console.log(`Saving file: ${file.name}`);
				let data = await file.async('binarystring');
				await fs.writeFile(p.join(__dirname, file.name), data);
				console.log('Done saving file');
			} catch (e) {
				throw new Error(e);
			}
		}
		return null;
	}
}

/**
 * checks if the file or directory is in disk
 * @param path of file or directory
 */
async function exists(path: string): Promise<boolean> {
	try {
		await fs.access(path, fs.constants.F_OK);
		return false;
	} catch (e) {
		// check for better exists?
		return true;
	}
}

/**
 * Checks if directory is, if not create the directory given the path
 * @param path of directory
 */
async function createDirectory(path: string): Promise<void> {
	if (!await exists(path)) {
		return;
	}
	try {
		await fs.mkdir(path);
		return;
	} catch(e) {
		throw new Error(e);
	}
}

function generatePathAndRequest(url: string): string {
	const cleanUrl = url.replace(hostRegex, "");
	return generateRequest(cleanUrl.replace(gitRegex, ""));
}

function generateRequest(path: string): string {
	return `${GET_REPO}${path}/zipball/master`
}

function isJS(name: string): boolean {
	return jsRegex.test(name);
}

function isMatch(name: string): boolean {
	return regexList.some(rx => rx.test(name));
}

/**
 * return a list of files given the path
 * @param path
 */
async function readFiles(path: string): Promise<string[]> {
	let files = await fs.readdir(path);
	return files;
}

export {saveRepo, deleteRepo, readFiles}