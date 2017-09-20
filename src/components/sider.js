import React from 'react';
import {
    Card,
    Avatar,
    Button,
    Icon
} from 'antd';
import './sider.css';

const sider = (name, desc) => {
    return(
        <Card>
            <div className="sideBox">
                <img src={require('../image/avatar.png')} className='avatar'/>
                <h1>{name}</h1>
                <p>{desc}</p>
                <div className="siderLinks">
                    <a href="https://github.com/ShiChao1996" target='_blank'><Icon type="github" style={{fontSize: 18}} /></a>
                    <a href="http://www.jianshu.com/u/b18a484f74f1" target='_blank'><img src={require('../image/jianshu.png')}  width='18' /></a>
                    <Icon type="mail" style={{fontSize: 18}} />
                </div>
                <div className="poet">
                   {/* 街南绿树春饶絮 <br/>
                    雪满游春路<br/>
                    树头花艳杂娇云<br/>
                    树底人家朱户<br/>
                    北楼闲上<br/>
                    疏帘高卷<br/>
                    直见街南树<br/>*/}

                    阑干倚尽犹慵去<br/>
                    几度黄昏雨<br/>
                    晚春盘马踏青苔<br/>
                    曾傍绿阴深驻<br/>
                    落花犹在<br/>
                    香屏空掩<br/>
                    人面知何处
                </div>
            </div>

        </Card>
    )
};

export default sider;