import React from 'react';
import Logo from "../../conpoment/logo/logo";
import {InputItem, WhiteSpace, Radio,WingBlank, Button, List} from "antd-mobile";
import { connect } from 'react-redux';
import {Redirect} from  'react-router-dom';
import { register } from "../../redux/user.redux"
import jobfrom from '../../conpoment/jobfrom/jobfrom'
@connect(
    state=>state.user,
    {register}
)
@jobfrom
class Register extends React.Component{
    constructor(props) {
        super(props);
        this.register=this.register.bind(this);
    }
    register=()=>{
        this.props.register(this.props.state)
    };
    componentDidMount(){
        this.props.hangChange("type","genius")
    }
    render(){
        const RadioItem = Radio.RadioItem;
        return(
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo/>
                <h2>注册页面</h2>
                {this.props.msg?<p className={"err-msg"}>{this.props.msg}</p>:null}
                <List>
                    <InputItem onChange={(v)=>{this.props.hangChange("user",v)}}>账号</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" onChange={(v)=>{this.props.hangChange("pwd",v)}}>密码</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" onChange={(v)=>{this.props.hangChange("repeatpwd",v)}}>确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.props.state.type ==="genius"}
                               onChange={()=>this.props.hangChange("type","genius")}
                    >
                        牛人
                    </RadioItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.props.state.type ==="boss"}
                               onChange={()=>this.props.hangChange("type","boss")}
                    >
                        BOSS
                    </RadioItem>
                </List>
                <WhiteSpace/>
                <WingBlank>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Register;