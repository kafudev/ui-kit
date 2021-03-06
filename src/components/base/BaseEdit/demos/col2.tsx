import React from 'react';
import { BaseEdit, BaseEditProps } from '@kafudev/ui-kit';

const Page: React.FC<BaseEditProps> = (props) => {
  const [values] = React.useState<any>({
    title: '标题',
    place: 'shop_banner',
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
    { label: '空项', type: 'empty' },
    {
      label: '内容',
      name: 'content',
      type: 'textarea',
      fieldProps: { maxLength: 100 },
      rules: [{ type: 'string', max: 100, message: '超过最大长度' }],
    },
    { label: '配置信息', desc: '表单的配置信息', type: 'header', color: '#f60' },
    { label: '状态', name: 'status', type: 'switch', trueValue: 1, falseValue: 0 },
  ]);

  // 表单提交
  const onSubmit = async (values: any) => {
    console.log('Page onSubmit:', values);
  };

  return (
    <BaseEdit
      action={props.action || props?.location?.query?.action}
      rowCol={2}
      items={items}
      values={values}
      onSubmit={onSubmit}
    />
  );
};

export default Page;
