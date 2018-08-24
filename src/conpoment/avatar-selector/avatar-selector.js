import React from "react";
import {Grid,List } from 'antd-mobile';
import PropTypes from 'prop-types';
class AvatarSelector extends React.Component{
    static PropsTypes={
        selectAvatar:PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state={
            icon:""
        }
    }

    render(){
        const gridHeader=this.state.icon?
                <div>
                    <span>已选择头像:</span>
                    <img style={{width:19,height:19,textAlign:"center",paddingLeft:10, verticalAlign: "middle"}} src={this.state.icon} alt="avatar"/>
                </div>:
                <div>
                    <span>请选择头像:</span>
                </div>
        const avatarList="boy,woman,girl,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,zebra"
            .split(",")
            .map(v=>({
                    icon:require(`../img/${v}.png`),
                    text:v
                }))
        return (

            <div>
                <List renderHeader={gridHeader}>
                    <Grid
                        columnNum={5}
                        data={avatarList}
                        onClick={ele=>{
                            this.setState({
                                icon:ele.icon,
                            })
                            this.props.selectAvatar(ele.text)
                        }}
                    />
                </List>
            </div>
        )
    }
}
export  default  AvatarSelector;