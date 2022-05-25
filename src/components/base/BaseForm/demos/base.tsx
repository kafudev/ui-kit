import React from 'react';
import { BaseForm } from '@kafudev/ui-kit';
import { findIndexItems } from '@kafudev/ui-kit';
import ProCard from '@ant-design/pro-card';
import { Button } from 'antd';

const Page: React.FC<any> = (props) => {
  const [formLayoutType, setFormLayoutType] = React.useState<'horizontal' | 'vertical' | 'inline'>(
    'horizontal',
  );
  const [rowCol, setRowCol] = React.useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [forms, setForms] = React.useState<any>({
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
    switch: false,
  });
  const [items, setItems] = React.useState<any>([
    { label: '样式信息', desc: '表单的基本信息', type: 'header' },
    {
      label: '表单样式',
      name: 'type',
      type: 'radioButton',
      // radioType: 'radio',
      options: [
        { label: '横排', value: 'horizontal' },
        { label: '竖排', value: 'vertical' },
        // { label: '行内', value: 'inline' },
      ],
    },
    { label: '空', name: 'empty', type: 'empty' },
    {
      label: '行列显示',
      name: 'rowCol',
      type: 'radio',
      options: [
        { label: '一行一列', value: 1 },
        { label: '一行两列', value: 2 },
      ],
    },
    { label: '基本信息', desc: '表单的基本信息', type: 'header' },
    {
      label: '标题',
      name: 'title',
      type: 'input',
      placeholder: '请输入标题',
      tooltip: '提示语',
      desc: '详细描述内容',
      rules: [{ required: true, trigger: 'blur' }],
    },
    {
      label: '位置',
      name: 'place',
      type: 'select',
      dropList: [
        { label: '首页轮播', value: 'home_banner' },
        { label: '商城轮播', value: 'shop_banner' },
      ],
      rules: [{ required: true, trigger: 'blur' }],
    },
    {
      label: '禁止输入',
      name: 'sstitle',
      disabled: true,
      type: 'input',
      placeholder: '禁止输入禁止输入',
    },
    {
      label: '只读输入',
      name: 'ssstitle',
      readonly: true,
      type: 'input',
      placeholder: '只读输入只读输入',
    },
    {
      label: '多选',
      name: 'checkbox',
      type: 'checkbox',
      options: [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
        { label: 'D', value: 'D' },
        { label: 'E', value: 'E' },
      ],
    },
    {
      label: '封面图',
      name: 'image',
      type: 'image',
      desc: '建议图片宽高尺寸比例690*272像素及以上',
      rules: [{ required: true, trigger: 'blur' }],
    },
    {
      label: '内容',
      name: 'content',
      type: 'textarea',
      fieldProps: { maxLength: 100 },
      rules: [{ type: 'string', max: 100, message: '超过最大长度' }],
    },
    { label: '组合信息', desc: '表单的基本信息', type: 'header', borderColor: '#f60' },
    {
      label: '组合字段',
      type: 'group',
      name: 'group',
      items: [
        { label: '组合1', name: 'group1', type: 'input' },
        { label: '组合2', name: 'group2', type: 'input' },
        { label: '组合3', name: 'group2', type: 'input' },
        { label: '组合4', name: 'group2', type: 'input' },
        { label: '组合5', name: 'group2', type: 'input' },
      ],
    },
    { label: '组合信息', desc: '表单的基本信息', type: 'header', borderColor: '#f60' },
    {
      label: '金额',
      type: 'group',
      name: 'group1',
      items: [
        { label: '', name: 'group11', type: 'input', placeholder: '请输入金额' },
        { label: '', name: 'group21', type: 'input', placeholder: '请输入币种' },
      ],
    },
    { label: '嵌套信息', desc: '表单的基本信息', type: 'header' },
    {
      label: '嵌套表单-object',
      type: 'object',
      name: 'form',
      items: [
        { label: '字段1', name: 'form1', type: 'input' },
        { label: '字段2', name: 'form2', type: 'input' },
        { label: '字段3', name: 'form2', type: 'input' },
      ],
    },
    { label: '列表信息', desc: '表单的基本信息', type: 'header', borderColor: '#f00' },
    { label: '列表类型', name: 'listtype', type: 'switch' },
    { label: '空', name: 'empty', type: 'empty' },
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
    { label: '空', name: 'empty', type: 'empty' },
    { label: '状态', name: 'status', type: 'switch', trueValue: 1, falseValue: 0 },
    { label: '空', name: 'empty', type: 'empty' },
    {
      label: '附加字段',
      name: 'extra',
      type: 'input',
      rules: [{ required: true, trigger: 'blur' }],
    },
    { label: '时间', name: 'time', type: 'timeRange' },
    // <Button> 直接渲染组件</Button>,
  ]);

  React.useEffect(() => {
    console.log('query', props?.location?.query);
  }, [props?.location?.query]);

  const initItems = (values: any) => {
    console.log('initItems:', values);
    // setItems(values);
  };

  const initForms = (values: any) => {
    console.log('initForms:', values);
    // setForms(values);
  };

  // 表单字段变化
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const changeForms = (changedValues: any, values: any) => {
    console.log('changeForms:', changedValues, values);
    for (const key in changedValues) {
      if (Object.prototype.hasOwnProperty.call(changedValues, key)) {
        const value = changedValues[key];
        switch (key) {
          case 'type':
            setFormLayoutType(value);
            break;
          case 'rowCol':
            setRowCol(value);
            break;
          case 'listtype':
            if (value == true) {
              items[findIndexItems('list', items)].showType = 'card';
              setItems([...items]);
            } else {
              items[findIndexItems('list', items)].showType = '';
              setItems([...items]);
            }
            break;
          case 'status':
            if (value == true) {
              items[findIndexItems('extra', items)].type = 'empty';
              setItems([...items]);
            } else {
              items[findIndexItems('extra', items)].type = 'input';
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
    <ProCard>
      <BaseForm
        rowCol={rowCol}
        // labelCol={{span:6}}
        // wrapperCol={{span:14}}
        layout={formLayoutType}
        fixedSubmit={props.fixedSubmit}
        submitTargetId={props.submitTargetId}
        items={items}
        forms={forms}
        changeForms={changeForms}
        onSubmit={onSubmit}
      />
    </ProCard>
  );
};

export default Page;
