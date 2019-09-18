function parse(tokens: string[]): string[][] {
	const statements: string[][] = [];

	let start = 0;
	let inVariable = false;
	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];
		const isSemiColon: boolean = token === ";";
		const isOpenVariable: boolean = token === "[";
		const isClosedVariable: boolean = token === "]";

		// stop if not inside a variable
		if (isSemiColon && !inVariable) {
			console.log("adding", tokens.slice(start, i));
			statements.push(tokens.slice(start, i));
			start = i + 1;
			continue;
		}

		if (isOpenVariable) {
			inVariable = true;
			continue;
		}

		if (isClosedVariable) {
			inVariable = false;
		}
	}

	return statements;
}

export default parse;