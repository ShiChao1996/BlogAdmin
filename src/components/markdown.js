import React, { Component } from 'react';
import MarkDown from 'react-markdown';
import './markdown.css';

export default class MyMarkDown extends Component{
    constructor(props){
        super(props);
        this.state = {
            text: '# hhh'
        }
    }

    componentWillMount(){
        if(this.props.text){
            this.setState({
                text: this.props.text
            })
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            text: nextProps.text
        })
    }

    render(){
        return(
            <MarkDown className='markdownWrapper' source={this.state.text} />
        )
    }
}