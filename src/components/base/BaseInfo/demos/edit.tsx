import React from 'react';
import { BaseInfo, BaseInfoProps } from '@kafudev/ui-kit';

const Page: React.FC<BaseInfoProps> = (props) => {
  const [values, setValues] = React.useState<any>({
    title: 'cccc',
    place: 'shop_banner',
    image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    form: {
      form2: 'xxxxb222',
    },
    content:
      '内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述',
    list: [
      {
        name: '项目1',
        list1: 'xxxxa111',
        list2: 'xxxxb111',
      },
      {
        name: '项目2',
        list1: 'xxxxa222',
        list2: 'xxxxb222',
      },
    ],
    type: 'horizontal',
    status: true,
    time: '',
    extra: 'xxxx',
  });
  const [items] = React.useState<any>([
    { label: '基本信息', type: 'header' },
    {
      label: '表单样式',
      name: 'type',
      type: 'radio',
      options: [
        { label: '横排', value: 'horizontal' },
        { label: '竖排', value: 'vertical' },
        // { label: '行内', value: 'inline' },
      ],
    },
    {
      label: '标题',
      name: 'title',
      type: 'input',
      copy: true,
    },
    {
      label: '位置',
      name: 'place',
      type: 'select',
      options: [
        { label: '首页轮播', value: 'home_banner' },
        { label: '商城轮播', value: 'shop_banner' },
      ],
    },
    {
      label: '状态',
      name: 'status',
      type: 'switch',
      trueText: '开启',
      falseText: '关闭',
    },
    {
      label: '内容',
      name: 'content',
      type: 'textarea',
      span: 2,
      fieldProps: { maxLength: 100 },
      // editable: false
    },
    { label: '日期信息', type: 'header' },
    {
      label: '日期',
      name: 'date',
      type: 'date',
    },
    {
      label: '日期区间',
      name: 'dateRange',
      type: 'dateRange',
    },
    {
      label: '时间',
      name: 'time',
      type: 'time',
    },
    {
      label: '时间区间',
      name: 'timeRange',
      type: 'timeRange',
    },
    {
      label: '日期时间',
      name: 'dateTime',
      type: 'dateTime',
    },
    {
      label: '日期时间区间',
      name: 'dateTimeRange',
      type: 'dateTimeRange',
    },
    {
      label: '年',
      name: 'dateYear',
      type: 'dateYear',
    },
    {
      label: '季度',
      name: 'dateQuarter',
      type: 'dateQuarter',
    },
    {
      label: '月',
      name: 'dateMonth',
      type: 'dateMonth',
    },
    {
      label: '周',
      name: 'dateWeek',
      type: 'dateWeek',
    },
  ]);

  return (
    <BaseInfo
      mode={props.mode}
      column={3}
      items={items}
      values={values}
      editable={{
        onSave: async (keypath: any, newInfo: any, oriInfo: any) => {
          console.log('editable onSave', keypath, newInfo, oriInfo);
          setValues(newInfo);
          return true;
        },
      }}
    />
  );
};

export default Page;
