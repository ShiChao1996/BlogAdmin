import React, {Component} from 'react';
import List from '../components/list';
import {
    Card,
    Affix,
    Button
} from 'antd';
import Side from '../components/sider';
import './home.css';
import Header from '../components/header';

import { Http }  from '../utils/http';
const lists = [
    {title: '算法', desc: '冒泡排序。。。。。'},
    {title: '算法', desc: '冒泡排序。。。。。'},
    {title: '算法', desc: '冒泡排序。。。。。'},
    {title: '算法', desc: '冒泡排序。。。。。'},
    {title: '算法', desc: '冒泡排序。。。。。'},
    {title: '算法', desc: '冒泡排序。。。。。'},
    {title: '算法', desc: '冒泡排序。。。。。'},
]

export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    componentWillMount(){
        console.log(Http)
    }

    request(){
        Http.get('http://127.0.0.1:7001/species/get', '', function (res) {
            console.log(res)
            console.log(res.data)
        }, function (err) {
            console.log("err: ", err)
        })
    }

    render(){
        return(
            <div className="body">
                <Header />
                <div className='bodyRight'>
                    <Card>
                        { List(lists) }
                    </Card>
                </div>

                <div className="bodyLeft">
                    <Affix>
                        <div className='box'>
                            { Side('Lovae', '杨柳岸，晓风残月') }
                        </div>
                    </Affix>
                </div>
                <div className='footer'>
                    <p>© 2017 ♥ ShiChao</p>
                    <span>Powered by Lovae | 2017</span>
                </div>
            </div>
        )
    }
}