import ProCard from '@ant-design/pro-card';
import { Button, Space } from 'antd';
import React from 'react';
import FormBox from './form';
import page from '../page';

export default () => (
  <ProCard>
    <Space>
      <Button
        type="primary"
        onClick={() => {
          page.showModal(<div>{'弹窗内容'}</div>, {
            title: '弹窗标题',
          });
        }}
      >
        {'打开弹窗'}
      </Button>
      <Button
        onClick={() => {
          page.showModal(<div>{'弹窗内容'}</div>, {
            title: '弹窗标题',
            footer: <div>{'弹窗底部内容'}</div>,
          });
        }}
      >
        {'打开弹窗-添加弹窗底部'}
      </Button>
      <Button
        onClick={() => {
          page.showModal(<div>{'弹窗内容'}</div>, {
            title: '弹窗标题',
            footer: null,
          });
        }}
      >
        {'打开弹窗-隐藏底部按钮'}
      </Button>
      <Button
        type="primary"
        onClick={() => {
          page.showModal(
            <FormBox
              mode={'modal'}
              setFooter={true}
              items={[]}
              values={{}}
              action={'edit'}
            ></FormBox>,
            {
              title: '弹窗标题',
              footer: [<Button>{'自定义按钮'}</Button>],
            },
          );
        }}
      >
        {'打开弹窗-表单编辑'}
      </Button>
    </Space>
  </ProCard>
);
