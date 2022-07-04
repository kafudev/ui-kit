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
      <BaseButton type={'default'} backgroundColor={'#f60'} color={'#fff'} borderColor={'#f60'}>
        default-#f60
      </BaseButton>
      <BaseButton type={'primary'} backgroundColor={'#f60'} color={'#fff'} borderColor={'#f60'}>
        primary-#f60
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
    </Space>
  </ProCard>
);
