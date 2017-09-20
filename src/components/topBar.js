import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';
import {
    Avatar
} from 'antd';
import './topBar.css';

export default class topBar extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { type } = this.props;
        const light = type ? (type === 'light') : true;
        return(
            <div className={light ? 'headBar' : 'headBar headBarDark'}>
                <div className='avatarBox'>
                    <Avatar src={require('../image/avatar.png')} size='large'/>
                    <span className='name'>Lovae</span>
                </div>

                <div className='headLinksBox'>
                    <div className='myButton'>
                        <a href='/#/home' className={light ? 'linkLight' : 'linkDark'}>Home</a>
                    </div>
                    <div className='myButton'>
                        <a href='/#/articles' className={light ? 'linkLight' : 'linkDark'}>Articles</a>
                    </div>
                    <div className='myButton'>
                        <a href='/#/about' className={light ? 'linkLight' : 'linkDark'}>About</a>
                    </div>
                </div>
            </div>
        )
    }
}