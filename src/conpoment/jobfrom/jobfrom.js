import React from 'react';
export default  function jobfrom(Comp){
    return class WrapperCom extends React.Component{
        constructor(props) {
            super(props);
            this.state={}
            this.hangChange=this.hangChange.bind(this)
        }
        hangChange=(key,value)=>{

            console.log(key+""+value);
            this.setState({
                [key]:value,
            })
        };
        render(){
            return <Comp {...this.props} hangChange={this.hangChange} state={this.state}></Comp>
                }

    }
}