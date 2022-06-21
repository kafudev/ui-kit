import React from 'react';
import { RenderItemProps } from '../RenderItem';
import { Button, Upload, message } from 'antd';
import { nanoid } from '@ant-design/pro-utils';
import page from '../../../utils/page';
import { RcFile } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { FileAddOutlined, InboxOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import request from 'umi-request';
import BaseIcon from '../../base/BaseIcon';
import 'antd/es/upload/style/index.css';

export interface ItemUploadProps extends RenderItemProps {
  uploadType: 'card' | 'button' | 'dragger';
  onChange?: (value: any, info: any) => void;
  actionUrl?: string; // 请求链接
  onResult?: (object: any) => Promise<{ url: string; name?: string }>; // 请求结果处理
  onUpload?: (file: RcFile) => Promise<{ url: string; name?: string }>;
}
const LogTag = 'ItemUpload';
const ItemUpload = (props: ItemUploadProps) => {
  const [action, setAction] = React.useState<string>(props.action || '');
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  React.useEffect(() => {
    console.log(LogTag, 'propsChange text', props.value);
    if (props.value) {
      // 格式化数据结构
      // 分隔图片集合
      const _valueList = props?.value?.split(',') || [];
      const _fileList = _valueList.map((vv: string) => {
        // 分隔图片地址和图片名称
        let [url, name] = vv.split('|');
        if (!name) {
          name = url.substring(url.lastIndexOf('/') + 1);
        }
        return {
          uid: nanoid(),
          name: name,
          status: 'done',
          url: url,
        };
      });
      setFileList([..._fileList]);
    }
  }, []);

  const beforeUpload = async (file: RcFile, _fileList: RcFile[]) => {
    console.log('beforeUpload', file, fileList);
    if (props?.beforeUpload) {
      let res = await props.beforeUpload(file, [...fileList]);
      return res;
    }
    return false;
  };

  const onChange = async (info: any) => {
    console.log('onChange', info);
    let file = info.file;
    let fileList = info.fileList;
    if (!file.status) {
      file.status = 'uploading';
      file.percent = 50;
    }
    fileList = fileList.map((_file: any) => {
      if (!_file.status) {
        _file.status = 'uploading';
        _file.percent = 50;
      }
      return _file;
    });
    setFileList([...fileList]);
    await onFileUpload(file, fileList);
    // if (file?.status === 'uploading') {
    //   props?.onChange(file);
    // }
    // if (file.status === 'error') {
    //   props?.onChange(file);
    // }
    // if (file.status === 'removed') {
    //   props?.onChange(file);
    // }
    if (file?.status === 'done' || file.status === 'removed') {
      // 返回文件地址，多文件拼接
      const _value = fileList
        ?.map((_file: any) => {
          if (_file.status === 'done') {
            if (_file.url) {
              return _file.url;
            }
          }
        })
        .join(',');
      if (props?.onChange) {
        props?.onChange(_value, { file, fileList, event: info.event });
      }
    }

    // always setState
    // console.log('onChange setFileList', fileList);
    // setFileList([...fileList]);
    return file;
  };

  // 上传文件列表
  const onFileUpload = async (file: UploadFile, fileList: UploadFile[]) => {
    console.log('onFileUpload 1', file, fileList);
    if (file?.status === 'uploading') {
      let url = await onUpload(file?.originFileObj || file);
      if (url) {
        // @ts-ignore
        file.url = url;
        file.status = 'done';
        file.percent = 100;
      } else {
        file.status = 'error';
      }
    }
    fileList = fileList.map((_file: any) => {
      if (_file.uid === file.uid) {
        _file.url = file.url;
        _file.status = file.status;
        _file.percent = file.percent;
      }
      if (!_file.status) {
        _file.status = 'uploading';
        _file.percent = 50;
      }
      return _file;
    });
    console.log('onFileUpload 2', file, fileList);
    setFileList([...fileList]);
    return fileList;
  };

  // 本地上传
  const onUpload = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (props?.onUpload) {
        let res = await props.onUpload(file);
        // 上传成功
        let url = res?.url;
        console.log('onUpload url', url);
        return url;
      }
      let action = '/admin/sys/common/upload';
      action = '/admin/api/upload/uploadImage';
      // action = '/admin/api/upload/uploadVideo';
      // action = '/admin/api/upload/uploadDocument';
      if (props?.actionUrl) {
        action = props.actionUrl;
      }
      let res: any = await request<any>(action, {
        method: 'POST',
        headers: {
          // Accept: '*/*',
          // 'Content-Type': 'multipart/form-data',
        },
        data: formData,
        skipErrorHandler: true,
      });
      if (props?.onResult) {
        res = await props.onResult(res);
        // 上传成功
        let url = res?.url;
        console.log('onUpload url', url);
        return url;
      }
      if (res.code == 1) {
        // 上传成功
        let url = res?.data?.url;
        console.log('onUpload url', url);
        return url;
      } else {
        message.error(res.message || res.msg || '上传失败');
        return false;
      }
    } catch (error: any) {
      message.error(error.message || error.msg || '上传异常');
      return false;
    }
  };

  // 下载文件
  const toDownload = (url: string, name: string) => {
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.setAttribute('download', name);
    a.click();
  };

  // 下载文件
  const onDownload = async (file: UploadFile) => {
    if (props?.onDownload) {
      return props.onDownload(file);
    }
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    let url = file.url || (file.preview as string);
    let name = file.name || url!.substring(url!.lastIndexOf('/') + 1);
    toDownload(url, name);
  };

  // 预览文件
  const onPreview = async (file: UploadFile) => {
    if (props?.onPreview) {
      return props.onPreview(file);
    }
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    let url = file.url || (file.preview as string);
    let name = file.name || url!.substring(url!.lastIndexOf('/') + 1);
    let ext = name.substring(name.lastIndexOf('.') + 1);
    // 判断文件格式是否是图片或者视频
    if (!ext || ['png', 'jpg', 'jpeg', 'gif', 'mp4'].indexOf(ext) === -1) {
      window.open(url);
      return;
    }
    const renderBox = () => {
      // 视频预览
      if (file?.type && ['mp4'].indexOf(ext) > -1) {
        return (
          <div style={{ width: '100%', height: '100%' }}>
            <video
              src={url}
              controls
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        );
      }
      // 图片预览
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <img
            src={url}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      );
    };
    // 弹窗预览图片
    let modelRef = page.showModal(renderBox(), {
      title: name,
      footer: [
        <Button
          key="back"
          onClick={() => {
            page.closeModal(modelRef);
          }}
        >
          关闭
        </Button>,
        <Button
          key="download"
          type="primary"
          onClick={() => {
            toDownload(url, name);
          }}
        >
          下载
        </Button>,
        <Button
          key="link"
          type="primary"
          onClick={() => {
            window.open(url);
          }}
        >
          新窗口查看
        </Button>,
      ],
      bodyStyle: { height: document.body.clientHeight / 1.5 + 'px', overflow: 'auto' },
    });
  };

  const previewFile = async (file: UploadFile) => {
    // if (file.status === 'done') {
    //   onPreview(file);
    // }
  };

  return props.uploadType === 'dragger' ? (
    <Dragger
      {...props}
      {...props.fieldProps}
      showUploadList={{
        showPreviewIcon: true,
        showRemoveIcon: true,
        showDownloadIcon: true,
        ...props?.fieldProps?.showUploadList,
      }}
      style={{
        ...props?.fieldProps?.style,
        display: fileList.length >= props?.maxCount ? 'none' : 'block',
      }}
      maxCount={props?.maxCount}
      onChange={onChange}
      onDownload={onDownload}
      onPreview={onPreview}
      previewFile={previewFile}
      beforeUpload={beforeUpload}
      fileList={fileList}
    >
      {fileList.length >= props?.maxCount || props.mode == 'read' ? null : (
        <>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">{'单击或拖动文件到此区域进行上传'}</p>
          <p className="ant-upload-hint">{'支持单次或批量上传'}</p>
        </>
      )}
    </Dragger>
  ) : props.uploadType === 'card' ? (
    <Upload
      {...props}
      {...props.fieldProps}
      showUploadList={{
        showPreviewIcon: true,
        showRemoveIcon: true,
        showDownloadIcon: true,
        ...props?.fieldProps?.showUploadList,
      }}
      maxCount={props?.maxCount}
      onChange={onChange}
      onDownload={onDownload}
      onPreview={onPreview}
      previewFile={previewFile}
      beforeUpload={beforeUpload}
      fileList={fileList}
    >
      {fileList.length >= props?.maxCount || props.mode == 'read' ? null : (
        <>
          <div>
            <BaseIcon name={props?.icon || 'FileAddOutlined'} style={{ fontSize: 28 }} />
            <div style={{ marginTop: 8 }}>点击上传</div>
          </div>
        </>
      )}
    </Upload>
  ) : (
    <Upload
      {...props}
      {...props.fieldProps}
      showUploadList={{
        showPreviewIcon: true,
        showRemoveIcon: true,
        showDownloadIcon: true,
        ...props?.fieldProps?.showUploadList,
      }}
      maxCount={props?.maxCount}
      onChange={onChange}
      onDownload={onDownload}
      onPreview={onPreview}
      previewFile={previewFile}
      beforeUpload={beforeUpload}
      fileList={fileList}
    >
      {fileList.length >= props?.maxCount || props.mode == 'read' ? null : (
        <Button icon={<UploadOutlined />}>点击上传</Button>
      )}
    </Upload>
  );
};

export default ItemUpload;
