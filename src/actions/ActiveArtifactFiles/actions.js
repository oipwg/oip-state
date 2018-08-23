export const SET_ACTIVE_FILE = 'SET_ACTIVE_FILE'
export const ADD_FILE = 'ADD_FILE'
export const CLEAR_ACTIVE_ARTIFACT_FILES = 'CLEAR_ACTIVE_ARTIFACT_FILES'
export const FILE_PAY_SUCCESS_PLAY = 'FILE_PAY_SUCCESS_PLAY'
export const FILE_PAY_SUCCESS_BUY = 'FILE_PAY_SUCCESS_BUY'
export const FILE_PAY_IN_PROGRESS_PLAY = 'FILE_PAY_IN_PROGRESS_PLAY'
export const FILE_PAY_IN_PROGRESS_BUY = 'FILE_PAY_IN_PROGRESS_BUY'
export const FILE_PAY_ERROR_PLAY = 'FILE_PAY_ERROR_PLAY'
export const FILE_PAY_ERROR_BUY = 'FILE_PAY_ERROR_BUY'

// -------------------------------------------------------------------------------------------------

export const setActiveArtifactFile = (uid) => ({
    type: SET_ACTIVE_FILE,
    uid
})

export const addToActiveArtifactFiles = (file, uid) => ({
    type: ADD_FILE,
    uid,
    isPaid: file.isPaid(),
    file
})

export const clearActiveArtifactFiles = () => ({
    type: CLEAR_ACTIVE_ARTIFACT_FILES
})

export const filePaySuccessPlay = (uid) => ({
    type: FILE_PAY_SUCCESS_PLAY,
    uid
})

export const filePaySuccessBuy = (uid) => ({
    type: FILE_PAY_SUCCESS_BUY,
    uid
})

export const filePayInProgressPlay = (uid) => ({
    type: FILE_PAY_IN_PROGRESS_PLAY,
    uid
})

export const filePayInProgressBuy = (uid) => ({
    type: FILE_PAY_IN_PROGRESS_BUY,
    uid
})

export const filePayErrorPlay = (uid, error) => ({
    type: FILE_PAY_ERROR_PLAY,
    uid,
    error
})

export const filePayErrorBuy = (uid, error) => ({
    type: FILE_PAY_ERROR_BUY,
    uid,
    error
})