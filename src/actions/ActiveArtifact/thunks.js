import {
	fetchingArtifact,
	_setActiveArtifact,
	fetchArtifactError
} from "./actions";

import { setActiveFile, addToActiveFiles } from '../ActiveArtifactFiles/thunks'

// -------------------------------------------------------------------------------------------------
// SELECT CURRENT ARTIFACT

export const setActiveArtifact = (artifact, callback) => (dispatch) => {
	// Set the Active Artifact
	dispatch(_setActiveArtifact(artifact))
	if (artifact) {
		// Get all the files in the Artifact
		let files = artifact.getFiles()
		// Add all Files to the ActiveFiles
		for (let i = 0; i < files.length; i++){
			dispatch(addToActiveFiles(files[i]))
		}

		// Set the first file to be active (by default)
		dispatch(setActiveFile(files[0]))

		// Pass back the artifact to a callback if provided
		if (callback)
			callback(artifact)
	}
}

export const loadActiveArtifact = (txid, callback) => async (dispatch, getState) => {
	dispatch(fetchingArtifact());

	let state = getState();

	let artifact
	try {
		artifact = await state.OIPIndex.Index.getArtifact(txid)
	} catch (e) {
		dispatch(fetchArtifactError("Error fetching Artifact!"))
		console.error(e)
	}

	// Set the Active Artifact
	dispatch(setActiveArtifact(artifact, callback))
};