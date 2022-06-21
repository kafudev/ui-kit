import React from 'react';
import ProField, { ProFieldPropsType } from '@ant-design/pro-field/es/index';
import { RenderItemProps } from '../RenderItem';
import { ProFieldFCRenderProps } from '@ant-design/pro-utils';
import { Button, Upload } from 'antd';
import { nanoid } from '@ant-design/pro-utils';
import { ProFormUploadButton, ProFormUploadDragger } from '@ant-design/pro-form';
import page from '../../../utils/page';
import { RcFile } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { FileAddOutlined, InboxOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import BaseIcon from '../../base/BaseIcon';

export interface ItemUploadProps extends RenderItemProps {
  uploadType: 'card' | 'button' | 'dragger';
  onChange?: (value: any, info: any) => void;
  request?: (options: any) => Promise<any>;
}
const LogTag = 'ItemUpload';
const ItemUpload = (props: ItemUploadProps) => {
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

  const onChange = (info: any) => {
    console.log('onChange', info);
    // if (file.status === 'uploading') {
    //   props?.onChange(file);
    // }
    // if (file.status === 'error') {
    //   props?.onChange(info.file);
    // }
    if (info?.file?.status === 'done' || info?.file?.status === 'removed') {
      // 返回文件地址，多文件拼接
      const _value = info?.fileList?.map((file: any) => file.url).join(',');
      console.log('onChange _value', _value);
      if (props?.onChange) {
        props?.onChange(_value, info);
      }
    }
    // always setState
    setFileList([...info?.fileList]);
  };

  // 下载文件
  const toDownload = (url: string, name: string) => {
    const a = document.createElement('a');
    a.setAttribute('href', url);
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
    let modelRef = page.showModal(
      <img style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={url} />,
      {
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
        bodyStyle: { height: window.innerHeight / 1.5 + 'px', overflow: 'auto' },
      },
    );
  };

  const previewFile = async (file: UploadFile) => {
    if (file.status === 'done') {
      onPreview(file);
    }
  };

  const beforeUpload = async (file: UploadFile, fileList: UploadFile[]) => {
    let url = '';
    if (props?.onUpload) {
      let res = await props.onUpload(file, fileList);
      url = res?.url;
    }
    if (props?.beforeUpload) {
      let res = await props.beforeUpload(file, fileList);
      url = res?.url;
    }
    // !todo实现默认上传
    // @ts-ignore
    file.url = url;
    return file;
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
      // previewFile={previewFile}
      beforeUpload={beforeUpload}
      fileList={fileList}
    >
      {fileList.length >= props?.maxCount ? null : (
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
      // previewFile={previewFile}
      beforeUpload={beforeUpload}
      fileList={fileList}
    >
      {fileList.length >= props?.maxCount ? null : (
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
      // previewFile={previewFile}
      beforeUpload={beforeUpload}
      fileList={fileList}
    >
      {fileList.length >= props?.maxCount ? null : (
        <Button icon={<UploadOutlined />}>点击上传</Button>
      )}
    </Upload>
  );
};

export default ItemUpload;
