import puppeteer, {Browser} from "puppeteer";
import injectHTML from "./injectHTML";
import {promisify} from 'util';
import fs from 'fs';
const readFileAsync = promisify(fs.readFile);
import {IElement, Sprite} from "shared";
import spriteSheet from "./spritesheet";

let css: string;

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

		// input HTML here
		await page.setContent(`<head><style>${css}</style></head><body style='margin: 0'>
		<div id='level'></div>
		<script>
			const elements = ${JSON.stringify(elements)};
			const injectHTML = ${String(injectHTML)};
			const se = ${JSON.stringify(Sprite)};
			const spriteSheet = "${spriteSheet}";
			injectHTML(elements, se, spriteSheet);
		</script>
		</body>`);

		// take screenshot
		const rect: any = await page.evaluate(selector => {
			// injectHTML(elements, document);
			const element = document.querySelector(selector);
			const {x, y, width, height} = element.getBoundingClientRect();
			return {left: x, top: y, width, height, id: element.id};
		}, "#level");

		const base64 = await page.screenshot({
			encoding: 'base64',
			type: "png",
			clip: {x: rect.left, y: rect.top, width: rect.width, height: rect.height},
			omitBackground: true,
		});

		await page.close();
		images.push(`data:image/png;base64,${base64}`);
	}
	await browser.close();
	return images
}

export default generateImage;
