import ProDescriptions from '@ant-design/pro-descriptions/es/index';
import { Row } from 'antd';
import React from 'react';
import { BaseItemProps } from '../../base';
import RenderItem from '../../field/RenderItem';

export interface BaseInfoItemProps extends BaseItemProps {
  itemProps: { [key: string]: any }; // 详情项配置
  data: { [key: string]: any }; // 详情值配置
  labelWidth?: string | number; // 标签宽度
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LogTag = 'RenderInfoItem';
const RenderInfoItem: React.FC<BaseInfoItemProps> = (props) => {
  // 渲染表单组件
  const _renderItem = (item: BaseInfoItemProps, data: any, key: number) => {
    // !设置默认属性
    let dataIndex = item?.dataIndex || item?.name || item?.key || 'text';
    // 渲染不同类型的组件
    const valueType = item?.valueType || 'text';
    switch (valueType) {
      case 'header': // !项目头部
        return (
          <>
            {/* @ts-ignore */}
            <Row span={item?.span}>
              <RenderItem
                key={key}
                {...item}
                type={valueType}
                valueType={valueType}
                marginBottom={'0px'}
                mode={item?.mode || 'read'}
              />
            </Row>
          </>
        );
      // 表单-对象
      case 'form':
      case 'object':
        return null;
      // 列表-数组
      case 'list':
      case 'array':
        return null;
      case 'empty':
        return <div></div>;
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
          span={item?.span}
          contentStyle={{ ...item?.contentStyle }}
          editable={item?.edit || item.editable}
          copyable={item?.copy || item.copyable}
          dataIndex={dataIndex}
          {...item?.itemProps}
          render={(text: any, entity: any, index: number, action: any, schema: any) => {
            // console.log('render', text, entity, index, action, schema);
            return (
              <RenderItem
                key={key}
                {...item}
                text={text}
                dataIndex={dataIndex}
                valueType={valueType}
                mode={'read'}
              />
            );
          }}
          renderFormItem={(schema: any, config: any, form: any) => {
            if (config?.isEditable) {
              console.log('renderFormItem', schema, config, form);
            }
            return (
              <RenderItem
                key={key}
                {...item}
                text={item?.text}
                dataIndex={dataIndex}
                valueType={valueType}
                mode={'edit'}
              />
            );
          }}
        ></ProDescriptions.Item>
      </>
    );
  };
  return <>{_renderItem(props, props.data, props.key)}</>;
};

export default RenderInfoItem;
