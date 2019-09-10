import {IElement} from "shared";

function injectHTML(elements: IElement[]): string {
	let x = 5;
	let y = 5;

	let test = createMatrix(x, y);



	let html = drawMatrix(test);

	return html;
}

function drawMatrix(matrix) {
	let htmlString = '';

	for (let x = 0; x < matrix.length; x++) {
		for (let y = 0; y < matrix.length; y++) {
			switch (matrix[x][y]) {
				case 0:
				default:
					htmlString += '<div class=".empty">&nbsp;</div>'
			}
		}
	}

	return htmlString;
}

/**
 * creates matrix given x and y
 * @param x
 * @param y
 */
function createMatrix(x: number, y: number) {
	const matrix = Array(x);
	// all start with -1
	matrix.fill(Array(y).fill(-1));

	return matrix;
}


function searchMatrix(x: number, y: number) {

}

function replaceMatrix(x: number, y: number, matrix, add) {
	matrix[x][y] = add;
}

export default injectHTML;
