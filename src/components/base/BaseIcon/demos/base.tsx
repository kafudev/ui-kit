import React from 'react';
import ProCard from '@ant-design/pro-card';
import { BaseIcon, BaseIconProps } from '@kafudev/ui-kit';
import { Space } from 'antd';
export default (props: BaseIconProps) => (
  <ProCard>
    <Space>
      <BaseIcon name={'HomeOutlined'} {...props} />
      <BaseIcon name={'SettingFilled'} {...props} />
      <BaseIcon name={'HeartOutlined'} {...props} />
    </Space>
  </ProCard>
);
