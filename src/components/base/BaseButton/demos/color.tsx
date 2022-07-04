import React from 'react';
import ProCard from '@ant-design/pro-card';
import { BaseButton, BaseButtonProps } from '@kafudev/ui-kit';
import { Row, Space } from 'antd';
export default (props: BaseButtonProps) => (
  <ProCard style={{ backgroundColor: '#fff' }}>
    <Row>
      <Space>
        <BaseButton type={'primary'}>primary</BaseButton>
        <BaseButton type={'primary'} ghost>
          primary-ghost
        </BaseButton>
        <BaseButton type={'info'}>info</BaseButton>
        <BaseButton type={'info'} ghost>
          info-ghost
        </BaseButton>
        <BaseButton type={'success'}>success</BaseButton>
        <BaseButton type={'success'} ghost>
          success-ghost
        </BaseButton>
        <BaseButton type={'warning'}>warning</BaseButton>
        <BaseButton type={'warning'} ghost>
          warning-ghost
        </BaseButton>
        <BaseButton type={'error'}>error</BaseButton>
        <BaseButton type={'error'} ghost>
          error-ghost
        </BaseButton>
      </Space>
    </Row>
    <br />
    <Row>
      <Space>
        <BaseButton type={'primary'} disabled>
          primary
        </BaseButton>
        <BaseButton type={'primary'} ghost disabled>
          primary-ghost
        </BaseButton>
        <BaseButton type={'info'} disabled>
          info
        </BaseButton>
        <BaseButton type={'info'} ghost disabled>
          info-ghost
        </BaseButton>
        <BaseButton type={'success'} disabled>
          success
        </BaseButton>
        <BaseButton type={'success'} ghost disabled>
          success-ghost
        </BaseButton>
        <BaseButton type={'warning'} disabled>
          warning
        </BaseButton>
        <BaseButton type={'warning'} ghost disabled>
          warning-ghost
        </BaseButton>
        <BaseButton type={'error'} disabled>
          error
        </BaseButton>
        <BaseButton type={'error'} ghost disabled>
          error-ghost
        </BaseButton>
      </Space>
    </Row>
    <br />
    <Row>
      <Space>
        <BaseButton type={'ghost'}>ghost</BaseButton>
        <BaseButton type={'ghost'} ghost color={'#333'}>
          ghost-ghost
        </BaseButton>
        <BaseButton danger>danger</BaseButton>
        <BaseButton danger ghost>
          danger-ghost
        </BaseButton>
        <BaseButton type={'text'}>text</BaseButton>
        <BaseButton type={'text'} ghost>
          danger-ghost
        </BaseButton>
      </Space>
    </Row>
    <br />
    <Row>
      <Space>
        <BaseButton type={'ghost'} borderColor={'#f60'}>
          ghost
        </BaseButton>
        <BaseButton type={'ghost'} ghost color={'#333'} borderColor={'#f60'}>
          ghost-ghost
        </BaseButton>
        <BaseButton danger borderColor={'#f60'}>
          danger
        </BaseButton>
        <BaseButton danger ghost borderColor={'#f60'}>
          danger-ghost
        </BaseButton>
        <BaseButton type={'text'} color={'#f60'}>
          text
        </BaseButton>
        <BaseButton type={'text'} ghost color={'#f60'}>
          danger-ghost
        </BaseButton>
      </Space>
    </Row>
  </ProCard>
);
