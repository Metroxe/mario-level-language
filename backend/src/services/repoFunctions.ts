/**
 * Save the repo to a temporary directory, every repo saved should have its own temporary
 * directory to avoid overlapping repos being analyzed at the same time. At the end, return
 * the path of the directory
 * @param url of the repo
 */
async function saveRepo(url: string): Promise<string> {
	return null;
}

/**
 * remove the repo from the directory. This function is called in case of errors, so make sure
 * it still works even if there is nothing at the directory
 * @param directory of the repo on the local
 */
async function deleteRepo(directory: string): Promise<void> {
	return null;
}

export {saveRepo, deleteRepo}