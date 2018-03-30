import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import { Http } from '../../utils/http';


export default class FileUploader extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    url: ''
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    const url = file.url || file.thumbUrl;
    this.setState({
      previewImage: url,
      previewVisible: true,
    });
  };

  handleChange = (info) => {
    const { fileList } = info;
    const status = info.file.status;
    if (status === 'uploading') {
      this.setState({ fileList });
      return;
    }
    this.setState({ fileList });
    const file = fileList[0];
    const url = file.thumbUrl || file.url;
    if (url) {
      this.upload(url);
    }
  };

  upload(image) {
    Http.post(Http.url("image/post"), "", { image }, (res) => {
      console.log(res);
      if (res.status === 0) {
        this.setState({
          url: res.resp
        })
      }
    })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
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
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage}/>
        </Modal>
        <h3>{this.state.url === "" ? null : "http://image.littlechao.top/" + this.state.url.slice(15)}</h3>

      </div>
    );
  }
}
