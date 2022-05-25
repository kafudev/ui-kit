import ProCard from '@ant-design/pro-card';
import { BaseItem, BaseFormItem, BaseInfoItem, BaseItemProps } from '@kafudev/ui-kit';
import { Row, Space } from 'antd';
import React from 'react';
export default (props: BaseItemProps) => (
  <ProCard>
    <Row>
      <Space>
        <BaseItem mode={'edit'} type={'input'} {...props} />
        <BaseItem mode={'edit'} type={'text'} {...props} />
        <BaseItem mode={'edit'} type={'date'} {...props} />
      </Space>
    </Row>
    <br />
    <Row>
      <Space>
        <BaseItem mode={'edit'} type={'input'} {...props} />
        <BaseItem mode={'edit'} type={'text'} {...props} />
        <BaseItem mode={'edit'} type={'date'} {...props} />
      </Space>
    </Row>
  </ProCard>
);
