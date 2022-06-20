import React from 'react';
import { BaseEdit, BaseEditProps } from '@kafudev/ui-kit';
import { findIndexItems } from '@kafudev/ui-kit';

const Page: React.FC<BaseEditProps> = (props) => {
  const [values] = React.useState<any>({
    title: '标题',
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
    { label: '列表类型', name: 'listtype', type: 'switch' },
    {
      label: '列表表单-array',
      type: 'array',
      name: 'list',
      showType: 'card',
      items: [
        { label: '字段1', name: 'list1', type: 'input' },
        { label: '字段2', name: 'list2', type: 'input' },
        { label: '字段3', name: 'list2', type: 'input' },
      ],
    },
  ]);

  // 表单字段变化
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onValuesChange = (changedValues: any, values: any) => {
    console.log('onValuesChange:', changedValues, values);
    for (const key in changedValues) {
      if (Object.prototype.hasOwnProperty.call(changedValues, key)) {
        const value = changedValues[key];
        switch (key) {
          case 'listtype':
            if (value == true) {
              items[findIndexItems('list', items)].showType = 'card';
              setItems([...items]);
            } else {
              items[findIndexItems('list', items)].showType = '';
              setItems([...items]);
            }
            break;
          default:
            break;
        }
      }
    }
  };

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
      onValuesChange={onValuesChange}
    />
  );
};

export default Page;
