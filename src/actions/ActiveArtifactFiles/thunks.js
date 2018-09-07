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
	playPauseAudioFile
} from "./actions";

// -------------------------------------------------------------------------------------------------

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

// Set Active File
export const setActiveFile = (file) => dispatch => {
	let uid = file ? fileToUID(file) : undefined;
	dispatch(setActiveArtifactFile(uid))
}

export const addToActiveFiles = (file) => dispatch => {
	dispatch(addToActiveArtifactFiles(file, fileToUID(file)))
}

export const manageMediaState = (uid, file, type) => (dispatch, getState) => {
	let state = getState();

	if (state.ActiveArtifactFiles[uid].isPlaying) {
		dispatch(playPauseAudioFile(uid, false))
	} else {dispatch(playPauseAudioFile(uid, true))}
}

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

	dispatch(manageMediaState(uid, file, type))
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
