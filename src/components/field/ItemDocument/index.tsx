import React from 'react';
import ProField, { ProFieldPropsType } from '@ant-design/pro-field/es/index';
import { RenderItemProps } from '../RenderItem';
import { ProFieldFCRenderProps } from '@ant-design/pro-utils';

import { Upload } from 'antd';
import ItemUpload from '../ItemUpload';

export interface ItemDocumentProps extends RenderItemProps {
  uploadType: 'card' | 'button' | 'dragger';
  onChange?: (value: any, info: any) => void;
}
const ItemDocument = (props: ItemDocumentProps) => {
  const renderFormItem = (_text: any, _props: ProFieldFCRenderProps, _dom: JSX.Element) => {
    // console.log('ItemDocument renderFormItem', _text, _props);
    return (
      <ItemUpload
        {...props}
        type={'upload'}
        uploadType={props.uploadType || 'button'}
        mode={'edit'}
        maxCount={props?.max || 1}
        rules={props.rules}
        onChange={props.onChange}
        icon={'FileTextOutlined'}
        fieldProps={{
          maxCount: props?.max || 1,
          multiple: props?.max > 1 ? true : false,
          listType: 'picture',
          accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt',
          showUploadList: {
            showPreviewIcon: false,
          },
          ...props.fieldProps,
        }}
      />
    );
  };

  const render = (_text: any, _props: ProFieldFCRenderProps) => {
    // console.log('ItemDocument render', _text, _props);
    return (
      <ItemUpload
        {...props}
        type={'upload'}
        uploadType={props.uploadType || 'button'}
        mode={'read'}
        disabled={true}
        readonly={true}
        value={_text}
        maxCount={props?.max || 1}
        rules={props.rules}
        onChange={props.onChange}
        icon={'FileTextOutlined'}
        fieldProps={{
          maxCount: props?.max || 1,
          multiple: props?.max > 1 ? true : false,
          listType: 'picture',
          accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt',
          showUploadList: {
            showPreviewIcon: false,
          },
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

export default ItemDocument;
