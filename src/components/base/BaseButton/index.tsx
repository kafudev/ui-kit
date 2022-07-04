import React, { ReactNode } from 'react';
import { Button, ButtonProps } from 'antd';

// @ts-ignore
export interface BaseButtonProps extends ButtonProps {
  type:
    | 'primary'
    | 'ghost'
    | 'dashed'
    | 'link'
    | 'text'
    | 'default'
    | 'warning'
    | 'success'
    | 'info'
    | 'error'
    | 'default'
    | undefined;
  title?: string | ReactNode;
  backgroundColor?: string;
  background?: string;
  color?: string;
  borderColor?: string;
}
const BaseButton = (props: BaseButtonProps) => {
  const { type, backgroundColor, color, borderColor, ...restProps } = props;

  // 判断类型样式
  let _type: string | undefined = undefined;
  let _backgroundColor = '';
  let _color = '';
  let _borderColor = '';
  switch (type) {
    case 'info':
      _backgroundColor = '#2db7f5';
      _color = '#fff';
      _borderColor = '#2db7f5';
      if (restProps?.ghost) {
        _backgroundColor = '#fff0';
        _color = '#2db7f5';
        _borderColor = '#2db7f5';
      }
      if (restProps?.disabled) {
        _backgroundColor = '';
        _color = '';
        _borderColor = '';
      }
      break;
    case 'success':
      _backgroundColor = '#52c41a';
      _color = '#fff';
      _borderColor = '#52c41a';
      if (restProps?.ghost) {
        _backgroundColor = '#fff0';
        _color = '#52c41a';
        _borderColor = '#52c41a';
      }
      if (restProps?.disabled) {
        _backgroundColor = '';
        _color = '';
        _borderColor = '';
      }
      break;
    case 'warning':
      _backgroundColor = '#faad14';
      _color = '#fff';
      _borderColor = '#faad14';
      if (restProps?.ghost) {
        _backgroundColor = '#fff0';
        _color = '#faad14';
        _borderColor = '#faad14';
      }
      if (restProps?.disabled) {
        _backgroundColor = '';
        _color = '';
        _borderColor = '';
      }
      break;
    case 'error':
      _backgroundColor = '#f5222d';
      _color = '#fff';
      _borderColor = '#f5222d';
      if (restProps?.ghost) {
        _backgroundColor = '#fff0';
        _color = '#f5222d';
        _borderColor = '#f5222d';
      }
      if (restProps?.disabled) {
        _backgroundColor = '';
        _color = '';
        _borderColor = '';
      }
      break;
    default:
      _type = type;
      break;
  }
  if (backgroundColor) {
    _backgroundColor = backgroundColor;
  }
  if (color) {
    _color = color;
  }
  if (borderColor) {
    _borderColor = borderColor;
  }

  let style = {
    ...(_backgroundColor ? { backgroundColor: _backgroundColor } : {}),
    ...(_color ? { color: _color } : {}),
    ...(_borderColor ? { borderColor: _borderColor } : {}),
    ...(restProps?.style || {}),
  };

  const children = props?.children || props?.title || '';

  // @ts-ignore
  return React.createElement(Button, { ...restProps, type: _type, style }, children);
};

export default BaseButton;
