import React from 'react';
import {connect} from 'react-redux';
import {Result,List,WhiteSpace,Modal } from 'antd-mobile';
import {Redirect} from "react-router-dom";
import {logoutSubmit} from "../../redux/user.redux";
import cookies from 'browser-cookies';
const alert = Modal.alert;
@connect(
    state=>state.user,
    { logoutSubmit }
)
class User extends React.Component{
    constructor(props) {
        super(props);
        this.logout=this.logout.bind(this);
    }
    logout(){

        alert('退出', '确认', [
            { text: '否', onPress: () => console.log('cancel') },
            {
                text: '是',
                onPress: () =>{
                    console.log("logout");
                    cookies.erase("userid");
                    // window.location.href=window.location.href;
                    this.props.logoutSubmit();
                }

            },
        ])

    }
    render(){
        console.log(this.props);
        const props=this.props;
        const Item =List.Item;
        const Brief = Item.Brief;
        return(
            props.user?(
                <div>
                    <Result
                        img={<img src={require(`../img/${props.avatar}.png`)} style={{width:60,height:60}} alt=""/>}
                        title={props.user}
                        message={props.type==="boss"?props.company:null}
                    />
                    <List renderHeader={() => '简介'}>
                        <Item>
                            {props.title}
                            {props.desc.split("\n").map((v)=><Brief key={v}>{v}</Brief>)}
                            {props.money?`薪资:${props.money}`:null}
                        </Item>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <List>
                        <Item onClick={this.logout}>退出登录</Item>
                    </List>
                </div>
            ):<Redirect to={props.redirectTo}/>
        )
    }
}
export default User;