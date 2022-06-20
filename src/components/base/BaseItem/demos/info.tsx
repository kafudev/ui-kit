import ProCard from '@ant-design/pro-card';
import ProDescriptions from '@ant-design/pro-descriptions/es';
import { BaseInfoItem, BaseItemProps } from '@kafudev/ui-kit';
import { Row } from 'antd';
import React from 'react';
export default (props: BaseItemProps) => (
  <ProCard>
    <ProDescriptions
      layout={props.layout || 'horizontal'}
      editable={props?.editable}
      column={props?.column || 3}
      dataSource={{
        input: '输入信息',
        digit: '123.58',
        date: '2022-05-02',
        switch: true,
        time: '10:11:12',
      }}
      columns={[]}
    >
      {BaseInfoItem({
        label: '头部栏目',
        type: 'header',
        span: 3,
      })}
      {BaseInfoItem({
        label: '输入',
        mode: 'read',
        type: 'input',
        name: 'input',
        ...props,
      })}
      {BaseInfoItem({
        label: '数字',
        mode: 'read',
        type: 'digit',
        name: 'digit',
        ...props,
      })}
      {BaseInfoItem({
        label: '日期',
        mode: 'read',
        type: 'date',
        name: 'date',
        ...props,
      })}

      {BaseInfoItem({
        label: '开关',
        mode: 'read',
        type: 'switch',
        name: 'switch',
        ...props,
      })}
      {BaseInfoItem({
        label: '时间',
        mode: 'read',
        type: 'time',
        name: 'time',
        ...props,
      })}
      {BaseInfoItem({
        label: '日期',
        mode: 'read',
        type: 'date',
        name: 'date',
        ...props,
      })}
    </ProDescriptions>
  </ProCard>
);
