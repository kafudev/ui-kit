import React from 'react';
import RenderInfoItem from '../RenderInfoItem';

export type Props = {
  items: { [key: string]: any }[]; // 表格列配置
  values: { [key: string]: any }; // 表单数据
  labelWidth?: string | number; // 表格宽度
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LogTag = 'InfoBody';
const InfoBody: React.FC<Props> = (props) => {
  return (
    <>
      {props?.items?.map((item, index) => {
        // 渲染表单组件
        return RenderInfoItem({
          mode: 'read',
          type: item.type,
          data: props.values,
          ...item,
        });
      })}
    </>
  );
};

export default InfoBody;
