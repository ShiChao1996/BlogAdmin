import React, {Component} from 'react';
import {
    Card
} from 'antd';
import QueueAnim from 'rc-queue-anim';
import './listItem.css'

const List = (list) => {
    return(
        <QueueAnim delay={1000} interval={300}>
            {list.map((line, index) => {
                    return (
                        <div className="listItem" key={index}>
                            <Card>
                                <h2>{line.title}</h2>
                                <span>{line.desc}</span>
                            </Card>
                        </div>
                    )
                }
            )}
        </QueueAnim>
    )

}

export default List;