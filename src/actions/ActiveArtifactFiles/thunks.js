import { downloadFile } from '../../browser/util'

import {
	setActiveArtifactFile,
	addToActiveArtifactFiles,
	filePaySuccessView,
	filePaySuccessBuy,
	filePayInProgressView,
	filePayInProgressBuy,
	filePayCancelView,
	filePayCancelBuy,
	filePayErrorView,
	filePayErrorBuy,
	playFile,
	pauseFile
} from "./actions";

// ------------------- HELPERS ------------------- 

export const toUID = (artifact, file) => {
	let files = artifact.getFiles();

	for (var i = 0; i < files.length; i++) {
		if (files[i].getFilename() === file.getFilename() && files[i].getDisplayName() === file.getDisplayName() && files[i].getFilesize() === file.getFilesize()){
			return artifact.getTXID() + "|" + i;
		}
	}
}

export const fileToUID = (file) => {
	if (file === undefined) {return undefined}
	let files = file.parent.getFiles();

	for (var i = 0; i < files.length; i++) {
		if (files[i].getFilename() === file.getFilename() && files[i].getDisplayName() === file.getDisplayName() && files[i].getFilesize() === file.getFilesize()){
			return file.parent.getTXID() + "|" + i;
		}
	}
};

export const getFileExtension = (file) => {
	let splitFilename = file.getFilename().split(".");
	let indexToGrab = splitFilename.length - 1;
	return splitFilename[indexToGrab].toLowerCase();
}

// ------------------- ActiveFile manipulation ------------------- 

export const setActiveFile = (file) => dispatch => {
	let uid = file ? fileToUID(file) : undefined;
	dispatch(setActiveArtifactFile(uid))
}

export const addToActiveFiles = (file) => dispatch => {
	dispatch(addToActiveArtifactFiles(file, fileToUID(file)))
}

// ------------------- Media Manipulation ------------------- 

export const pauseAllExcept = (uid) => (dispatch, getState) => {
	let state = getState()

	for (let id in state.ActiveArtifactFiles){
		if (id !== "active" && id !== uid && state.ActiveArtifactFiles[id].isPlaying){
			dispatch(pauseFile(id))
		}
	}
}

export const skipBack = () => (dispatch, getState) => {
	let state = getState();

	// Check if we have an active file, if we don't, then we can't be reactive to it
	if (!state.ActiveArtifactFiles.active)
		return

	let previous_file_uid
	let last_file_uid
	let matched = false

	// Grab the ArtifactFile right before the active one
	for (let uid in state.ActiveArtifactFiles){
		if (uid !== 'active' && !matched){
			if (uid !== state.ActiveArtifactFiles.active)
				previous_file_uid = uid
			else
				matched = true
		}

		if (uid !== "active"){
			// Make sure we are an audio or video file
			if (state.ActiveArtifactFiles[uid].ArtifactFile.getType() === "Audio" || state.ActiveArtifactFiles[uid].ArtifactFile.getType() === "Video"){
				last_file_uid = uid
			}
		}
	}

	// Check if we matched to the first item, and if we did,
	// then to set the previous_file_uid to the last_file_uid 
	if (matched && !previous_file_uid)
		previous_file_uid = last_file_uid

	// If we did match, then set it to active and playing
	if (previous_file_uid){
		dispatch(setActiveArtifactFile(previous_file_uid))

		dispatch(pauseAllExcept(previous_file_uid))

		dispatch(playFile(previous_file_uid))
	}
}

export const skipForward = () => (dispatch, getState) => {
	let state = getState();

	// Check if we have an active file, if we don't, then we can't be reactive to it
	if (!state.ActiveArtifactFiles.active)
		return

	let next_file_uid
	let first_file_uid
	let matched = false

	// Grab the ArtifactFile right before the active one
	for (let uid in state.ActiveArtifactFiles){
		if (uid !== 'active'){
			// Check if we have grabbed a UID yet for the first
			// file. If not, then grab it.
			if (!first_file_uid){
				// Check if we are an audio or video file
				if (state.ActiveArtifactFiles[uid].ArtifactFile.getType() === "Audio" || state.ActiveArtifactFiles[uid].ArtifactFile.getType() === "Video"){
					first_file_uid = uid
				}
			}

			// Check if we have matched, but we haven't set the next file yet
			if (matched && !next_file_uid)
				next_file_uid = uid

			// Check if we are a match
			if (uid === state.ActiveArtifactFiles.active)
				matched = true
		}
	}

	// Check if we matched to the last item, and if we did,
	// then to set the next_file_uid to the first_file_uid 
	if (matched && !next_file_uid)
		next_file_uid = first_file_uid

	// If we did match, then set it to active and playing
	if (next_file_uid){
		dispatch(setActiveArtifactFile(next_file_uid))

		dispatch(pauseAllExcept(next_file_uid))

		dispatch(playFile(next_file_uid))
	}
}

export const updateMediaState = (uid, file, type) => (dispatch, getState) => {
	let state = getState();

	dispatch(pauseAllExcept(uid))

	if (state.ActiveArtifactFiles[uid].isPlaying) {
		dispatch(pauseFile(uid))
	} else {
		dispatch(playFile(uid))
	}
}

// ------------------- Payment Thunks ------------------- 

export const paymentSuccess = (file, type) => (dispatch, getState) => {
	let uid = fileToUID(file)

	let state = getState()

	if (state.ActiveArtifactFiles.active !== uid)
		dispatch(setActiveArtifactFile(uid))

	if (type === "buy"){
		dispatch(filePaySuccessBuy(uid))
		downloadFile(file)
	} else if (type === "view"){
		dispatch(filePaySuccessView(uid))
	}

	dispatch(updateMediaState(uid, file, type))
}

export const paymentInProgress = (file, type) => (dispatch) => {
	let uid = fileToUID(file)

	if (type === "buy")
		dispatch(filePayInProgressBuy(uid))
	else if (type === "view")
		dispatch(filePayInProgressView(uid))
}

export const paymentCancel = (file, type) => (dispatch) => {
	let uid = fileToUID(file)

	if (type === "buy")
		dispatch(filePayCancelBuy(uid))
	else if (type === "view")
		dispatch(filePayCancelView(uid))
}

export const paymentError = (file, type, error_text) => (dispatch) => {
	let uid = fileToUID(file)

	if (type === "buy")
		dispatch(filePayErrorBuy(uid, error_text))
	else if (type === "view")
		dispatch(filePayErrorView(uid, error_text))
}

// -------------------------------------------------------------------------------------------------
