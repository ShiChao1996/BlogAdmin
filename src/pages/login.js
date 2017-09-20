import React from 'react';
import ReactDOM from 'react-dom';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import ticker from 'rc-tween-one/lib/ticker';
import Radio from 'antd/lib/radio';
import PropTypes from 'prop-types';
import './welcome.css';
import {
    Route,
    Link
} from 'react-router';
import QueueAnim from 'rc-queue-anim';
import Animate from './animate';


export default class Welcome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            image: require('../image/background.png'),
            pixSize: 20,
            pointSize: 10,
            isMode: false,
            show: false,
        };
    }

    render(){
        return(
            <div>
                <Animate
                    image={this.state.image}
                    pixSize={this.state.pixSize}
                    pointSizeMin={this.state.pointSize}
                />

            </div>

        )
    }
}
