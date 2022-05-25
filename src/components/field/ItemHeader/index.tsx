import React, { PropsWithChildren, ReactNode } from 'react';
import * as icons from '@ant-design/icons';
import { ProFieldProps } from '@ant-design/pro-utils/lib/typing';
import { ProFieldPropsType } from '@ant-design/pro-field/lib/index';

export interface ItemHeaderProps extends PropsWithChildren<{}>, ProFieldPropsType {
  label?: ReactNode | string;
  desc?: string;
  borderColor?: string;
  marginBottom?: string;
}
const ItemHeader = (props: ItemHeaderProps) => {
  return (
    <div
      style={{
        borderLeft: '3px',
        borderLeftStyle: 'solid',
        borderLeftColor: props.borderColor || '#bbb',
        overflow: 'hidden',
        marginBottom: props.marginBottom || '2px',
        marginTop: props.marginTop || '10px',
      }}
    >
      <div
        style={{
          marginLeft: '10px',
          fontWeight: 'bold',
          color: 'rgb(70, 76, 91)',
          float: 'left',
          fontSize: '14px',
        }}
      >
        {props.label}
      </div>
      <div
        style={{
          marginLeft: '10px',
          fontWeight: 'normal',
          color: 'rgb(101, 113, 128)',
          float: 'left',
          fontSize: '12px',
          marginTop: '2px',
        }}
      >
        {props.desc}
      </div>
    </div>
  );
};

export default ItemHeader;
