import React from 'react';
import Logo from "../../conpoment/logo/logo";
import {InputItem, WhiteSpace,WingBlank,Button,List} from 'antd-mobile';
import { connect } from 'react-redux';
import {login} from '../../redux/user.redux'
import {Redirect} from "react-router-dom";
import jobfrom from '../../conpoment/jobfrom/jobfrom'
@connect(
    state=>state.user,
        {login}
)
@jobfrom
class Login extends React.Component{
    constructor(props) {
        super(props);
        this.register=this.register.bind(this)

    }
    register(){
        //和路由相关的才有这属性
        this.props.history.push("/register")
    }
    login2=()=>{
        this.props.login(this.props.state)
    };

    render(){
        return(
            <div>
                {/*防止重复跳转相同的页面*/}
                {this.props.redirectTo&&this.props.redirectTo!=="/login"?<Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <h2>登录页面</h2>
                {this.props.msg?<p className={"err-msg"}>{this.props.msg}</p>:null}
                <InputItem type="primary"/>
                <List>
                    <InputItem onChange={(v)=>this.props.hangChange('user',v)}>账号</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" onChange={(v)=>this.props.hangChange('pwd',v)}> 密码</InputItem>
                </List>
                <WhiteSpace/>
                <WingBlank>
                    <Button type="primary" onClick={this.login2}>登录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>

            </div>
        )
    }
}
export default Login;