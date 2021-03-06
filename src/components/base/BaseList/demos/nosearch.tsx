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
      label: '????????????',
      icon: 'PlusOutlined',
      type: 'button',
      auth1: '/admin/advert/add',
      onClick: () => {
        console.log('??????????????????-????????????');
      },
    },
    {
      label: '????????????',
      // icon: 'RefreshOutlined',
      type: 'button',
      buttonType: 'success',
      onClick: () => {
        ref?.current?.reload();
      },
    },
    {
      label: '????????????',
      // icon: 'RefreshOutlined',
      type: 'button',
      buttonType: 'success',
      onClick: () => {
        ref?.current?.reset();
      },
    },
    { label: '????????????', icon: 'DeleteOutlined', type: 'button', buttonType: 'success' },
  ]);
  const [footerActions] = React.useState<any[]>([
    { label: '??????????????????', icon: 'PlusOutlined', type: 'button', buttonType: 'primary' },
    { label: '????????????', icon: 'DeleteOutlined', type: 'button', danger: true },
    { label: '????????????', icon: 'ToTopOutlined', type: 'button', buttonType: 'primary' },
  ]);
  const [filters] = React.useState<any[]>([]);
  const [columns] = React.useState<any[]>([
    { label: '??????', name: 'index', type: 'indexBorder' },
    { label: 'ID', name: 'id', align: 'center' },
    { label: '??????', name: 'title', copy: true },
    { label: '??????', name: 'image', align: 'center', type: 'image' },
    {
      label: '??????',
      name: 'status',
      type: 'switch',
      valueEnum: {
        0: {
          text: '??????',
          status: 'Error',
        },
        1: {
          text: '??????',
          status: 'Success',
        },
      },
    },
    { label: '??????', name: 'progress', type: 'digit' },
    { label: '????????????', align: 'center', name: 'createdAt' },
    {
      label: '??????',
      align: 'center',
      type: 'option',
      showLength: 3,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      handle: (text: ReactNode, record: any, index: number): ReactNode | any[] => [
        // <Button
        //   key={index}
        //   onClick={() => {
        //     message.info('?????????????????????' + record.key);
        //   }}
        // >
        //   ???????????????
        // </Button>,
        // ????????????-??????
        {
          type: 'info',
          mode: 'page',
          text: '??????',
          url: `/base/base3?id=${record.key}`,
        },
        // ????????????-??????
        {
          type: 'edit',
          text: '??????',
          mode: 'page',
          url: `/base/base2?action=edit&id=${record.key}`,
        },
        // ????????????-??????
        'delete',
        {
          type: 'info',
          mode: 'drawer',
          text: '??????-??????',
          render: <div id={record.key} />,
        },
        {
          type: 'info',
          mode: 'modal',
          text: '??????-??????',
          render: <div id={record.key} />,
        },
        {
          type: 'edit',
          mode: 'drawer',
          text: '??????-??????',
          render: <div id={record.key} />,
        },
        {
          type: 'edit',
          mode: 'drawer',
          text: '??????-??????-??????',
          onClick: () => {
            const targetId = 'abc';
            page.showDrawer(<BaseEdit mode={'modal'} action={'edit'} submitTarget={targetId} />, {
              title: '????????????',
              footer: <div id={targetId} />,
            });
          },
        },
        {
          type: 'edit',
          mode: 'modal',
          text: '??????-??????',
          render: <div />,
        },
        {
          type: 'edit',
          mode: 'drawer',
          text: '??????-??????-??????',
          onClick: () => {
            const targetId = 'abc1';
            page.showModal(<BaseEdit mode={'modal'} action={'edit'} submitTarget={targetId} />, {
              title: '????????????',
              footer: <div id={targetId} />,
            });
          },
        },
      ],
    },
  ]);

  // ????????????
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
