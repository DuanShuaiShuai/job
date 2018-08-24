import React from 'react';
import { Card, WingBlank } from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter}  from 'react-router-dom'
@withRouter
class UserCard extends React.Component{
static propTypes ={
    userlist:PropTypes.array,
}
    handleClick(v){
     this.props.history.push(`/chat/${v._id}`)
        // console.log(this.props);
    }


    render(){
        return(
            <WingBlank >
                {this.props.userlist.map(v=>
                    v.avatar?(<Card
                            key={v.title}
                            onClick={()=>this.handleClick(v)}
                             >
                        <Card.Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        />
                        <Card.Body>
                            {v.company?<div>公司:<b>{v.company}</b></div>:null}
                            <div>{v.desc.split("\n").map((value)=>
                                <div key={Math.random()*999.99}>{value}</div>
                            )}</div>
                            {v.money?<div>薪资:<b>{v.money}</b></div>:null}
                        </Card.Body>
                    </Card>):null
                )}
            </WingBlank>
        )
    }
}
export default UserCard;