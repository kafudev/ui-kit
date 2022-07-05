import React, { useEffect } from 'react';
import { BaseEdit, BaseEditProps } from '@kafudev/ui-kit';
import { findIndexItems } from '@kafudev/ui-kit';
import { Button } from 'antd';

const Page: React.FC<BaseEditProps> = (props) => {
  const [layout, setLayout] = React.useState<'horizontal' | 'vertical' | 'inline'>('horizontal');
  const [values, setValues] = React.useState<any>({
    title: '标题',
    place: 'shop_banner',
    image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    layout: 'horizontal',
    status: true,
    status1: true,
    editor: '<p>vdvdvddvd</p>',
    area: ['33', '3301', '330102'],
    area2: ['33', '3301', '330102', '330102001'],
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
      label: '金额',
      name: 'number',
      type: 'number',
      min: 0,
      width: 'lg',
      placeholder: '请输入金额',
    },
    {
      label: '封面图',
      name: 'image',
      type: 'image',
      placeholder: '',
      rules: [{ required: true, trigger: 'blur' }],
    },
    {
      label: '拖拽',
      name: 'image2',
      type: 'image',
      max: 5,
      uploadType: 'dragger',
      placeholder: '',
      rules: [{ required: false, trigger: 'blur' }],
    },
    {
      label: '图集',
      name: 'gallery',
      type: 'gallery',
      max: 5,
      placeholder: '',
      rules: [{ required: false, trigger: 'blur' }],
    },
    {
      label: '视频',
      name: 'video',
      type: 'video',
      max: 1,
      placeholder: '',
      rules: [{ required: false, trigger: 'blur' }],
    },
    {
      label: '视频集合',
      name: 'videos',
      type: 'video',
      max: 5,
      placeholder: '',
      rules: [{ required: false, trigger: 'blur' }],
    },
    {
      label: '文件',
      name: 'document',
      type: 'document',
      max: 1,
      placeholder: '',
      rules: [{ required: false, trigger: 'blur' }],
    },
    {
      label: '文件集合',
      name: 'documents',
      type: 'document',
      max: 5,
      placeholder: '',
      rules: [{ required: false, trigger: 'blur' }],
    },
    {
      label: '省市区',
      name: 'area',
      type: 'area',
      rules: [{ required: false, trigger: 'blur', type: 'array' }],
    },
    {
      label: '省市区街道',
      name: 'area2',
      type: 'area',
      areaType: 'pcas',
      rules: [{ required: false, trigger: 'blur', type: 'array' }],
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
    {
      label: '富文本',
      name: 'editor',
      type: 'editor',
      uploadUrl: '/admin/sys/common/upload',
      uploadResult: async (res: any) => {
        if (res?.code == 200) {
          return { url: res.result };
        }
        return {};
      },
    },
    { label: '配置信息', desc: '表单的配置信息', type: 'header', borderColor: '#f60' },
    {
      label: '样式',
      name: 'layout',
      type: 'radio',
      // radioType: 'radio',
      options: [
        { label: '横排', value: 'horizontal' },
        { label: '竖排', value: 'vertical' },
      ],
    },
    { label: '状态', name: 'status1', type: 'switch', trueText: '编辑', falseText: '只读' },
    { label: '读写状态', name: 'status', type: 'switch', trueText: '打开', falseText: '关闭' },
  ]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setValues({
  //       title: '标题',
  //       place: 'shop_banner',
  //       image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //       // type: 'horizontal',
  //       status: true,
  //     });
  //   }, 1500);
  // }, []);

  // 表单提交
  const onSubmit = async (values: any) => {
    console.log('Page onSubmit:', values);
  };

  // 表单字段变化
  const onValuesChange = (changedValues: any, values: any) => {
    console.log('onValuesChange:', changedValues, values);
    for (const key in changedValues) {
      if (Object.prototype.hasOwnProperty.call(changedValues, key)) {
        const value = changedValues[key];
        switch (key) {
          case 'status':
            // if (value == true) {
            //   items[findIndexItems('image', items)].mode = 'edit';
            //   items[findIndexItems('gallery', items)].mode = 'edit';
            //   items[findIndexItems('gallery', items)].fieldProps = {
            //     disabled: false,
            //   };
            //   items[findIndexItems('area', items)].mode = 'edit';
            //   items[findIndexItems('area2', items)].mode = 'edit';
            //   setItems([...items]);
            // } else {
            //   items[findIndexItems('image', items)].mode = 'read';
            //   items[findIndexItems('gallery', items)].mode = 'read';
            //   items[findIndexItems('gallery', items)].fieldProps = {
            //     disabled: true,
            //   };
            //   items[findIndexItems('area', items)].mode = 'read';
            //   items[findIndexItems('area2', items)].mode = 'read';
            //   setItems([...items]);
            // }
            // 循环设置items
            items.map((item: { name: string; mode: string }) => {
              if (item.name !== 'status') {
                item.mode = value ? 'edit' : 'read';
              }
            });
            setItems([...items]);

            values.status1 = value;
            setValues({ ...values });
            break;
          case 'layout':
            setLayout(value);
            break;
          default:
            break;
        }
      }
    }
  };

  return (
    <BaseEdit
      {...props}
      action={props.action || props?.location?.query?.action}
      items={items}
      values={values}
      onSubmit={onSubmit}
      onValuesChange={onValuesChange}
      layout={layout}
    />
  );
};

export default Page;
