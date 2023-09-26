import { LOGIN} from "../actions";
const initialState={
    uid:null,
    userObject:{
        "name": "",
        "email": "",
        "password":"",
        "uid": null,
        "phone": "",
        "img": ""
    }
}
export default function operationReducer(state=initialState,action){
    switch(action.type){
        case LOGIN:{
            const uid=action.payload;
            return {
                ...state,
                uid:uid
            }
        }
        
        default: return state
    }
}