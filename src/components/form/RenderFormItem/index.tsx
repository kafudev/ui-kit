import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormGroup, ProFormList } from '@ant-design/pro-form';
import { Row } from 'antd';
import React from 'react';
import { BaseItemProps } from '../../base';
import RenderItem from '../../field/RenderItem';

export interface BaseFormItemProps extends BaseItemProps {
  data: { [key: string]: any }; // 表单值配置
  width?: string | number | any; // 表格标签宽度
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LogTag = 'RenderFormItem';
const RenderFormItem: React.FC<BaseFormItemProps> = (props) => {
  // 渲染表单组件
  const _renderItem = (item: BaseFormItemProps, data: any, key: any) => {
    // 组件有渲染函数直接渲染
    // if (item?.render) {
    //   return item.render(item);
    // }
    // 组件直接渲染
    if (React.isValidElement(item)) {
      return item;
    }
    // 渲染不同类型的组件
    const valueType = item?.type || item?.valueType || '';
    switch (valueType) {
      case 'header': // !表单头部
        return (
          <>
            {/* @ts-ignore */}
            <Row span={item?.span}>
              <RenderItem
                key={key}
                {...item}
                type={valueType}
                valueType={valueType}
                marginBottom={'10px'}
                mode={item.mode || 'edit'}
              />
            </Row>
          </>
        );
      case 'group': // !表单组合-字段
        return (
          <ProForm.Item
            key={key}
            label={item?.label || ' '}
            colon={item?.label == '' ? false : true}
            {...item}
          >
            <ProFormGroup key="key">
              {item.items.map((tt: any, ii: number) => {
                return _renderItem(tt, data, ii);
              })}
            </ProFormGroup>
          </ProForm.Item>
        );
      // case 'set': // !表单set
      //   return (
      //     <ProFormFieldSet
      //       name={item.name}
      //       label={item.label}
      //       // 支持 两种方式，type="group" 会用input.group 包裹
      //       // 如果不配置 默认使用 space
      //       type="space"
      //       transform={(value: any) => {
      //         console.log('transform', value);
      //         const newData = {};
      //         // 循环表单项
      //         for (let ii = 0; ii < item.items.length; ii++) {
      //           const tt = item.items[ii];
      //           // 组合数据
      //           newData[tt.name] = value[ii];
      //         }
      //         console.log('transform newData', newData);
      //         return {
      //           [item.name]: newData,
      //         };
      //       }}
      //       convertValue={(value: any, field: any) => {
      //         console.log('convertValue', value, field);
      //         return value;
      //       }}
      //     >
      //       {item.items.map((tt: any, ii: number) => {
      //         return renderItem(tt, ii);
      //       })}
      //     </ProFormFieldSet>
      //   );
      case 'form': // !表单嵌套-对象
      case 'object': // !表单嵌套-对象
        return (
          <ProFormList
            key={key}
            name={item.name}
            label={item.label}
            min={1}
            max={1}
            itemRender={({ listDom, action }, { record }) => {
              return (
                <ProCard
                  bordered
                  extra={action}
                  title={record?.name}
                  style={{
                    marginBottom: 8,
                  }}
                >
                  {listDom}
                </ProCard>
              );
            }}
          >
            <ProFormGroup key="key">
              {item.items.map((tt: any, ii: number) => {
                return _renderItem(tt, data?.[item?.name], ii);
              })}
            </ProFormGroup>
          </ProFormList>
        );
      case 'list': // !表单列表-数组
      case 'array': // !表单列表-数组
        return (
          <ProFormList
            key={key}
            name={item.name}
            label={item.label}
            itemRender={({ listDom, action }, { record }) => {
              // 卡片呈现方式
              if (item.showType === 'card') {
                return (
                  <ProCard
                    bordered
                    extra={action}
                    title={record?.name}
                    style={{
                      marginBottom: 8,
                    }}
                  >
                    {listDom}
                  </ProCard>
                );
              }
            }}
          >
            <ProFormGroup key="key">
              {item.items?.map((tt: any, ii: number) => {
                return _renderItem(tt, data?.[item?.name], ii);
              })}
            </ProFormGroup>
          </ProFormList>
        );
      case 'empty':
      case 'black':
        return null;
    }

    // 渲染默认的antd组件
    return (
      <>
        <ProForm.Item
          key={key}
          extra={item?.desc || ''}
          name={item?.name}
          label={item?.label}
          tooltip={item?.tooltip}
        >
          <RenderItem
            key={key}
            text={data?.[item?.name]}
            {...item}
            mode={item.mode || 'edit'}
            type={valueType}
            valueType={valueType}
          />
        </ProForm.Item>
      </>
    );
  };

  return <>{_renderItem(props, props.data, props.key)}</>;
};

export default RenderFormItem;
