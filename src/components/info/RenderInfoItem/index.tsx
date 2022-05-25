import ProDescriptions from '@ant-design/pro-descriptions/es/index';
import React from 'react';
import { BaseItemProps } from '../../base';
import RenderItem from '../../field/RenderItem';

export interface BaseInfoItemProps extends BaseItemProps {
  data: { [key: string]: any }; // 表单值配置
  labelWidth?: string | number; // 标签宽度
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LogTag = 'RenderInfoItem';
const RenderInfoItem: React.FC<BaseInfoItemProps> = (props) => {
  // 渲染表单组件
  const _renderItem = (item: BaseInfoItemProps, data: any, key: number) => {
    // 渲染不同类型的组件
    const valueType = item?.valueType || item?.type || '';
    switch (valueType) {
      case 'header': // !项目头部
        return (
          <RenderItem
            key={key}
            {...item}
            type={valueType}
            valueType={valueType}
            marginBottom={'0px'}
            mode={item?.mode || 'read'}
          />
        );
      case 'empty':
      case 'black':
        return null;
    }

    // 标签宽度
    let labelWidth: any = '100px';
    if (props?.labelWidth) {
      labelWidth = typeof props.labelWidth == 'number' ? `${props.labelWidth}px` : props.labelWidth;
    }
    if (item?.labelWidth) {
      labelWidth = typeof item.labelWidth == 'number' ? `${item.labelWidth}px` : item.labelWidth;
    }
    return (
      <>
        <ProDescriptions.Item
          title={item.label}
          labelStyle={{
            width: labelWidth || '100px',
            textAlign: 'right',
            display: 'inline-block',
            ...item.labelStyle,
          }}
          contentStyle={{ ...item?.contentStyle }}
          editable={item?.edit || item.editable}
          copyable={item?.copy || item.copyable}
          dataIndex={item?.name || item.dataIndex}
          render={(text: any, entity: any, index: number, action: any, schema: any) => {
            // console.log('render', text, entity, index, action, schema);
            return <RenderItem key={key} {...item} type={valueType} text={text} mode={'read'} />;
          }}
          renderFormItem={(schema: any, config: any, form: any) => {
            if (config?.isEditable) {
              console.log('renderFormItem', schema, config, form);
            }
            return (
              <RenderItem key={key} {...item} type={valueType} text={item?.text} mode={'edit'} />
            );
          }}
        ></ProDescriptions.Item>
      </>
    );
  };
  return <>{_renderItem(props, props.data, props.key)}</>;
};

export default RenderInfoItem;
