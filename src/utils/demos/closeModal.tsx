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
          const ref = page.showModal(<div>{'弹窗内容'}</div>, {
            title: '弹窗标题',
          });
          setTimeout(() => {
            // 通过引用关闭
            ref?.current?.close();
          }, 2000);
        }}
      >
        {'关闭弹窗'}
      </Button>
      <Button
        onClick={() => {
          const ref = page.showModal(<div>{'弹窗内容'}</div>, {
            title: '弹窗标题',
          });
          setTimeout(() => {
            // 通过引用关闭
            page.closeModal(ref);
            // 参数留空则全部关闭
            page.closeModal();
          }, 2000);
        }}
      >
        {'全局关闭弹窗'}
      </Button>
      <Button
        onClick={() => {
          const ref = page.showModal(<div>{'弹窗内容'}</div>, {
            title: '弹窗标题',
          });
          setTimeout(() => {
            // 通过节点关闭，无动画
            page.closeModal(null, ref?.current?.node);
          }, 2000);
        }}
      >
        {'全局关闭弹窗-无动画'}
      </Button>
    </Space>
  </ProCard>
);
