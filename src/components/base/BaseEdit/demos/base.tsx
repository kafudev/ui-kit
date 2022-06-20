import React from 'react';
import { BaseEdit, BaseEditProps } from '@kafudev/ui-kit';

const Page: React.FC<BaseEditProps> = (props) => {
  const [values, setValues] = React.useState<any>({
    title: '标题',
    place: 'shop_banner',
    // type: 'horizontal',
    // switch: false,
  });
  const [items, setItems] = React.useState<any>([
    { label: '基本信息', desc: '表单的基本信息', type: 'header' },
    {
      label: '标题',
      name: 'title',
      type: 'input',
      placeholder: '请输入标题',
      rules: [{ required: true, trigger: 'blur' }],
    },
    {
      label: '副标题',
      name: 'stitle',
      type: 'input',
      placeholder: '请输入副标题',
      disabled: true,
    },
    {
      label: '位置',
      name: 'place',
      type: 'select',
      options: [
        { label: '首页轮播', value: 'home_banner' },
        { label: '商城轮播', value: 'shop_banner' },
      ],
      rules: [{ required: true, trigger: 'blur' }],
    },
    {
      label: '内容',
      name: 'content',
      type: 'textarea',
      fieldProps: { maxLength: 100 },
      rules: [{ type: 'string', max: 100, message: '超过最大长度' }],
    },
    { label: '配置信息', desc: '表单的配置信息', type: 'header', borderColor: '#f60' },
    {
      label: '样式',
      name: 'type',
      dataIndex: 'type',
      type: 'radio',
      // radioType: 'radio',
      options: [
        { label: '横排', value: 'horizontal' },
        { label: '竖排', value: 'vertical' },
      ],
    },
    { label: '状态', name: 'status', type: 'switch', trueText: '打开', falseText: '关闭' },
  ]);

  // 表单提交
  const onSubmit = async (values: any) => {
    console.log('Page onSubmit:', values);
  };

  return (
    <BaseEdit
      action={props.action || props?.location?.query?.action}
      items={items}
      values={values}
      onSubmit={onSubmit}
      layout={'horizontal'}
    />
  );
};

export default Page;
