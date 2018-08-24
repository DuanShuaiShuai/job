import React from 'react';
import {connect} from 'react-redux';
import {getUserList} from "../../redux/chatuser.redux";
import UserCard from "../usercard/usercard";

@connect(
    state=>state.chatuser,
    {getUserList}
)
class Boss extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
    }
    componentDidMount() {
        this.props.getUserList("genius")
    }
    render(){
        console.log(this.props.userlist);
        return (
            <UserCard userlist={this.props.userlist}/>
        )
    }
}
export default  Boss;