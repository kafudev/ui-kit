import React from 'react';
import ProField, { ProFieldPropsType } from '@ant-design/pro-field/es/index';
import { RenderItemProps } from '../RenderItem';
import { ProFieldFCRenderProps } from '@ant-design/pro-utils';

import { Upload } from 'antd';
import ItemUpload from '../ItemUpload';

export interface ItemImageProps extends RenderItemProps {
  uploadType: 'button' | 'dragger';
}
const ItemImage = (props: ItemImageProps) => {
  const renderFormItem = (_text: any, _props: ProFieldFCRenderProps, _dom: JSX.Element) => {
    console.log('ItemImage renderFormItem', _text, _props);
    return (
      <ItemUpload
        type={'upload'}
        uploadType={props.uploadType || 'button'}
        mode={'edit'}
        maxCount={props?.max || 1}
        rules={props.rules}
        onChange={props.onChange}
        fieldProps={{
          maxCount: props?.max || 1,
          multiple: props?.max > 1 ? true : false,
          listType: 'picture-card',
          ...props.fieldProps,
        }}
      />
    );
  };

  return (
    <ProField
      {...props}
      mode={props?.mode}
      valueType="image"
      renderFormItem={renderFormItem}
      text={props.text}
    />
  );
};

export default ItemImage;
