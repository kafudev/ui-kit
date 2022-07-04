import React from 'react';
import ProCard from '@ant-design/pro-card';
import { BaseButton, BaseButtonProps } from '@kafudev/ui-kit';
import { Space } from 'antd';
export default (props: BaseButtonProps) => (
  <ProCard>
    <Space>
      <BaseButton type={'default'} {...props}>
        default
      </BaseButton>
      <BaseButton type={'primary'} {...props}>
        primary
      </BaseButton>
      <BaseButton type={'info'} {...props}>
        info
      </BaseButton>
      <BaseButton type={'success'} {...props}>
        success
      </BaseButton>
      <BaseButton type={'warning'} {...props}>
        warning
      </BaseButton>
      <BaseButton type={'error'} {...props}>
        error
      </BaseButton>
      <BaseButton type={'ghost'}>ghost</BaseButton>
      <BaseButton type={'dashed'}>dashed</BaseButton>
      <BaseButton type={'text'}>text</BaseButton>
    </Space>
  </ProCard>
);
