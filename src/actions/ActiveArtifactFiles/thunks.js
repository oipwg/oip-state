import { 
    setActiveArtifactFile, 
    addToActiveArtifactFiles,
    filePaySuccessPlay,
    filePaySuccessBuy,
    filePayInProgressPlay,
    filePayInProgressBuy,
    filePayErrorPlay,
    filePayErrorBuy
} from "./actions";

// -------------------------------------------------------------------------------------------------

let toUID = (artifact, file) => {
    let files = artifact.getFiles();

    for (var i = 0; i < files.length; i++) {
        if (files[i].getFilename() === file.getFilename() && files[i].getDisplayName() === file.getDisplayName() && files[i].getFilesize() === file.getFilesize()){
            return artifact.getTXID() + "|" + i;
        }
    }
}

// Set Active File
export const setActiveFile = (artifact, file) => dispatch => {
    dispatch(setActiveArtifactFile(toUID(artifact, file)))
}


export const addToActiveFiles = (artifact, file) => dispatch => {
    dispatch(addToActiveArtifactFiles(file, toUID(artifact, file)))
}

export const paymentSuccess = (artifact, file, type) => (dispatch) => {
    let uid = toUID(artifact, file)

    if (type === "buy")
        dispatch(filePaySuccessBuy(uid))
    else if (type === "play")
        dispatch(filePaySuccessPlay(uid))
}

export const paymentInProgress = (artifact, file, type) => (dispatch) => {
    let uid = toUID(artifact, file)

    if (type === "buy")
        dispatch(filePayInProgressBuy(uid))
    else if (type === "play")
        dispatch(filePayInProgressPlay(uid))
}

export const paymentError = (artifact, file, type, error_text) => (dispatch) => {
    let uid = toUID(artifact, file)

    if (type === "buy")
        dispatch(filePayErrorBuy(uid, error_text))
    else if (type === "play")
        dispatch(filePayErrorPlay(uid, error_text))
}

// -------------------------------------------------------------------------------------------------
