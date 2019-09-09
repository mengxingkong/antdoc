/**
 * reducer 数据处理
 */
import {type} from './../action/index'
 const initialState = {
     menuName:''
 }

 export default (state=initialState, action) => {
    switch(action.type){
        case type.SWITCH_MENU:
            return{
                ...state,
                menuName:action.menuName
            };
        default:
            return {...state};
    }
 }