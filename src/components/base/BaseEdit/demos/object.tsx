import React from 'react';
import { BaseEdit, BaseEditProps } from '@kafudev/ui-kit';

const Page: React.FC<BaseEditProps> = (props) => {
  const [values] = React.useState<any>({
    title: '标题',
    form: {
      form1: 'xxxxb111',
      form2: 'xxxxb222',
      form3: 'xxxxb333',
      form4: 'xxxxb444',
    },
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
      label: '嵌套表单-object',
      type: 'object',
      name: 'form',
      items: [
        { label: '字段1', name: 'form1', type: 'input' },
        { label: '字段2', name: 'form2', type: 'input' },
        { label: '字段3', name: 'form3', type: 'input' },
        { label: '字段4', name: 'form4', type: 'input' },
      ],
    },
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
    />
  );
};

export default Page;
