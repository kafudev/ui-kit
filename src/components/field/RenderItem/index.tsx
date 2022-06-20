import ProField, { ProFieldPropsType } from '@ant-design/pro-field/es/index';
import { Switch } from 'antd';
import React, { PropsWithChildren } from 'react';
// 自定义组件
import ItemHeader from '../ItemHeader';
import ItemImage from '../ItemImage';
import ItemGallery from '../ItemGallery';
import ItemVideo from '../ItemVideo';
import ItemUpload from '../ItemUpload';
import ItemMap from '../ItemMap';

export interface RenderItemProps extends PropsWithChildren<any>, ProFieldPropsType {
  mode: 'edit' | 'read' | 'update';
  index?: number; // 表单索引
  text?: any; // 需要格式化的值
  type: any; // 类型
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LogTag = 'RenderItem';
const RenderItem: React.FC<RenderItemProps> = (props) => {
  // 渲染表单组件
  const _renderItem = (_item: any) => {
    // 解构原对象
    let { ...item } = _item;
    // !值名称
    item.valuePropName = 'value';
    // !设置默认属性
    item.dataIndex = item?.dataIndex || item?.name || item?.key || '';
    // !组件有渲染函数直接渲染
    if (item?.renderItem) {
      return item.renderItem(item);
    }
    // 组件直接渲染
    if (React.isValidElement(item)) {
      return item;
    }
    // !渲染不同类型的组件
    const valueType = item.type || item.valueType || '';
    item.valueType = valueType;
    switch (valueType) {
      case 'header': // !表单头部
        return <ItemHeader mode={item?.mode} {...item} />;
      // 以下自定义组件
      case 'image': // 图片
        return <ItemImage mode={item?.mode} {...item} />;
      case 'gallery': // 图集
        return <ItemGallery mode={item?.mode} {...item} />;
      case 'video': // 视频
        return <ItemVideo mode={item?.mode} {...item} />;
      case 'upload': // 上传
        return <ItemUpload mode={item?.mode} {...item} />;
      case 'map': // 地图
        return <ItemMap mode={item?.mode} {...item} />;
      // 以下是原有普通组件，可以直接使用，增加修改部分数据
      case 'input':
      case 'string':
      case 'text': // 输入框
        item.type = 'input';
        item.valueType = 'input';
        break;
      case 'switch': // 开关
        item.valuePropName = 'checked';
        item.fieldProps = {
          ...item.fieldProps,
          checkedChildren: item.checkedChildren || item.trueText || '',
          unCheckedChildren: item.unCheckedChildren || item.falseText || '',
        };
        if (item.mode == 'read') {
          return <Switch checked={item?.text} {...item.fieldProps} disabled={true} />;
        }
        break;
      case 'radio': // 单选
        item.valuePropName = 'checked';
        break;
      case 'empty': // 空组件
      case 'black':
        return null;
    }
    // 默认通过原组件渲染
    if (item.mode !== 'read') {
      delete item['text'];
    }
    // console.warn('item ', valueType, item, _item);
    return (
      <>
        <ProField
          mode={item.mode}
          name={item.name}
          valueType={item.valueType}
          disabled={item.disabled}
          readonly={item.readonly}
          options={item?.options}
          valueEnum={item?.valueEnum}
          initialValue={item?.initialValue}
          text={item?.text}
          onChange={item?.onChange}
          visible={item?.visible}
          {...item}
          request={async () => {
            if (item?.request) {
              // 请求远程下拉数据
              const list = await item.request();
              return list || [];
            } else {
              return item?.options || item?.valueEnum || item?.dropList || [];
            }
          }}
          fieldProps={{
            disabled: item?.disabled,
            placeholder: item?.placeholder,
            options: item?.options,
            defaultValue: props?.text,
            defaultChecked: props?.text,
            onChange: (...restParams: any) => {
              if (item.fieldProps?.onChange) {
                (item.fieldProps?.onChange as any)?.(...restParams);
                return;
              }
              // item.onChange?.(...restParams);
            },
            ...item?.fieldProps,
          }}
        />
      </>
    );
  };

  return <>{_renderItem(props)}</>;
};

export default RenderItem;