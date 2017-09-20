import React, {Component} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';


import './index.css'
import TopBar from '../components/topBar';

export default class Container extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { child } = this.props;
        return(
            <div className='container' style={{minHeight: window.screen.availHeight}}>
                <TopBar type='dark'/>
                { child && child() }
                <div className='footer'>
                    Powered by Lovae | 2017
                </div>
            </div>
        )
    }
}
