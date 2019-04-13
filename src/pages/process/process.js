import React, {Component} from 'react';
import {connect} from "react-redux";
import {clear, editArticle, saveContent, setImg} from '../../actions/index';
import {Steps, Step} from 'antd';


class Process extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    componentWillReceiveProps(props) {

    }


    render() {
        return (
            <Steps current={1} status="error">
                <Step title="Finished" description="This is a description"/>
                <Step title="Finished" description="This is a description"/>
                <Step title="Finished" description="This is a description"/>
                <Step title="Finished" description="This is a description"/>
            </Steps>
        );
    }
}


function select(store) {
    return {
        token: store.admin.token,
        article: store.article.article
    }
}

export default connect(select)(Process);
