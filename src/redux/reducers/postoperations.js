import { GET_POSTS, GET_SPOST ,EDIT_POST} from "../actions";
const initialState={
    post:[],
    singlePost:[]
}
export default function postoperationReducer(state=initialState,action){
    switch(action.type){
        case GET_POSTS:{
            let post=action.payload;
            return {
                ...state,
                post:post
            }
        }
        case GET_SPOST:{
            let singlePost=action.payload;
            return{
                ...state,
                singlePost:singlePost
            }
            }
        case EDIT_POST:{
            let editedPost=action.payload;
            return{
                ...state,
                singlePost:editedPost
            }
        }
        default: return state
    }
}