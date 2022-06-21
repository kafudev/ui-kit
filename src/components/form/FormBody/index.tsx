import { Col, Row } from 'antd';
import React from 'react';
import RenderFormItem from '../RenderFormItem';

export type Props = {
  items: { [key: string]: any }[]; // 表格列配置
  values: { [key: string]: any }; // 表单数据
  width?: string | number; // 表格宽度
  rowCol?: number; // 行列数 默认为1
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LogTag = 'FormBody';
const FormBody: React.FC<Props> = (props) => {
  const [itemList, setItemList] = React.useState<any[]>([]);

  const getItemList = (): any[] => {
    const ll = props.items.map((item, index) => {
      // 渲染表单组件
      return RenderFormItem({
        key: index,
        mode: 'edit',
        type: item.type,
        data: props.values,
        ...item,
        itemProps: {
          ...item?.itemProps,
        },
      });
    });
    const _ll = [];
    for (let index = 0; index < ll.length; index++) {
      const item = ll[index];
      if (props?.rowCol && props?.rowCol > 1) {
        // 区分类型
        if (props.items[index]?.type == 'header') {
          // 单行显示
          _ll.push(item);
        } else {
          _ll.push(
            <Row key={index}>
              <Col span={12}>{item}</Col>
              <Col span={12}>{props.items[index + 1]?.type == 'header' ? null : ll[++index]}</Col>
            </Row>,
          );
        }
      } else {
        _ll.push(item);
      }
    }
    return _ll;
  };

  React.useEffect(() => {
    const ll: any[] = getItemList();
    setItemList(ll);
  }, []);

  React.useEffect(() => {
    const ll: any[] = getItemList();
    setItemList(ll);
  }, [props.values, props.items, props.rowCol]);

  return (
    <>
      {itemList.map((item) => {
        return item;
      })}
    </>
  );
};

export default FormBody;
