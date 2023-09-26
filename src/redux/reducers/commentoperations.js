import { GET_COMMENTS } from "../actions";
const initialState={
    comments:[]
}
export default function commentoperationReducer(state=initialState,action){
    switch(action.type){
        case GET_COMMENTS:{
            let comments=action.payload;
            return {
                ...state,
                comments:comments
            }
        }
        default: return state
        }
    }
