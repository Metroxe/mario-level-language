import puppeteer, {Browser} from "puppeteer";
import injectHTML from "./injectHTML";
import {promisify} from 'util';
import fs from 'fs';
const readFileAsync = promisify(fs.readFile);
import {IElement, Sprite} from "shared";
import spriteSheet from "./spritesheet";

let css: string;

const DIMENSION_RATIO = 16;

async function generateImage(elementsArray: Array<IElement[]>): Promise<string[]> {

	// start puppeteer
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage'],
		executablePath: process.env.CHROME_BIN || null,
	});

	const images: string[] = [];
	for (const elements of elementsArray) {
		const page = await browser.newPage();

		// get css
		if (!css) {
			css = await readFileAsync(`${__dirname}/../stylesheet.css`, {encoding: 'utf8'})
		}

		const max = grabMax(elements);
		// input HTML here
		await page.setContent(`<head><style>${css}</style></head><body style='margin: 0'>
		<div id='level'></div>
		<script>
			const elements = ${JSON.stringify(elements)};
			const injectHTML = ${String(injectHTML)};
			const se = ${JSON.stringify(Sprite)};
			const spriteSheet = "${spriteSheet}";
			const max = ${JSON.stringify(max)};
			injectHTML(elements, se, spriteSheet, max);
		</script>
		</body>`);

		// take screenshot
		// const rect: any = await page.evaluate(selector => {
		// 	// injectHTML(elements, document);
		// 	const element = document.querySelector(selector);
		// 	const {x, y, width, height} = element.getBoundingClientRect();
		// 	return {left: x, top: y, width, height, id: element.id};
		// }, "#level");

		await page.setViewport({
			width: max.x,
			height: max.y
		});
		const rect = await page.$('#level');
		const box = await rect.boundingBox();

		const base64 = await page.screenshot({
			encoding: 'base64',
			type: "png",
			clip: {
				x: box.x,
				y: box.y,
				width: box.width,
				height: box.height
			},
			omitBackground: true,
		});

		await page.close();
		images.push(`data:image/png;base64,${base64}`);
	}
	await browser.close();
	return images
}

/**
 * Grabs the max x and y pos of the elements
 * @param elements
 */
function grabMax(elements: IElement[]) {
	let maxX = 0;
	let maxY = 0;

	for (let element of elements) {
		if (element.x > maxX) {
			maxX = element.x;
		}
		if (element.y > maxY) {
			maxY = element.y;
		}
	}

	return {x: (maxX + 1) * DIMENSION_RATIO, y: (maxY + 1) * DIMENSION_RATIO};
}

export default generateImage;
