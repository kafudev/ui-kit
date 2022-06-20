import React from 'react';
import ProField, { ProFieldPropsType } from '@ant-design/pro-field/es/index';
import { RenderItemProps } from '../RenderItem';
import { ProFieldFCRenderProps } from '@ant-design/pro-utils';
import { Upload } from 'antd';
import { nanoid } from '@ant-design/pro-utils';
import { ProFormUploadButton, ProFormUploadDragger } from '@ant-design/pro-form';
import page from '../../../utils/page';
import { RcFile } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';

export interface ItemUploadProps extends RenderItemProps {
  uploadType: 'button' | 'dragger';
  onChange?: (file: any, fileList: any[], event: any) => void;
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
  }, [props.value]);

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
      props?.onChange(_value);
    }
    // always setState
    setFileList([...info?.fileList]);
  };

  const onPreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    page.showModal(
      <img
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        src={file.url || (file.preview as string)}
      />,
      {
        title: file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
        footer: null,
        bodyStyle: { height: window.innerHeight / 1.5 + 'px', overflow: 'auto' },
      },
    );
  };

  return props.uploadType === 'dragger' ? (
    <Dragger
      {...props}
      {...props.fieldProps}
      maxCount={props?.maxCount}
      onChange={onChange}
      onPreview={onPreview}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{'单击或拖动文件到此区域进行上传'}</p>
      <p className="ant-upload-hint">{'支持单次或批量上传'}</p>
    </Dragger>
  ) : (
    <Upload
      {...props}
      {...props.fieldProps}
      maxCount={props?.maxCount}
      onChange={onChange}
      onPreview={onPreview}
      fileList={fileList}
    >
      {fileList.length >= props?.maxCount ? null : (
        <>
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>点击上传</div>
          </div>
        </>
      )}
    </Upload>
  );
};

export default ItemUpload;
