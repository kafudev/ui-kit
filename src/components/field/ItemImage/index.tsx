import React from 'react';
import ProField, { ProFieldPropsType } from '@ant-design/pro-field/es/index';
import { RenderItemProps } from '../RenderItem';
import { ProFieldFCRenderProps } from '@ant-design/pro-utils';

import { Upload } from 'antd';
import ItemUpload from '../ItemUpload';

export interface ItemImageProps extends RenderItemProps {
  uploadType: 'card' | 'button' | 'dragger';
  onChange?: (value: any, info: any) => void;
}
const ItemImage = (props: ItemImageProps) => {
  const renderFormItem = (_text: any, _props: ProFieldFCRenderProps, _dom: JSX.Element) => {
    // console.log('ItemImage renderFormItem', _text, _props);
    return (
      <ItemUpload
        type={'upload'}
        uploadType={props.uploadType || 'card'}
        mode={'edit'}
        maxCount={props?.max || 1}
        rules={props.rules}
        onChange={props.onChange}
        icon={'FileImageOutlined'}
        fieldProps={{
          maxCount: props?.max || 1,
          multiple: props?.max > 1 ? true : false,
          listType:
            props.uploadType == 'dragger' || props.uploadType == 'button'
              ? 'picture'
              : 'picture-card',
          accept: 'image/png, image/jpeg, image/jpg, image/gif',
          ...props.fieldProps,
        }}
      />
    );
  };
  const render = (_text: any, _props: ProFieldFCRenderProps) => {
    console.log('ItemImage render', _text, _props);
    return (
      <ItemUpload
        type={'upload'}
        uploadType={props.uploadType || 'card'}
        mode={'read'}
        disabled={true}
        readonly={true}
        value={_text}
        maxCount={props?.max || 1}
        rules={props.rules}
        icon={'FileImageOutlined'}
        fieldProps={{
          maxCount: props?.max || 1,
          multiple: props?.max > 1 ? true : false,
          listType:
            props.uploadType == 'dragger' || props.uploadType == 'button'
              ? 'picture'
              : 'picture-card',
          accept: 'image/png, image/jpeg, image/jpg, image/gif',
          ...props.fieldProps,
        }}
      />
    );
  };

  return (
    <ProField
      {...props}
      mode={props?.mode}
      renderFormItem={renderFormItem}
      render={render}
      text={props.text}
    />
  );
};

export default ItemImage;
