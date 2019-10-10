import cloneDeep from "lodash/cloneDeep";
import flatten from "lodash/flatten";

function splitAndKeep(str: string, deliminator: string): string[] {
	const index = str.indexOf(deliminator);
	if (index < 0) {
		return [str]
	}

	return flatten([
		splitAndKeep(str.substr(0, index), deliminator),
		deliminator,
		splitAndKeep(str.substr(index + 1, str.length), deliminator)
	]).filter(s => s.length > 0);
}

function tokenize(input: string): string[] {
	// clone deep
	let clean = cloneDeep(input);

	// remove excess spaces and lines
	clean = clean.trim();

	// remove comments
	let tokenized = clean.split("\n");
	tokenized = tokenized.map(m => m.includes('#') ? m.substring(0, m.indexOf('#')) : m);

	// remove empty lines
	tokenized = tokenized.filter(l => l.split(' ').join('').length > 0);

	// remove tabs
	tokenized = tokenized.map(m => m.replace("\t", " "));

	// join spaces
	tokenized = tokenized.map(m => m.replace("  ", " "));

	// remove spaces at start of lines
	tokenized = tokenized.map(m => m[0] === " " ? m.substr(1) : m);

	// split on spaces and join lines
	tokenized = flatten(tokenized.map(s => s.split(" ")));

	// separate out ;, (, ), [, ], , for easy detection
	tokenized = flatten(tokenized.map(s => splitAndKeep(s, ";")));
	tokenized = flatten(tokenized.map(s => splitAndKeep(s, "(")));
	tokenized = flatten(tokenized.map(s => splitAndKeep(s, ")")));
	tokenized = flatten(tokenized.map(s => splitAndKeep(s, "[")));
	tokenized = flatten(tokenized.map(s => splitAndKeep(s, "]")));
	tokenized = flatten(tokenized.map(s => splitAndKeep(s, ",")));

	return tokenized
}

export default tokenize;