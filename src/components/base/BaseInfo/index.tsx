import ProDescriptions, { ProDescriptionsProps } from '@ant-design/pro-descriptions/es/index';
import { ActionType } from '@ant-design/pro-table';
import { Row } from 'antd';
import React, { useRef, useImperativeHandle } from 'react';
import RenderInfoItem from '../../info/RenderInfoItem';
import BasePage, { BasePageProps } from '../BasePage';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export interface BaseInfoProps extends ProDescriptionsProps {
  mode?: 'page' | 'drawer' | 'modal' | 'card'; // 呈现类型
  pageProps?: BasePageProps;
  labelWidth?: string | number; // 标签宽度
  items: { [key: string]: any }[]; // 字段配置
  values: { [key: string]: any }; // 详情数据值
  // initItems?: (value: any) => void; // 初始化字段数据
  // initDatas?: (value: any) => void; // 初始化数据
  renderHeader?: () => React.ReactNode; // 渲染头部
  renderFooter?: () => React.ReactNode; // 渲染底部
}
const LogTag = 'BaseInfo';

// 格式化项目数据
const formatItems = (_items: any[], _datas: any) => {
  for (let index = 0; index < (_items?.length || 0); index++) {
    const _item = _items[index];
    _items[index].dataIndex = _item?.dataIndex || _item?.name || _item?.key;
    _items[index].valueType = _item?.valueType || _item?.type;
    switch (_items[index].valueType) {
      // 表单-对象
      case 'form':
      case 'object':
        // todo 转换成对象
        break;
      // 列表-数组
      case 'list':
      case 'array':
        // todo 转换成数组
        break;
      default:
        break;
    }
  }
  console.log('formatItems', _items);
  return _items;
};

const BaseInfo: React.FC<BaseInfoProps> = React.forwardRef((props, ref) => {
  const actionRef = useRef<ActionType>();
  const [items, setItems] = React.useState(formatItems(props.items, props.values));
  const [values, setValues] = React.useState(props.values);

  useImperativeHandle(ref, () => ({
    actionRef: actionRef,
    ...actionRef.current,
  }));

  // // 初始化字段数据
  // React.useEffect(() => {
  //   console.log(LogTag, 'initItems items', props.items);
  //   if (props.initItems) {
  //     props.initItems(props.items);
  //   } else {
  //     // todo默认字段数据处理
  //   }

  //   console.log(LogTag, 'initDatas values', props.values);
  //   if (props.initDatas) {
  //     props.initDatas(props.values);
  //   } else {
  //     // todo默认表单数据处理
  //   }
  // }, []);

  // 属性值变化数据
  React.useEffect(() => {
    console.log(LogTag, 'propsChange items', props.items);
    if (props.items) {
      setItems(formatItems(props.items, props.values));
    }
  }, [props.items]);

  React.useEffect(() => {
    console.log(LogTag, 'propsChange values', props.values);
    if (props.values) {
      setValues(props.values);
    }
  }, [props.values]);

  // 渲染数据
  const renderData = () => {
    return (
      <ProDescriptions
        actionRef={actionRef}
        {...props}
        layout={props.layout || 'horizontal'}
        editable={props?.editable}
        column={props?.column || 3}
        dataSource={values}
        columns={[]}
      >
        {(items || []).map((item: Record<string, any>, index: number) => {
          // 返回渲染组件
          return RenderInfoItem({
            type: item.type,
            data: values,
            // header组件占用一行
            span: item.type == 'header' || item.valueType == 'header' ? props?.column || 3 : 1,
            ...item,
            mode: 'read',
            itemProps: {
              ...item?.itemProps,
            },
          });
        })}
      </ProDescriptions>
    );
  };

  return (
    <BasePage mode={props.mode} {...props?.pageProps}>
      <>
        {props.renderHeader && props.renderHeader()}
        {renderData()}
        {props.children}
        {props.renderFooter && props.renderFooter()}
      </>
    </BasePage>
  );
});

export default BaseInfo;
