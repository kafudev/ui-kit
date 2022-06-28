import React, { PropsWithChildren, PropsWithoutRef, useImperativeHandle } from 'react';
import { Row, Col, Space } from 'antd';
import FormBody from '../../form/FormBody';
import type { ProFormInstance, ProFormProps } from '@ant-design/pro-form';
import { FooterToolbar } from '@ant-design/pro-layout';
import ProForm from '@ant-design/pro-form';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ReactDOM from 'react-dom';

export interface BaseFormProps extends ProFormProps, PropsWithoutRef<any> {
  layout?: 'horizontal' | 'vertical' | 'inline'; // 表单布局
  items: { [key: string]: any }[]; // 表格列配置
  values: { [key: string]: any }; // 数据值
  // width?: string | number; // 表格宽度
  rowCol?: number; // 行列数 默认为1
  setFooter?: boolean; // 是否将提交按钮挂载到目标，可在弹窗和侧栏使用
  submitTargetId?: Element | string; // 提交按钮挂载目标，可在弹窗和侧栏使用
  globalFixedSubmit?: boolean; // 全局固定提交按钮组
  onValuesChange?: (changedValues: any, value: any) => void; // 表单项数据变化
  onSubmit?: (formData: Record<string, any>) => Promise<boolean | void>; // 提交表单
  onReset?: () => void; // 重置表单
}
const LogTag = 'BaseForm';
type LayoutType = Parameters<typeof ProForm>[0]['layout'];
const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

// 格式化表单数据
const formatValues = (_items: any[], _forms: any) => {
  for (let index = 0; index < (_items?.length || 0); index++) {
    const _item = _items[index];
    _items[index].dataIndex = _item?.dataIndex || _item?.name || _item?.key;
    _items[index].valueType = _item?.valueType || _item?.type;
    switch (_items[index].valueType) {
      // 表单-对象
      case 'form':
      case 'object':
        // !转换成数组
        if (_forms?.[_item.name]) {
          if (!_forms[_item.name]?.[0]) {
            _forms[_item.name] = [_forms[_item.name]];
          }
        }
        break;
      // 列表-数组
      case 'list':
      case 'array':
        const nnValue = [];
        for (let ii = 0; ii < _item.items?.length; ii++) {
          let _xx = formatValues(_item.items[ii], _forms[_item.name][ii]);
          if (_xx !== undefined && _xx !== null) {
            nnValue.push(_xx);
          }
        }
        _forms[_item.name] = nnValue;
        break;
      default:
        break;
    }
  }
  return _forms;
};

// 反格式化表单数据
const backFormatValues = (_items: any[], _forms: any) => {
  for (let index = 0; index < (_items?.length || 0); index++) {
    const _item = _items[index];
    _items[index].dataIndex = _item?.dataIndex || _item?.name || _item?.key;
    _items[index].valueType = _item?.valueType || _item?.type;
    switch (_items[index].valueType) {
      // 表单-对象
      case 'form':
      case 'object':
        // !转换成数组
        if (_forms?.[_item.name]) {
          _forms[_item.name] = _forms[_item.name]?.[0];
        }
        break;
      // 列表-数组
      case 'list':
      case 'array':
        const nnValue = [];
        for (let ii = 0; ii < _item.items?.length; ii++) {
          let _xx = formatValues(_item.items[ii], _forms[_item.name][ii]);
          if (_xx !== undefined && _xx !== null) {
            nnValue.push(_xx);
          }
        }
        _forms[_item.name] = nnValue;
        break;
      default:
        break;
    }
  }
  return _forms;
};

const BaseForm: React.FC<BaseFormProps> = React.forwardRef((props, ref) => {
  const {
    rowCol,
    labelCol,
    setFooter,
    submitTargetId,
    globalFixedSubmit,
    layout,
    onValuesChange,
    onSubmit,
    onReset,
    ...restProps
  } = props;
  const [items, setItems] = React.useState(props.items);
  const [values, setValues] = React.useState(formatValues(props.items, props?.values));

  // 绑定一个 ProFormInstance 实例
  const formRef = React.useRef<ProFormInstance<any>>();

  useImperativeHandle(ref, () => ({
    formRef: formRef,
    ...formRef.current,
  }));

  // 属性值变化数据
  React.useEffect(() => {
    console.log(LogTag, 'propsChange items', props.items);
    if (props.items) {
      setItems(props.items);
    }
  }, [props.items]);

  React.useEffect(() => {
    if (props.values) {
      // 格式化数据
      const newForms = formatValues(items, props.values);
      setValues(newForms);
      formRef?.current?.setFieldsValue(newForms);
      console.log(LogTag, 'formatValues Forms', props.values, newForms);
    }
  }, [props.values]);

  return (
    <ProForm
      formRef={formRef}
      labelCol={props?.labelCol || { span: props.layout === 'vertical' ? 22 : 6 }}
      wrapperCol={props?.wrapperCol || { span: props.layout === 'vertical' ? 22 : 16 }}
      initialValues={{
        ...values,
      }}
      onInit={(form: any) => {
        console.log(LogTag, 'onInit', form);
      }}
      request={async (params: any) => {
        // 刷新初始化数据
        console.log(LogTag, 'request', params);
        if (props?.request) {
          // 请求远程下拉数据
          const forms = await props.request(params, props);
          const newForms = formatValues(items, forms);
          setValues(newForms);
          return newForms;
        }
        return await values;
      }}
      {...restProps}
      layout={props?.layout}
      submitter={{
        render: (_props: any, doms: any[]) => {
          let _doms =
            layout === LAYOUT_TYPE_HORIZONTAL ? (
              <Row>
                <Col offset={(labelCol as number) || 6 / (rowCol || 1)}>
                  <Space>{doms}</Space>
                </Col>
              </Row>
            ) : (
              [...doms]
            );
          if (submitTargetId) {
            // 如果有父组件需要展示，则推到目标展示
            // 无须添加外围宽度
            _doms = [...doms];
            // 目标渲染 动态位置
            const xx = ReactDOM.createPortal(_doms, document.body);
            if (typeof submitTargetId === 'string') {
              let xid = document.getElementById(submitTargetId);
              if (xid) {
                // @ts-ignore
                ReactDOM.render(<>{xx.children}</>, document.getElementById(submitTargetId));
              }
            } else {
              // @ts-ignore
              ReactDOM.render(<>{xx.children}</>, submitTargetId);
            }
            _doms = [];
          } else if (globalFixedSubmit === true) {
            // 全局底部固定显示
            _doms = <FooterToolbar>{_doms}</FooterToolbar>;
          }
          return _doms;
        },
        ...props?.submitter,
      }}
      onFinish={async (values: any) => {
        // 验证数据后返回
        const val = await formRef.current?.validateFieldsReturnFormatValue?.();
        // console.log(LogTag, 'onFinish', values, val);
        if (props.onFinish) {
          // 反格式化数据
          const newForms = backFormatValues(items, val);
          await props.onFinish(newForms);
        } else if (props.onSubmit) {
          // 反格式化数据
          const newForms = backFormatValues(items, val);
          await props.onSubmit(newForms);
        }
      }}
      onValuesChange={async (changedValues: any, values: any) => {
        console.log(LogTag, 'onValuesChange', changedValues, values);
        if (props.onValuesChange) {
          props.onValuesChange(changedValues, values);
          return;
        }
      }}
    >
      <FormBody rowCol={props.rowCol} items={items} values={values} />
    </ProForm>
  );
});

export default BaseForm;
