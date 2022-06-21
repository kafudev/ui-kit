import React from 'react';
import { BaseInfo, BaseInfoProps } from '@kafudev/ui-kit';

const Page: React.FC<BaseInfoProps> = (props) => {
  const [values] = React.useState<any>({
    title: 'cccc',
    place: 'shop_banner',
    image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    form: {
      form2: 'xxxxb222',
    },
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
    switch: 1,
    extra: 'xxxx',
  });
  const [items] = React.useState<any>([
    { label: '基本信息', type: 'header' },
    {
      label: '表单样式',
      name: 'type',
      type: 'radio',
      // radioType: 'radio',
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
      dropList: [
        { label: '首页轮播', value: 'home_banner' },
        { label: '商城轮播', value: 'shop_banner' },
      ],
    },
    {
      label: '封面图',
      name: 'image',
      type: 'image',
      desc: '建议图片宽高尺寸比例690*272像素及以上',
    },
    {
      label: '内容',
      name: 'content',
      type: 'textarea',
      fieldProps: { maxLength: 100 },
    },
    { label: 'empty', type: 'empty' },
    { label: '列表信息', desc: '', type: 'header', borderColor: '#f60' },
    { label: '列表类型', name: 'listtype', type: 'switch' },
    {
      label: '列表表单-array',
      type: 'array',
      name: 'list',
      showType: 'card',
      items: [
        { label: '字段1', name: 'list1', type: 'input' },
        { label: '字段2', name: 'list2', type: 'input' },
      ],
    },
    {
      label: '状态',
      name: 'status',
      type: 'switch',
      trueText: '开启',
      falseText: '关闭',
      trueValue: 1,
      falseValue: 0,
    },
    {
      label: '附加字段',
      name: 'extra',
      type: 'input',
      editable: true,
    },
  ]);

  return <BaseInfo mode={props.mode} column={3} items={items} values={values} />;
};

export default Page;
