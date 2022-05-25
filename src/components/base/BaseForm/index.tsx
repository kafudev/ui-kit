import React, { PropsWithChildren, PropsWithoutRef, useImperativeHandle } from 'react';
import { Row, Col } from 'antd';
import FormBody from '../../form/FormBody';
import type { ProFormInstance, ProFormProps } from '@ant-design/pro-form';
import { FooterToolbar } from '@ant-design/pro-layout';
import ProForm from '@ant-design/pro-form';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ReactDOM from 'react-dom';

export interface BaseFormProps extends ProFormProps, PropsWithoutRef<any> {
  layout: 'horizontal' | 'vertical' | 'inline'; // 表单布局
  items: { [key: string]: any }[]; // 表格列配置
  forms: { [key: string]: any }; // 表单数据
  width?: string | number; // 表格宽度
  rowCol?: number; // 行列数 默认为1
  globalFixedSubmit?: boolean; // 全局固定提交按钮组
  submitTargetId?: Element | string; // 提交按钮挂载目标
  changeForms?: (changedValues: any, value: any) => void; // 表单数据变化
  onSubmit?: (formData: Record<string, any>) => Promise<boolean | void>; // 提交表单
  onCancel?: () => void; // 取消表单
  onReset?: () => void; // 重置表单
}
const LogTag = 'BaseForm';

// 格式化表单数据
const formatValues = (_items: any[], _forms: any) => {
  for (let index = 0; index < (_items.length || 0); index++) {
    const _item = _items[index];
    _items[index].dataIndex = _item?.name || _item?.dataIndex || _item?.key;
    _items[index].valueType = _item?.type || _item?.valueType;
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
  for (let index = 0; index < (_items.length || 0); index++) {
    const _item = _items[index];
    _items[index].dataIndex = _item?.name || _item?.dataIndex || _item?.key;
    _items[index].valueType = _item?.type || _item?.valueType;
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
  const [forms, setForms] = React.useState(formatValues(props.items, props.forms));

  // 绑定一个 ProFormInstance 实例
  const formRef = React.useRef<ProFormInstance<any>>();

  useImperativeHandle(ref, () => ({
    ...formRef.current,
  }));

  React.useEffect(() => {
    if (props.forms) {
      // 格式化数据
      const newForms = formatValues(props.items, props.forms);
      setForms(newForms);
      formRef?.current?.setFieldsValue(newForms);
      console.log(LogTag, 'formatValues Forms', props.forms, newForms);
    }
  }, [props.forms]);

  return (
    <ProForm
      formRef={formRef}
      labelCol={props?.labelCol || { span: props.layout === 'vertical'?24: 4 }}
      wrapperCol={props?.wrapperCol || { span: props.layout === 'vertical'?24: 16 }}
      initialValues={{
        ...forms,
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
          return forms;
        }
        return await forms;
      }}
      {...props}
      submitter={{
        render: (_: any, dom: any[]) => {
          if (props?.submitTargetId) {
            // 如果有父组件需要展示，则推到目标展示
            // 反转显示，否则会错位
            const _dom = [...dom.reverse()];
            const _ll = _dom?.map((dd: any) => {
              return dd;
            });
            const _nodes = (
              <Row justify={'end'}>
                {_ll?.map((dd: any, index: number) => {
                  return (
                    <Col style={{ marginRight: '8px' }} key={index}>
                      {dd}
                    </Col>
                  );
                })}
              </Row>
            );
            // 目标渲染
            if (props.submitTargetId) {
              // 动态位置
              const xx = ReactDOM.createPortal(_nodes, document.body);
              if (typeof props.submitTargetId === 'string') {
                ReactDOM.render(<>{xx.children}</>, document.getElementById(props.submitTargetId));
              } else {
                ReactDOM.render(<>{xx.children}</>, props.submitTargetId);
              }
            }

            return [];
          } else if (props?.globalFixedSubmit === true) {
            // 全局底部固定显示
            // 反转显示，否则会错位
            return <FooterToolbar>{[...dom.reverse()]}</FooterToolbar>;
          } else {
            // 反转显示，否则会错位
            return [...dom.reverse()];
          }
        },
      }}
      onFinish={async (values: any) => {
        // 验证数据后返回
        const val = await formRef.current?.validateFieldsReturnFormatValue?.();
        // console.log(LogTag, 'onFinish', values, val);
        if (props.onFinish) {
          // 反格式化数据
          const newForms = backFormatValues(props.items, val);
          await props.onFinish(newForms);
        } else if (props.onSubmit) {
          // 反格式化数据
          const newForms = backFormatValues(props.items, val);
          await props.onSubmit(newForms);
        }
      }}
      onValuesChange={async (changedValues: any, values: any) => {
        // console.log(LogTag, 'onValuesChange', changedValues, values);
        if (props?.onValuesChange) {
          await props.onValuesChange(changedValues, values);
        } else if (props?.changeForms) {
          await props.changeForms(changedValues, values);
        }
      }}
    >
      <FormBody rowCol={props.rowCol} items={props.items} forms={props.forms} />
    </ProForm>
  );
});

export default BaseForm;
