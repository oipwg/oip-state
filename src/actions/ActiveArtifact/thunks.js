import {
    fetchingArtifact,
    setActiveArtifact,
    fetchArtifactError
} from "./actions";

// -------------------------------------------------------------------------------------------------
// SELECT CURRENT ARTIFACT

export const loadActiveArtifact = (txid) => async (dispatch, getState) => {
    dispatch(fetchingArtifact());

    let state = getState();
    try {
        let artifact = await state.OIPIndex.Index.getArtifact(txid)
        dispatch(setActiveArtifact(artifact))
    } catch (e) {
        dispatch(fetchArtifactError("Error fetching Artifact!"))
        console.error(e)
    }
};