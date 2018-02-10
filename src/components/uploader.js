import { Upload, Icon, Modal } from 'antd';
import React from 'react';
import './uploader.css';

export default class Uploader extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  componentWillMount(){
    let initImg = this.props.initImg;
    if(initImg){
      this.setState({
        fileList: [{
          uid: -1,
          status: 'done',
          name: 'xxx',
          url: initImg
        }]
      })
    }
  }

  componentWillReceiveProps(props){
    let initImg = props.initImg;
    if(initImg){
      this.setState({
        fileList: [{
          uid: -1,
          status: 'done',
          url: initImg
        }]
      })
    }else {
      this.setState({
        fileList: []
      })

    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    console.log("onchange: ",fileList);
    let handleImg = this.props.handleImg;
    handleImg && fileList[0] && handleImg(fileList[0].thumbUrl);
    this.setState({ fileList })
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
