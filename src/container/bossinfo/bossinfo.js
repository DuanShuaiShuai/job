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
class BossInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            title:"",
            company:"",
            money:"",
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
        const path=this.props.location.pathnama;
        const redirect =this.props.redirectTo;
        return(
            <div>
                {redirect&&redirect!==path?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="dark" >BOSS完善信息页面</NavBar>
                <AvatarSelector selectAvatar={(imgName)=>{
                    this.setState({
                        avatar:imgName
                    })
                }}></AvatarSelector>
                <InputItem onChange={(v)=>this.onChange("title",v)}>
                    招牌职位
                </InputItem>
                <InputItem onChange={(v)=>this.onChange("company",v)}>
                    公司名称
                </InputItem>
                <InputItem onChange={(v)=>this.onChange("money",v)}>
                    职位薪资
                </InputItem>
                <TextareaItem rows={3}
                              title={"职位要求"}
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
export default BossInfo;