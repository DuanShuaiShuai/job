import React from "react";
import axios from "axios";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {loadDate} from "../../redux/user.redux";

@withRouter
@connect(
    null,
   {loadDate}
)
class AuthRoute extends React.Component{
    componentDidMount(){
        const publiclist=["/login","register"];
        const pathname=this.props.location.pathname;
        //如果在注册登录页面不用跳转
        if(publiclist.indexOf(pathname)>-1){
            return null;
        }
        //获取用户信息
        axios.get("/user/info")
            .then(res=>{
               if(res.status===200&&res.data.code===0){
                   console.log(res.data.data);
                   this.props.loadDate(res.data.data);
               }else{
                   this.props.history.push("/login")
               }
            }).catch(err=>{
                console.log(err);
        })
    }
    render(){
        return null
    }
}
export default AuthRoute;