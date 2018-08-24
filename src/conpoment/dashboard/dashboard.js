import React from 'react';
import { NavBar  } from 'antd-mobile';
import  { connect } from 'react-redux'
import {Route,Switch} from 'react-router-dom';
import NavLinkBar from '../navlinkbar/navlinkbar'
import Boss from "../boss/boss";
import Genius from "../genius/genius";
import User from  "../user/user"
import {getMsgList,reavMsg}  from "../../redux/chat.redux";
import Msg from "../msg/msg";

@connect(
    state=>state,
    {getMsgList,reavMsg}
)
class Dashboard extends React.Component{
    componentDidMount(){
        if(!this.props.chat.chatMsg.length){
            this.props.getMsgList();
            this.props.reavMsg();
        }
    }
    render(){
        const pathname=this.props.location.pathname;
        console.log(pathname);
        const user =this.props.user;
        const navList=[
            {
                path:"/boss",
                text:"牛人",
                icon:"boss",
                title:"牛人列表",
                component:Boss,
                hide:user.type==="genius"
            },{
                path:"/genius",
                text:"boss",
                icon:"job",
                title:"BOSS列表",
                component:Genius,
                hide:user.type==="boss"
            },
            {
                path:"/msg",
                text:"消息",
                icon:"msg",
                title:"消息列表",
                component:Msg,
            },
            {
                path:"/me",
                text:"我",
                icon:"user",
                title:"个人中心",
                component:User,
            }
        ];
        return (
         <div>
             <NavBar mode="dark" className="fixed-head">{navList.find(v=>v.path===pathname).title}</NavBar>
             <div style={{marginTop:50}}>
                 <Switch>
                     {navList.map(v=>(
                         <Route key={v.path} path={v.path} component={v.component}/>
                     ))}
                 </Switch>
             </div>
             <NavLinkBar data={navList}></NavLinkBar>
         </div>
        )
    }
}
export default Dashboard;