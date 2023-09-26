import { combineReducers } from "redux";

import operationReducer from "./operations";
import postoperationReducer from "./postoperations";
import commentoperationReducer from "./commentoperations";

const reducers = combineReducers({
    operationReducer,
    postoperationReducer,
    commentoperationReducer

});

export default reducers;