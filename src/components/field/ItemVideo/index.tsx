import React from 'react';
import ProField, { ProFieldPropsType } from '@ant-design/pro-field/es/index';
import { RenderItemProps } from '../RenderItem';
import { ProFieldFCRenderProps } from '@ant-design/pro-utils';

import { Upload } from 'antd';
import ItemUpload from '../ItemUpload';

export interface ItemVideoProps extends RenderItemProps {
  uploadType: 'card' | 'button' | 'dragger';
  onChange?: (value: any, info: any) => void;
}
const ItemVideo = (props: ItemVideoProps) => {
  const renderFormItem = (_text: any, _props: ProFieldFCRenderProps, _dom: JSX.Element) => {
    console.log('ItemVideo renderFormItem', _text, _props);
    return (
      <ItemUpload
        type={'upload'}
        uploadType={props.uploadType || 'card'}
        mode={'edit'}
        maxCount={props?.max || 1}
        rules={props.rules}
        onChange={props.onChange}
        icon={'VideoCameraOutlined'}
        fieldProps={{
          maxCount: props?.max || 1,
          multiple: props?.max > 1 ? true : false,
          listType:
            props.uploadType == 'dragger' || props.uploadType == 'button'
              ? 'picture'
              : 'picture-card',
          accept: 'video/mp4, video/x-mpeg2, video/quicktime, video/x-msvideo',
          ...props.fieldProps,
        }}
      />
    );
  };

  return (
    <ProField {...props} mode={props?.mode} renderFormItem={renderFormItem} text={props.text} />
  );
};

export default ItemVideo;
