import { setActiveArtifactFile, addToActiveArtifactFiles } from "./actions";

// -------------------------------------------------------------------------------------------------
// Set Active File

export const setActiveFile = (artifact, file) => dispatch => {
    let files = artifact.getFiles();

    for (var i = 0; i < files.length; i++) {
        if (files[i].getFilename() === file.getFilename() && files[i].getDisplayName() === file.getDisplayName() && files[i].getFilesize() === file.getFilesize()){
            dispatch(setActiveArtifactFile(artifact.getTXID() + "|" + i));
        }
    }
}


export const addToActiveFiles = (artifact, file) => dispatch => {
    let files = artifact.getFiles();

    for (var i = 0; i < files.length; i++) {
        if (files[i].getFilename() === file.getFilename() && files[i].getDisplayName() === file.getDisplayName() && files[i].getFilesize() === file.getFilesize()){
            dispatch(addToActiveArtifactFiles(file, artifact.getTXID() + "|" + i));
        }
    }
}

// -------------------------------------------------------------------------------------------------
