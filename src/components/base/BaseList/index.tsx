import Icon, { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { Button, Col, Dropdown, FormInstance, Menu, message, Popconfirm, Row } from 'antd';
import type { SortOrder } from 'antd/lib/table/interface';
import React, { PropsWithChildren, ReactNode, useImperativeHandle } from 'react';
// @ts-ignore
import { history } from 'umi';
import page from '../../../utils/page';
import BaseIcon from '../BaseIcon';
import BasePage, { BasePageProps } from '../BasePage';

export interface BaseListProps extends PropsWithChildren<any> {
  mode?: 'page' | 'drawer' | 'modal'; // 呈现类型
  table: {
    mname?: string;
    key?: string;
    url?: any;
    output?: boolean;
  };
  pageProps?: BasePageProps;
  pagination?: Record<string, any>;
  options?: Record<string, any>;
  columns: any[]; // 列配置
  filters?: any[]; // 筛选配置
  datas?: any[]; // 表单数据
  actions?: any[]; // 操作按钮数据
  actionsPosition?: 'left' | 'right'; // 操作按钮位置
  footerActions?: any[]; // 底部操作按钮数据
  initColumns?: (value: any) => void; // 初始化列数据
  initFilters?: (value: any) => void; // 初始化筛选数据
  initDatas?: (value: any) => void; // 初始化数据
  request?: (
    params: {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[] | null>,
  ) => Promise<any>; // 请求数据
  renderTableTitle?: () => React.ReactNode; // 渲染表格标题
  renderTableTool?: () => React.ReactNode; // 渲染表格右边工具
  renderTableFilter?: () => React.ReactNode; // 渲染表格筛选块
  renderTableHeader?: () => React.ReactNode; // 渲染表格头部
  renderTableFooter?: () => React.ReactNode; // 渲染表格底部
  renderTableActions?: () => React.ReactNode; // 渲染表格头部操作区
  renderTableFooterActions?: () => React.ReactNode; // 渲染表格底部操作区
}
const LogTag = 'BaseList';
// 格式化列数据
const formatColumns = (_columns: any[]) => {
  for (let index = 0; index < (_columns.length || 0); index++) {
    const _column = _columns[index];
    _columns[index].dataIndex = _column?.name || _column?.dataIndex || _column?.key;
    _columns[index].copyable = _column?.copy || _column?.copyable;
    _columns[index].valueType = _column?.type || _column?.valueType;
    _columns[index].hideInSearch = true; // 在表单中隐藏
    _columns[index].hideInForm = true; // 在表单中隐藏
    switch (_columns[index].valueType) {
      // 操作处理
      case 'handle':
      case 'option':
        if (_column?.handle) {
          // 分类
          const _c_handle = (text: ReactNode, record: any, ii: number) => {
            const _rr: any[] = _column?.handle(text, record, ii) || [];
            let _handle = _rr?.map((_r: any, kk: number) => {
              let _type = '';
              let __r = _r;
              if (_r && typeof _r === 'object') {
                // 如果是对象，则认为是操作配置
                _type = _r?.type;
              }
              if (_r && typeof _r === 'string') {
                // 如果是字符串，则认为是简洁操作配置
                _type = _r;
                // 拼接对象
                __r = {
                  type: _type,
                };
              }
              switch (_type) {
                case 'info':
                  return (
                    <a
                      key={`${ii}${kk}`}
                      type="link"
                      onClick={() => {
                        if (__r?.onClick) {
                          return __r?.onClick();
                        }
                        switch (__r?.mode) {
                          case 'page':
                            history?.push(__r?.url);
                            break;
                          case 'drawer':
                            page.showDrawer(__r?.render, {
                              title: '详情内容',
                              ...(__r.drawerConfig || {}),
                            });
                            break;
                          case 'modal':
                            page.showModal(__r?.render, {
                              title: '详情内容',
                              ...(__r.modalConfig || {}),
                            });
                            break;
                          default:
                            break;
                        }
                      }}
                    >
                      {__r?.text || '查看'}
                    </a>
                  );
                  break;
                case 'edit':
                  return (
                    <a
                      key={`${ii}${kk}`}
                      type="link"
                      onClick={() => {
                        if (__r?.onClick) {
                          return __r?.onClick();
                        }
                        switch (__r?.mode) {
                          case 'page':
                            history?.push(__r?.url);
                            break;
                          case 'drawer':
                            page.showDrawer(__r?.render, {
                              title: '编辑内容',
                              ...(__r.drawerConfig || {}),
                            });
                            break;
                          case 'modal':
                            page.showModal(__r?.render, {
                              title: '编辑内容',
                              ...(__r.modalConfig || {}),
                            });
                            break;
                          default:
                            break;
                        }
                      }}
                    >
                      {__r?.text || '编辑'}
                    </a>
                  );
                  break;
                case 'delete':
                  return (
                    <Popconfirm
                      key={`${ii}${kk}`}
                      title="确认要删除该数据吗？"
                      icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
                      onConfirm={() => {
                        if (__r?.onConfirm) {
                          return __r?.onConfirm();
                        }
                        // !删除请求
                        return new Promise((resolve) => {
                          setTimeout(() => resolve(1), 2000);
                          setTimeout(() => {
                            message.success('删除成功');
                          }, 2500);
                        });
                      }}
                    >
                      <a key={`${ii}${kk}`} type="link" style={{ color: __r?.color || '#ff4d4f' }}>
                        {__r?.text || '删除'}
                      </a>
                    </Popconfirm>
                  );
                  break;
                default:
                  break;
              }
              return _r;
            });
            // 超过数量显示省略号
            const maxLength = _column?.showLength == null || _column?.showLength == undefined || 3;
            if (_handle?.length > maxLength) {
              const _mains: any[] = [];
              const _menus: any[] | undefined = [];
              _handle?.map((_r: any, kk: number) => {
                if (kk >= maxLength) {
                  _menus.push({ name: _r, key: kk });
                } else {
                  _mains.push(_r);
                }
              });
              const _more = <TableDropdown key={ii} menus={_menus} />;
              _handle = [..._mains, _more];
            }
            return _handle;
          };

          const _c_render = _c_handle;
          _columns[index].render = _c_render;
        }
        break;
      default:
        break;
    }
  }
  console.log('formatColumns _columns', _columns);
  return _columns;
};

// 格式化筛选数据
const formatFilters = (_filters: any[]) => {
  for (let index = 0; index < (_filters?.length || 0); index++) {
    const _filter = _filters[index];
    _filters[index].title = _filter?.label || _filter?.title;
    _filters[index].dataIndex = _filter?.name || _filter?.dataIndex || _filter?.key;
    _filters[index].valueType = _filter?.type || _filter?.valueType;
    _filters[index].renderFormItem = (_filter?.renderFormItem && _filter?.renderFormItem()) || '';
    _filters[index].hideInTable = true; // 在表格中隐藏
  }
  console.log('formatColumns _filters', _filters);
  return _filters;
};

const BaseList: React.FC<BaseListProps> = React.forwardRef((props, ref) => {
  const actionRef = React.useRef<ActionType>();
  const formRef = React.useRef<FormInstance>();
  const [columns, setColumns] = React.useState(formatColumns(props.columns || []));
  const [filters, setFilters] = React.useState(formatFilters(props.filters || []));
  const [actions, setActions] = React.useState(props.actions);
  const [footerActions, setFooterActions] = React.useState(props.footerActions);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [datas, setDatas] = React.useState(props.datas);

  useImperativeHandle(ref, () => ({
    actionRef: actionRef,
    formRef: formRef,
    ...actionRef.current,
  }));

  // 初始化字段数据
  React.useEffect(() => {
    console.log(LogTag, 'initColumns columns', props.columns);
    if (props.initColumns) {
      props.initColumns(formatColumns(props.columns || []));
    } else {
      // todo默认字段数据处理
    }

    console.log(LogTag, 'initDatas datas', props.datas);
    if (props.initDatas) {
      props.initDatas(props.datas);
    } else {
      // todo默认表单数据处理
    }

    console.log(LogTag, 'initFilters filters', props.filters);
    if (props.initFilters) {
      props.initFilters(formatFilters(props.filters || []));
    } else {
      // todo默认筛选数据处理
    }
  }, []);

  // 属性值变化数据
  React.useEffect(() => {
    console.log(LogTag, 'propsChange columns', props.columns);
    if (props.columns) {
      setColumns(formatColumns(props.columns || []));
    }
  }, [props.columns]);

  React.useEffect(() => {
    console.log(LogTag, 'propsChange datas', props.datas);
    if (props.datas) {
      setDatas(props.datas);
    }
  }, [props.datas]);

  React.useEffect(() => {
    console.log(LogTag, 'propsChange filters', props.filters);
    if (props.filters) {
      setFilters(formatFilters(props.filters || []));
    }
  }, [props.filters]);

  React.useEffect(() => {
    console.log(LogTag, 'propsChange actions', props.actions);
    if (props.actions) {
      setActions(props.actions);
    }
  }, [props.actions]);

  React.useEffect(() => {
    console.log(LogTag, 'propsChange footerActions', props.footerActions);
    if (props.footerActions) {
      setFooterActions(props.footerActions);
    }
  }, [props.footerActions]);

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: `1st item`,
          onClick: () => {},
        },
        {
          key: '2',
          label: `2st item`,
          onClick: () => {},
        },
        {
          key: '31',
          label: `3st item`,
          onClick: () => {},
        },
      ]}
    />
  );

  // 渲染表格标渲染操作按钮组
  const _renderTableActions = (): ReactNode => {
    if (props.renderTableActions) {
      return props.renderTableActions();
    }
    // 操作按钮组合
    const _actions = actions?.map((action: any) => {
      // 自渲染
      if (action?.render && typeof action?.render === 'function') {
        return action.render();
      }
      // 图标
      let _icon = action.icon;
      if (_icon && typeof _icon === 'string') {
        _icon = <BaseIcon name={_icon} />;
      } else if (_icon && typeof _icon === 'function') {
        _icon = _icon();
      }
      switch (action.type) {
        case 'dropdown':
          return (
            <Dropdown key={action.key} overlay={menu}>
              <Button>
                <Icon type="down" />
              </Button>
            </Dropdown>
          );
          break;
        case 'menu':
          return menu;
          break;
        case 'link':
          return (
            <Button
              key={action.key}
              danger={action.danger}
              icon={_icon}
              type={action.buttonType || 'link'}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          );
          break;
        case 'button':
        default:
          return (
            <Button
              key={action.key}
              danger={action.danger}
              icon={_icon}
              type={action.buttonType || 'primary'}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          );
          break;
      }
    });
    return (
      <Row>
        {_actions?.map((action: any, index: number) => {
          return (
            <Col style={{ marginRight: '8px' }} key={index}>
              {action}
            </Col>
          );
        })}
      </Row>
    );
  };

  // 渲染表格底部操作按钮组
  const _renderTableFooterActions = (): ReactNode => {
    if (props.renderTableFooterActions) {
      return props.renderTableFooterActions();
    }
    // 操作按钮组合
    const _actions = footerActions?.map((action: any) => {
      // 自渲染
      if (action?.render && typeof action?.render === 'function') {
        return action.render();
      }
      // 图标
      let _icon = action.icon;
      if (_icon && typeof _icon === 'string') {
        _icon = <BaseIcon name={_icon} />;
      } else if (_icon && typeof _icon === 'function') {
        _icon = _icon();
      }
      switch (action.type) {
        case 'dropdown':
          return (
            <Dropdown key={action.key} overlay={menu}>
              <Button>
                <Icon type="down" />
              </Button>
            </Dropdown>
          );
          break;
        case 'menu':
          return menu;
          break;
        case 'link':
          return (
            <Button
              key={action.key}
              danger={action.danger}
              icon={_icon}
              type={action.buttonType || 'link'}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          );
          break;
        case 'button':
        default:
          return (
            <Button
              key={action.key}
              danger={action.danger}
              icon={_icon}
              type={action.buttonType || 'primary'}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          );
          break;
      }
    });
    return (
      <Row>
        {_actions?.map((action: any, index: number) => {
          return (
            <Col style={{ marginRight: '8px' }} key={index}>
              {action}
            </Col>
          );
        })}
      </Row>
    );
  };

  // 渲染数据
  const renderTables = () => {
    return (
      <>
        <ProTable
          {...props}
          // 合并列和筛选表单数据
          actionRef={actionRef}
          formRef={formRef}
          columns={[...columns, ...filters]}
          params={props?.params}
          cardBordered={props?.cardBordered}
          request={async (params = {}, sort, filter) => {
            console.log('BaseList request', params, sort, filter);
            if (props.request) {
              return props.request(params, sort, filter);
            }
            return {};
          }}
          editable={{
            type: 'multiple',
            ...props.editable,
          }}
          columnsState={{
            persistenceKey: props?.table?.mname + 'pro-table-singe-list',
            persistenceType: 'localStorage',
            onChange(value) {
              console.log('value: ', value);
            },
            ...props.columnsState,
          }}
          rowKey={props?.table?.key || props?.rowKey || 'id'}
          search={{
            // labelWidth: 'auto',
            ...props.search,
          }}
          form={{
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            syncToUrl: (values, type) => {
              if (type === 'get') {
                return {
                  ...values,
                  created_at: [values.startTime, values.endTime],
                };
              }
              return values;
            },
            ...props.form,
          }}
          pagination={{
            pageSize: 10,
            size: 'default',
            simple: false,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 100, 200, 1000, 2000],
            // eslint-disable-next-line @typescript-eslint/no-shadow
            onChange: (page) => console.log(page),
            ...props.pagination,
          }}
          dateFormatter={props?.dateFormatter || 'string'}
          headerTitle={
            props.renderTableTitle ? props.renderTableTitle() : <Row>{_renderTableActions()}</Row>
          }
          rowSelection={{
            onChange: (_, selectedRows) => {
              console.log('rowSelection', selectedRows);
            },
            ...props.rowSelection,
          }}
          footer={() => {
            if (props.footer) {
              return props.footer();
            }
            if (props.renderTableFooter) {
              return props.renderTableFooter();
            }
            return <Row>{_renderTableFooterActions()}</Row>;
          }}
          options={{
            fullScreen: true,
            reload: true,
            setting: true,
            density: true,
            ...props.options,
          }}
        />
      </>
    );
  };

  return (
    <BasePage mode={props.mode} {...props?.pageProps}>
      {props.renderTableHeader && props.renderTableHeader()}
      {renderTables()}
      {props.children}
      {props.renderTableFooter && props.renderTableFooter()}
    </BasePage>
  );
});

export default BaseList;
