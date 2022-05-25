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
    <BasePage title={'这是页面标题'} cardProps={false}>{'页面内容content'}</BasePage>
  </div>
);
