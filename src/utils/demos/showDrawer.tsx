import ProCard from '@ant-design/pro-card';
import { Button, Space } from 'antd';
import React from 'react';
import page from '../page';

export default () => (
  <ProCard>
    <Space>
      <Button
        type="primary"
        onClick={() => {
          page.showDrawer(<div>{'侧栏内容'}</div>, {
            title: '侧栏标题',
          });
        }}
      >
        {'打开侧栏'}
      </Button>
      <Button
        onClick={() => {
          page.showDrawer(<div>{'侧栏内容'}</div>, {
            title: '侧栏标题',
            footer: <div>{'侧栏底部内容'}</div>,
          });
        }}
      >
        {'打开侧栏-添加侧栏底部'}
      </Button>
      <Button
        onClick={() => {
          page.showDrawer(<div>{'侧栏内容'}</div>, {
            title: '侧栏标题',
            extra: <Button>{'按钮'}</Button>,
          });
        }}
      >
        {'打开侧栏-添加侧栏扩展按钮'}
      </Button>
    </Space>
  </ProCard>
);
