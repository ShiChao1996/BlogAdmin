import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';
import {
    Button,
    Card,
    Avatar,
    Carousel,
} from 'antd';
import TopBar from '../components/topBar';
import './header.css'

const titles = [
    '春林初盛',
    '春水初生',
    '春风十里',
    '不如你...'
];

const picClass = [
    'animated fadeInUp title_1',
    'animated fadeInRight title_2',
    'animated fadeInLeft title_3',
    'animated fadeInDown title_4',
]

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        }
    }

    onChange = (from, to) => {
        this.setState({
            currentIndex: to
        })
    }

    render() {
        return (
            <div className='header'>
                <TopBar />
                <Carousel autoplay dots={false} autoplaySpeed={8000} speed={1000}
                          effect="fade"
                          beforeChange={(from, to) => this.onChange(from, to)}>
                    <div><img src={require('../image/pic_1.png')} className='pic' /></div>
                    <div><img src={require('../image/pic_2.png')} className='pic' /></div>
                    <div><img src={require('../image/pic_3.png')} className='pic' /></div>
                    <div><img src={require('../image/pic_4.png')} className='pic' /></div>
                </Carousel>

                <div className="mask">
                    <span className={picClass[this.state.currentIndex]}>
                         {titles[this.state.currentIndex]}
                    </span>
                </div>

            </div>
        )
    }
}