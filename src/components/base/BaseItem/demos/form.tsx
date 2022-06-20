import ProCard from '@ant-design/pro-card';
import { BaseFormItem, BaseItemProps } from '@kafudev/ui-kit';
import { Row, Space } from 'antd';
import React from 'react';
export default (props: BaseItemProps) => (
  <ProCard>
    <Row>
      <BaseFormItem label={'头部栏目'} type={'header'} />
    </Row>
    <Row>
      <Space>
        <BaseFormItem mode={'edit'} label={'输入'} type={'input'} {...props} />
        <BaseFormItem
          mode={'edit'}
          label={'数字'}
          type={'digit'}
          item={{ label: '数字', type: 'digit' }}
          {...props}
        />
        <BaseFormItem
          mode={'edit'}
          label={'日期'}
          type={'date'}
          item={{ label: '日期', type: 'date' }}
          {...props}
        />
      </Space>
    </Row>
    <br />
    <Row>
      <BaseFormItem label={'日期栏目'} type={'header'} />
    </Row>
    <Row>
      <Space>
        <BaseFormItem mode={'edit'} label={'开关'} type={'switch'} {...props} />
        <BaseFormItem mode={'edit'} label={'时间'} type={'time'} {...props} />
        <BaseFormItem mode={'edit'} label={'日期'} type={'date'} {...props} />
      </Space>
    </Row>
  </ProCard>
);
