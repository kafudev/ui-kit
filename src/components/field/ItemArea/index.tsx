import React, { useState } from 'react';
import ProField, { ProFieldPropsType } from '@ant-design/pro-field/es/index';
import { RenderItemProps } from '../RenderItem';
import { ProFieldFCRenderProps } from '@ant-design/pro-utils';
import { Cascader } from 'antd';
import './index.less';
// 省市区数据工具
// https://xiangyuecn.gitee.io/areacity-jsspider-statsgov/

export interface ItemAreaProps extends RenderItemProps {
  areaType: 'pca' | 'pcas';
  onChange?: (value: any, info: any) => void;
}
const LogTag = 'ItemArea';
const ItemArea = (props: ItemAreaProps) => {
  const [sourceData, setSourceData] = useState<any[]>([]);

  React.useEffect(() => {
    // 返回源数据
    if (props.areaType == 'pca' || !props.areaType) {
      const _sourceData = require('./data/pca.json');
      setSourceData(_sourceData);
    } else if (props.areaType == 'pcas') {
      const _sourceData = require('./data/pcas.json');
      setSourceData(_sourceData);
    }
  }, []);

  React.useEffect(() => {
    // 返回源数据
    if (props.areaType == 'pca' || !props.areaType) {
      const _sourceData = require('./data/pca.json');
      setSourceData(_sourceData);
    } else if (props.areaType == 'pcas') {
      const _sourceData = require('./data/pcas.json');
      setSourceData(_sourceData);
    }
  }, [props?.areaType]);

  const renderFormItem = (_text: any, _props: ProFieldFCRenderProps, _dom: JSX.Element) => {
    console.log(LogTag, ' renderFormItem', _text, _props);
    return (
      <Cascader
        defaultValue={props.text}
        {...props?.fieldProps}
        style={{ width: 'auto', ...props?.style, ...props?.fieldProps?.style }}
        options={sourceData}
        onChange={props.onChange}
        fieldNames={{ label: 'n', value: 'v', children: 'c' }}
      />
    );
  };
  const render = (_text: any, _props: ProFieldFCRenderProps) => {
    console.log(LogTag, ' render', _text, _props);
    return (
      <Cascader
        {...props?.fieldProps}
        defaultValue={_text}
        value={_text}
        disabled
        readOnly
        className="ItemAreaCasecader"
        style={{ width: 'auto', ...props?.style, ...props?.fieldProps?.style }}
        options={sourceData}
        suffixIcon={null}
        fieldNames={{ label: 'n', value: 'v', children: 'c' }}
      ></Cascader>
    );
  };

  return (
    <ProField
      {...props}
      mode={props?.mode}
      renderFormItem={renderFormItem}
      render={render}
      text={props.text}
    />
  );
};
export default ItemArea;
