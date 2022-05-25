import ProDescriptions, { ProDescriptionsProps } from '@ant-design/pro-descriptions/es/index';
import { ActionType } from '@ant-design/pro-table';
import React, { useRef, useImperativeHandle } from 'react';
import RenderInfoItem from '../../info/RenderInfoItem';
import BasePage, { BasePageProps } from '../BasePage';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export interface BaseInfoProps extends ProDescriptionsProps {
  mode?: 'page' | 'drawer' | 'modal'; // 呈现类型
  pageProps?: BasePageProps;
  labelWidth?: string | number; // 标签宽度
  items: { [key: string]: any }[]; // 字段配置
  datas: { [key: string]: any }; // 表单数据
  initItems?: (value: any) => void; // 初始化字段数据
  initDatas?: (value: any) => void; // 初始化数据
  renderHeader?: () => React.ReactNode; // 渲染头部
  renderFooter?: () => React.ReactNode; // 渲染底部
}
const LogTag = 'BaseInfo';

// 格式化项目数据
const formatItems = (_items: any[], _datas: any, _lists: any[]) => {
  let _nowIndex = 0;
  for (let index = 0; index < (_items.length || 0); index++) {
    const _item = _items[index];
    _items[index].dataIndex = _item?.name || _item?.dataIndex || _item?.key;
    _items[index].valueType = _item?.type || _item?.valueType;
    if (index === 0) {
      _nowIndex = 0;
      const tt: any = {};
      tt.label = '';
      tt.desc = '';
      tt.type = 'header';
      tt.valueType = 'header';
      tt.items = [];
      _lists.push(tt);
    }
    switch (_items[index].valueType) {
      // 头部-标题
      case 'header':
        // !转换成标题
        if (index === 0) {
          _nowIndex = 0;
          const tt: any = _item;
          tt.items = [];
          _lists[_nowIndex] = tt;
        } else {
          // 创建新的标题
          _nowIndex++;
          const tt: any = _item;
          tt.items = [];
          _lists.push(tt);
        }
        break;
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
        _lists[_nowIndex].items.push(_item);
        break;
    }
  }
  console.log('formatItems', _lists);
  return _lists;
};

const BaseInfo: React.FC<BaseInfoProps> = React.forwardRef((props, ref) => {
  const actionRef = useRef<ActionType>();
  const [lists, setLists] = React.useState(formatItems(props.items, props.datas, []));
  const [datas, setDatas] = React.useState(props.datas);

  useImperativeHandle(ref, () => ({
    actionRef: actionRef,
    ...actionRef.current,
  }));

  // 初始化字段数据
  React.useEffect(() => {
    console.log(LogTag, 'initItems items', props.items);
    if (props.initItems) {
      props.initItems(props.items);
    } else {
      // todo默认字段数据处理
    }

    console.log(LogTag, 'initDatas datas', props.datas);
    if (props.initDatas) {
      props.initDatas(props.datas);
    } else {
      // todo默认表单数据处理
    }
  }, []);

  // 属性值变化数据
  React.useEffect(() => {
    console.log(LogTag, 'propsChange items', props.items);
    if (props.items) {
      setLists(formatItems(props.items, props.datas, []));
    }
  }, [props.items]);

  React.useEffect(() => {
    console.log(LogTag, 'propsChange datas', props.datas);
    if (props.datas) {
      setDatas(props.datas);
    }
  }, [props.datas]);

  // 渲染数据
  const renderDatas = () => {
    return (
      <>
        {(lists || []).map((tt: Record<string, any>, ii: number) => {
          return (
            <ProDescriptions
              actionRef={actionRef}
              key={ii}
              {...props}
              title={
                (tt.items || []).length > 0 ? (
                  <RenderInfoItem
                    mode={'read'}
                    label={tt.label}
                    type="header"
                    data={datas || {}}
                    {...tt}
                  />
                ) : (
                  <></>
                )
              }
              layout={props.layout || 'horizontal'}
              // title={
              //   <InfoBody
              //     items={
              //       (tt.items || []).length > 0 ? [{ label: tt.label, type: 'header', ...tt }] : []
              //     }
              //     datas={{}}
              //   />
              // }
              editable={props?.editable}
              column={props?.column || 3}
              dataSource={datas}
              columns={[]}
            >
              {(tt.items || []).map((item: Record<string, any>, index: number) => {
                if (
                  item.type == 'header' ||
                  item.valueType == 'header' ||
                  item.type == 'empty' ||
                  item.valueType == 'empty'
                ) {
                  return <ProDescriptions.Item label="" editable={false}></ProDescriptions.Item>;
                }

                // 返回渲染组件
                return RenderInfoItem({
                  type: item.type,
                  data: datas,
                  ...item,
                  mode: 'read',
                });
              })}
            </ProDescriptions>
          );
        })}
      </>
    );
  };

  return (
    <BasePage mode={props.mode} {...props?.pageProps}>
      <>
        {props.renderHeader && props.renderHeader()}
        {renderDatas()}
        {props.children}
        {props.renderFooter && props.renderFooter()}
      </>
    </BasePage>
  );
});

export default BaseInfo;
