import io from 'socket.io-client';
import axios from "axios";
//由于是跨域的所以要这样写，如果不是跨域，需要io()
const socket = io("ws://localhost:9093");
//获取聊天列表
const MSG_LIST="MSG_LIST";
//读取信息
const MSG_RECV="MSG_RECV";
//标识已读
const MSG_READ="MSG_READ";
const initState={
    chatMsg:[],
    users:{},
    unread:0
}

export function chat(state=initState,action){
    switch (action.type) {
        case MSG_LIST:
            return {...state,users:action.payload.users,chatMsg: action.payload.msg,unread:action.payload.msg.filter(v=>!v.read&&v.to===action.payload.userid).length}//为读并且目标是自己
        case MSG_RECV:
            const n=action.payload.to===action.userid?1:0;
            return {...state,chatMsg:[...state.chatMsg,action.payload],unread:state.unread+n}
        case MSG_READ:
        default:
            return state;
    }
}
export function sendMsg({from,to,msg}){
    console.log({from,to,msg});
    return dispatch=>{
        socket.emit("sendMsg",{from,to,msg})
    }
}

function msgList(msg,users,userid){
    return {type:MSG_LIST,payload:{msg,users,userid}}
}
function msgRecv(data,userid){
    return {type:MSG_RECV,payload:data,userid}
}
export function reavMsg(){
    return (dispatch,getState)=>{
        socket.on("recvMsg",function(data){
            const userid=getState().user._id;
            console.log(data,"recvMsg")
            dispatch(msgRecv(data,userid))
        })
    }
}
export function getMsgList(){
    return (dispatch,getState)=>{
        axios.get("/user/getmsglist")
            .then(res=>{
                if(res.status===200&&res.data.code===0){
                    const userid=getState().user._id;
                    dispatch(msgList(res.data.msg,res.data.users,userid))
                }
            })
    }
}

