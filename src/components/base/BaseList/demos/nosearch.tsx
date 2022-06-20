import { BaseEdit, BaseList, BaseListProps, page } from '@kafudev/ui-kit';
import { ReactNode, useRef } from 'react';
import React from 'react';

const Page: React.FC<BaseListProps> = (props) => {
  const ref = useRef<any>();
  const [table] = React.useState<any>({
    mname: 'rule',
    key: 'id',
  });
  const [datas] = React.useState<any[]>([
    {
      id: 1,
      title: 'cccc',
      place: 'shop_banner',
      image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      status: 1,
    },
    {
      id: 2,
      title: 'cccc',
      place: 'shop_banner',
      image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      status: 1,
    },
    {
      id: 3,
      title: 'cccc',
      place: 'shop_banner',
      image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      status: 1,
    },
    {
      id: 4,
      title: 'cccc',
      place: 'shop_banner',
      image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      status: 1,
    },
    {
      id: 5,
      title: 'cccc',
      place: 'shop_banner',
      image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      status: 1,
    },
    {
      id: 6,
      title: 'cccc',
      place: 'shop_banner',
      image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      status: 1,
    },
    {
      id: 7,
      title: 'cccc',
      place: 'shop_banner',
      image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      status: 1,
    },
    {
      id: 8,
      title: 'cccc',
      place: 'shop_banner',
      image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      status: 1,
    },
    {
      id: 9,
      title: 'cccc',
      place: 'shop_banner',
      image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      status: 1,
    },
    {
      id: 10,
      title: 'cccc',
      place: 'shop_banner',
      image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      status: 1,
    },
    {
      id: 11,
      title: 'cccc',
      place: 'shop_banner',
      image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      status: 1,
    },
  ]);
  const [actions] = React.useState<any[]>([
    {
      label: '新增数据',
      icon: 'PlusOutlined',
      type: 'button',
      auth1: '/admin/advert/add',
      onClick: () => {
        console.log('点击操作按钮-新增数据');
      },
    },
    {
      label: '刷新数据',
      // icon: 'RefreshOutlined',
      type: 'button',
      buttonType: 'success',
      onClick: () => {
        ref?.current?.reload();
      },
    },
    {
      label: '重置数据',
      // icon: 'RefreshOutlined',
      type: 'button',
      buttonType: 'success',
      onClick: () => {
        ref?.current?.reset();
      },
    },
    { label: '导出数据', icon: 'DeleteOutlined', type: 'button', buttonType: 'success' },
  ]);
  const [footerActions] = React.useState<any[]>([
    { label: '批量设置时间', icon: 'PlusOutlined', type: 'button', buttonType: 'primary' },
    { label: '批量删除', icon: 'DeleteOutlined', type: 'button', danger: true },
    { label: '批量导出', icon: 'ToTopOutlined', type: 'button', buttonType: 'primary' },
  ]);
  const [filters] = React.useState<any[]>([]);
  const [columns] = React.useState<any[]>([
    { label: '序号', name: 'index', type: 'indexBorder' },
    { label: 'ID', name: 'id', align: 'center' },
    { label: '标题', name: 'title', copy: true },
    { label: '图片', name: 'image', align: 'center', type: 'image' },
    {
      label: '状态',
      name: 'status',
      type: 'switch',
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Error',
        },
        1: {
          text: '开启',
          status: 'Success',
        },
      },
    },
    { label: '进度', name: 'progress', type: 'digit' },
    { label: '创建时间', align: 'center', name: 'createdAt' },
    {
      label: '操作',
      align: 'center',
      type: 'option',
      showLength: 3,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      handle: (text: ReactNode, record: any, index: number): ReactNode | any[] => [
        // <Button
        //   key={index}
        //   onClick={() => {
        //     message.info('点击自定义按钮' + record.key);
        //   }}
        // >
        //   自定义按钮
        // </Button>,
        // 快捷操作-查看
        {
          type: 'info',
          mode: 'page',
          text: '查看',
          url: `/base/base3?id=${record.key}`,
        },
        // 快捷操作-编辑
        {
          type: 'edit',
          text: '编辑',
          mode: 'page',
          url: `/base/base2?action=edit&id=${record.key}`,
        },
        // 快捷操作-删除
        'delete',
        {
          type: 'info',
          mode: 'drawer',
          text: '查看-侧栏',
          render: <div id={record.key} />,
        },
        {
          type: 'info',
          mode: 'modal',
          text: '查看-弹窗',
          render: <div id={record.key} />,
        },
        {
          type: 'edit',
          mode: 'drawer',
          text: '编辑-侧栏',
          render: <div id={record.key} />,
        },
        {
          type: 'edit',
          mode: 'drawer',
          text: '编辑-侧栏-底部',
          onClick: () => {
            const targetId = 'abc';
            page.showDrawer(<BaseEdit mode={'modal'} action={'edit'} submitTarget={targetId} />, {
              title: '侧栏编辑',
              footer: <div id={targetId} />,
            });
          },
        },
        {
          type: 'edit',
          mode: 'modal',
          text: '编辑-弹窗',
          render: <div />,
        },
        {
          type: 'edit',
          mode: 'drawer',
          text: '编辑-侧栏-底部',
          onClick: () => {
            const targetId = 'abc1';
            page.showModal(<BaseEdit mode={'modal'} action={'edit'} submitTarget={targetId} />, {
              title: '侧栏编辑',
              footer: <div id={targetId} />,
            });
          },
        },
      ],
    },
  ]);

  // 表单提交
  const request = async (params: any, sort: any, filter: any) => {
    console.log('Page request:', params, sort, filter);
    return { data: datas };
  };

  return (
    <BaseList
      ref={ref}
      mode={props.mode}
      table={table}
      filters={filters}
      actions={actions}
      footerActions={footerActions}
      columns={columns}
      datas={datas}
      params={{}}
      request={request}
    />
  );
};

export default Page;
