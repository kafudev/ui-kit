import React from 'react';
import { BaseEdit, BaseEditProps } from '@kafudev/ui-kit';

const Page: React.FC<BaseEditProps> = (props) => {
  const [values] = React.useState<any>({
    title: '标题',
    group11: '',
    group22: '',
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
      label: '金额',
      type: 'group',
      name: 'group1',
      items: [
        { label: '', name: 'group11', type: 'input', placeholder: '请输入金额' },
        { label: '', name: 'group21', type: 'input', placeholder: '请输入币种' },
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
