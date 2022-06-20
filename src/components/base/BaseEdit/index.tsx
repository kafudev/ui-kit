import type { PropsWithChildren, ReactNode } from 'react';
import React, { useImperativeHandle } from 'react';
import BasePage, { BasePageProps } from '../BasePage';
import BaseForm, { BaseFormProps } from '../BaseForm';
import { FormInstance, message } from 'antd';
// import styles from './index.less';

export interface BaseEditProps extends BaseFormProps {
  mode?: 'page' | 'drawer' | 'modal' | 'card'; // 呈现类型
  action: 'add' | 'edit' | 'view'; // 操作类型
  pageProps?: BasePageProps;
  layout?: 'horizontal' | 'vertical' | 'inline'; // 表单布局
  // initItems?: (value: any) => void; // 初始化表单项
  // initForms?: (value: any) => void; // 初始化表单数据
  onValuesChange?: (changedValues: any, value: any) => void; // 表单项数据变化
  onSubmit?: (formData: Record<string, any>) => Promise<boolean | void>; // 提交表单
  onCancel?: () => void; // 取消表单
  onReset?: () => void; // 重置表单
  renderHeader?: () => React.ReactNode; // 渲染头部
  renderFooter?: () => React.ReactNode; // 渲染底部
}
const LogTag = 'BaseEdit';
const BaseEdit: React.FC<BaseEditProps> = React.forwardRef((props, ref) => {
  const formRef = React.useRef<FormInstance>();
  const [layout, setLayout] = React.useState<'horizontal' | 'vertical' | 'inline'>(
    props.layout || 'horizontal',
  );
  const [items, setItems] = React.useState(props.items);
  const [forms, setForms] = React.useState(props.forms);

  useImperativeHandle(ref, () => ({
    ...formRef.current,
  }));

  // 初始化数据
  React.useEffect(() => {
    console.log(LogTag, 'initItems items', props.items);
    if (props.initItems) {
      props.initItems(props.items);
    } else {
      // todo默认字段数据处理
    }

    console.log(LogTag, 'initForms forms', props.forms);
    if (props.initForms) {
      props.initForms(props.forms);
    } else {
      // todo默认表单数据处理
    }
  }, []);

  // 属性值变化数据
  React.useEffect(() => {
    console.log(LogTag, 'propsChange items', props.items);
    if (props.items) {
      setItems(props.items);
    }
  }, [props.items]);

  React.useEffect(() => {
    console.log(LogTag, 'propsChange forms', props.forms);
    if (props.forms) {
      setForms(props.forms);
    }
  }, [props.forms]);

  // // 字段数据变化
  // React.useEffect(() => {
  //   console.log(LogTag, 'changeItems items', items);
  //   // todo默认字段数据处理

  //   if (props.changeItems) {
  //     props.changeItems(items);
  //   }
  // }, [items]);

  // // 表单数据变化
  // React.useEffect(() => {
  //   console.log(LogTag, 'onValuesChange forms', forms);
  //   // todo默认数据数据处理

  //   if (props.onValuesChange) {
  //     props.onValuesChange(forms);
  //   }
  // }, [forms]);

  // 表单提交
  const onSubmit = async (values: any) => {
    console.log(LogTag, 'onSubmit:', values);
    if (props.onSubmit) {
      props.onSubmit(forms);
    } else {
      // todo通用提交方法
      message.success('提交成功');
    }
  };

  // 表单数据变化
  const onValuesChange = (changedValues: any, values: any) => {
    if (changedValues) {
      console.log(LogTag, 'onValuesChange:', changedValues, values);
      if (props.onValuesChange) {
        props.onValuesChange(changedValues, values);
      }
    }
  };

  // 渲染表单
  const renderForm = () => {
    return (
      <BaseForm
        ref={formRef}
        onSubmit={onSubmit}
        onValuesChange={onValuesChange}
        {...props}
        layout={layout}
      />
    );
  };

  return (
    <BasePage mode={props.mode} {...props?.pageProps}>
      <>
        {props.renderHeader && props.renderHeader()}
        {renderForm()}
        {props.children}
        {props.renderFooter && props.renderFooter()}
      </>
    </BasePage>
  );
});

export default BaseEdit;
