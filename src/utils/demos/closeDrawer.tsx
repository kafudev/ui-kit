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
          const ref = page.showDrawer(<div>{'侧栏内容'}</div>, {
            title: '侧栏标题',
          });
          setTimeout(() => {
            // 通过引用关闭
            ref?.current?.close();
          }, 2000);
        }}
      >
        {'关闭侧栏'}
      </Button>
      <Button
        onClick={() => {
          const ref = page.showDrawer(<div>{'侧栏内容'}</div>, {
            title: '侧栏标题',
          });
          setTimeout(() => {
            // 通过引用关闭
            page.closeDrawer(ref);
            // 参数留空则全部关闭
            page.closeDrawer();
          }, 2000);
        }}
      >
        {'全局关闭侧栏'}
      </Button>
      <Button
        onClick={() => {
          const ref = page.showDrawer(<div>{'侧栏内容'}</div>, {
            title: '侧栏标题',
          });
          setTimeout(() => {
            // 通过节点关闭，无动画
            page.closeDrawer(null, ref?.current?.node);
          }, 2000);
        }}
      >
        {'全局关闭侧栏-无动画'}
      </Button>
    </Space>
  </ProCard>
);
