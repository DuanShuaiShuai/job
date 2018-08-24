import React from 'react';
import { NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';
import AvatarSelector from '../../conpoment/avatar-selector/avatar-selector';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {update} from '../../redux/user.redux';
@connect(
    state=>state.user,
    {update}
)
class Geniusinfo extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            title:"",
            desc:"",
            avatar:"",
        }
    }
    onChange=(key,value)=>{
        this.setState({
            [key]:value,
        })
    }
    render(){
        const path=this.props.location.pathname;
        const redirect =this.props.redirectTo;
        return(
            <div>
                {redirect&&redirect!==path?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="dark" >牛人完善信息页面</NavBar>
                <AvatarSelector selectAvatar={(imgName)=>{
                    this.setState({
                        avatar:imgName
                    })
                }}></AvatarSelector>
                <InputItem onChange={(v)=>this.onChange("title",v)}>
                    求职岗位
                </InputItem>
                <TextareaItem rows={3}
                              title={"个人简介"}
                              autoHeight
                              onChange={(v)=>this.onChange("desc",v)}>

                </TextareaItem>
                <Button
                    onClick={()=>{
                        this.props.update(this.state)
                    }}
                    type={"primary"}>保存</Button>

            </div>
        )
    }
}
export default Geniusinfo;