import React from 'react';
import ProField, { ProFieldPropsType } from '@ant-design/pro-field/es/index';
import { RenderItemProps } from '../RenderItem';
import { ProFieldFCRenderProps } from '@ant-design/pro-utils';

import { Upload } from 'antd';
import ItemUpload from '../ItemUpload';

export interface ItemGalleryProps extends RenderItemProps {
  uploadType: 'button' | 'dragger';
}
const ItemGallery = (props: ItemGalleryProps) => {
  const renderFormItem = (_text: any, _props: ProFieldFCRenderProps, _dom: JSX.Element) => {
    return (
      <ItemUpload
        type={'upload'}
        uploadType={props.uploadType || 'button'}
        mode={'edit'}
        maxCount={props?.max}
        rules={props.rules}
        onChange={props.onChange}
        fieldProps={{
          maxCount: props?.max,
          multiple: props?.max <= 1 ? false : true,
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

export default ItemGallery;
