import ProField, { ProFieldPropsType } from '@ant-design/pro-field/es/index';
import { Switch } from 'antd';
import React, { PropsWithChildren } from 'react';
// 自定义组件
import ItemHeader from '../ItemHeader';
import ItemImage from '../ItemImage';
import ItemVideo from '../ItemVideo';
import ItemDocument from '../ItemDocument';
import ItemUpload from '../ItemUpload';
import ItemMap from '../ItemMap';
import ItemArea from '../ItemArea';
import ItemEditor from '../ItemEditor';

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
    const valueType = item.valueType || item.type || 'text';
    item.valueType = valueType;
    switch (valueType) {
      case 'header': // !表单头部
        return <ItemHeader mode={item?.mode} {...item} />;
      // 以下自定义组件
      case 'image': // 图片
        return (
          <ItemImage
            mode={item?.mode}
            {...item}
            max={item?.max || 1}
            fieldProps={{ maxCount: item?.max || 1, multiple: false, ...item.fieldProps }}
          />
        );
      case 'avatar': // 头像
        return <ItemImage mode={item?.mode} max={1} {...item} />;
      case 'gallery': // 图集
        return (
          <ItemImage
            mode={item?.mode}
            {...item}
            max={item?.max || null}
            fieldProps={{ maxCount: item?.max || null, multiple: true, ...item.fieldProps }}
          />
        );
      case 'video': // 视频
        return <ItemVideo mode={item?.mode} {...item} />;
      case 'document': // 文档
        return <ItemDocument mode={item?.mode} {...item} />;
      case 'upload': // 上传
        return <ItemUpload mode={item?.mode} {...item} />;
      case 'map': // 地图
        return <ItemMap mode={item?.mode} {...item} />;
      case 'area': // 区域省市区
        return <ItemArea mode={item?.mode} {...item} />;
      case 'editor': // 富文本编辑器
        return <ItemEditor mode={item?.mode} {...item} />;
      // 以下是原有普通组件，可以直接使用，增加修改部分数据
      case 'input':
      case 'string':
      case 'text': // 输入框
        item.valueType = 'text';
        break;
      case 'number':
      case 'digit': // 数字输入框
        item.valueType = 'digit';
        break;
      case 'numberRange':
      case 'digitRange': // 数字范围输入框
        item.valueType = 'digitRange';
        item.fieldProps = { min: item?.min, max: item?.max, ...item.fieldProps };
        break;
      case 'switch': // 开关
        let trueText =
          item.checkedChildren ||
          item.trueText ||
          item?.fieldProps?.checkedChildren ||
          item?.fieldProps?.trueText ||
          '';
        let falseText =
          item.unCheckedChildren ||
          item.falseText ||
          item?.fieldProps?.unCheckedChildren ||
          item?.fieldProps?.falseText ||
          '';
        item.valuePropName = 'checked';
        item.fieldProps = {
          checkedChildren: trueText || '',
          unCheckedChildren: falseText || '',
          ...item.fieldProps,
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
    // if (item.mode !== 'read') {
    //   delete item['text'];
    // }
    // console.warn('item ', valueType, item, _item);
    return (
      <>
        <ProField
          {...item}
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
          rules={item?.rules}
          request={item?.request}
          width={item?.width}
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
