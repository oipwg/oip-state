import * as actions from '../actions/OIPIndex/actions'
import { Index } from "oip-index";

let Network = new Index()

// Only return the initial state, that is all we care about.
export const OIPIndex = (state = {Index: Network}) => {
    return state
}