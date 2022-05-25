import React from 'react';
import type { ReactNode } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { BasePage } from '@kafudev/ui-kit';

export default () => (
  <div
    style={{
      background: '#F5F7FA',
    }}
  >
    <BasePage
      title={'页面标题'}
      extra={[
        <Button key="1">次要按钮</Button>,
        <Button key="2">次要按钮</Button>,
        <Button key="3" type="primary">
          主要按钮
        </Button>,
      ]}
    >
      {'页面内容content'}
    </BasePage>
  </div>
);
