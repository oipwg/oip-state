import { Index } from "oip-index";

// Only return the initial state, that is all we care about.
const OIPIndex = (state = {Index: new Index()}) => {
    return state
}

export default OIPIndex