import axios from  'axios';
import {getRedirectPath} from '../util';
const ERROR_MSG="ERROR_MSG";
const AUTH_SUCESS="AUTH_SUCESS";
const LOAD_DATA="LOAD_DATA";
const LOGOUT="LOGOUT";
const initState={
    redirectTo:"",
    msg:"",
    user:"",
    type:""
}
export function user(state=initState,action){
    console.log(action);
    switch (action.type) {
        case LOAD_DATA:
            return  {...state,...action.payload};
        case AUTH_SUCESS:
            return {...state,msg:"",redirectTo:getRedirectPath(action.payload),...action.payload}
        case ERROR_MSG:
            return {...state,msg:action.msg,isAuth:false};
        case LOGOUT:
            return {...initState,redirectTo:"/login"};
        default:
            return state;
    }
}
export function logoutSubmit(){
    return {type:LOGOUT}
}
function authSuccess(obj){
    //将密码过滤掉，{ pwd:""}
    console.log(obj);
    const {pwd,...data}=obj
    return {payload:data,type:AUTH_SUCESS}
}
export function loadDate(data){
    return {type:LOAD_DATA,payload:data}
}
export function update(data){
    console.log(data);
    return dispatch=>{
        axios.post("/user/update",data)
            .then(res=>{
                console.log(res);
                if(res.status===200&&res.data.code===0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
function errorMsg(msg){
    return {msg,type:ERROR_MSG}
}


export function login({user,pwd}){
    if(!user||!pwd){

        return errorMsg("用户名或密码必须输入！")
    }
    console.log(user);
    return dispatch=>{
        axios.post("/user/login",{user,pwd})
            .then(res=>{
                if(res.status===200&&res.data.code===0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errorMsg("用户名密码必须输入！")
    }
    if(pwd!==repeatpwd){
        return errorMsg("两次密码不一致")
    }
    return dispatch=>{
        console.log("111");
        axios.post("/user/register",{user,pwd,type})
            .then(res=>{
                console.log(res)
                    if(res.status===200&&res.data.code===0){
                        dispatch(authSuccess({user,pwd,type}))
                    }else{
                        dispatch(errorMsg(res.data.msg))
                    }
                }
            )
    }
}


