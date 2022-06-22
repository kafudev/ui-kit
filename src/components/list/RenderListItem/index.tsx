import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormGroup, ProFormList } from '@ant-design/pro-form';
import { Row } from 'antd';
import React from 'react';
import { BaseItemProps } from '../../base';
import RenderItem from '../../field/RenderItem';

export interface BaseListItemProps extends BaseItemProps {
  itemProps: { [key: string]: any }; // 表单项配置
  data: { [key: string]: any }; // 表单值配置
  width?: string | number | any; // 表格标签宽度
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LogTag = 'RenderListItem';
const RenderListItem: React.FC<BaseListItemProps> = (props) => {
  // 渲染表单组件
  const _renderItem = (item: BaseListItemProps, data: any, key: any) => {
    // 组件有渲染函数直接渲染
    // if (item?.render) {
    //   return item.render(item);
    // }
    // 组件直接渲染
    if (React.isValidElement(item)) {
      return item;
    }
    // !设置默认属性
    let dataIndex = item?.dataIndex || item?.name || item?.key || '';
    // 渲染不同类型的组件
    const valueType = item?.valueType || 'text';
    switch (valueType) {
      case 'empty':
      case 'black':
        return null;
    }

    // 渲染默认的antd组件
    return (
      <>
        <RenderItem
          key={key}
          text={data?.[dataIndex]}
          dataIndex={dataIndex}
          {...item}
          mode={item.mode || 'edit'}
          valueType={valueType}
        />
      </>
    );
  };

  return _renderItem(props, props.data, props.key);
};

export default RenderListItem;
