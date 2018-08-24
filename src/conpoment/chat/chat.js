import React from "react";
import {InputItem,List,NavBar,Icon} from 'antd-mobile';
import {connect } from  "react-redux";
import {getMsgList,sendMsg,reavMsg}  from "../../redux/chat.redux";
import io from 'socket.io-client';
import {getChatId} from "../../util";
const Item = List.Item;
const socket = io("ws://localhost:9093");
@connect(
    state=>state,
    {getMsgList,sendMsg,reavMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text:"",
            msg:[]
        }
    }

    componentDidMount(){
        if(!this.props.chat.chatMsg.length){
            this.props.getMsgList();
            this.props.reavMsg();
        }
        // socket.on("recvMsg",(data)=>{
        //     this.setState({
        //         msg:[...this.state.msg,data]
        //     })
        // })
    }
    handleSubmit=()=>{
        // socket.emit("sendMsg",this.state.text)
        // this.setState({text:""})
        console.log(this.props);
        const from =this.props.user._id;
        const to= this.props.match.params.user;
        const msg=this.state.text;
        this.props.sendMsg({from,to,msg})
        this.setState({text:""})
    }
    render(){
        console.log(this.props);
        const userId=this.props.match.params.user;
        const users=this.props.chat.users;
        if(!users[userId]){
            return null;
        }
        const chatid=getChatId(userId,this.props.user._id)
        const chatmsgs=this.props.chat.chatMsg.filter((v)=>v.chatid===chatid);
        return(
            <div>
                <NavBar mode="dark"
                icon={<Icon type="left"/>}
                 onLeftClick={this.props.history.goBack}
                >
                    {users[userId].name}
                </NavBar>
                <div>
                    {chatmsgs.map((v)=>{
                        const avatar=require(`../img/${users[v.from].avatar}.png`)
                            return v.from===userId?(
                                <List key={v._id}>
                                    <Item
                                        thumb={avatar}
                                    >{v.content}</Item>
                                </List>

                            ):(
                                <List key={v._id}>
                                    <Item
                                        extra={<img src={avatar}/>}
                                        style={{textAlign:"right"}}
                                        id={"right"}
                                    >{v.content}
                                    </Item>
                                </List>
                            )
                    })}
                </div>
                <div className="chat-footer">
                    <List>
                        <InputItem
                            placeholder="请输入..."
                            value={this.state.text}
                            onChange={v=>{this.setState({text:v})}}
                            extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
                        ></InputItem>
                    </List>
                </div>
            </div>

        )
    }
}
export default Chat;