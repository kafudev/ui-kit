import React from 'react';
import ProField, { ProFieldPropsType } from '@ant-design/pro-field/es/index';
import { RenderItemProps } from '../RenderItem';

export interface ItemImageProps extends RenderItemProps {}
const ItemImage = (props: ItemImageProps) => {
  return <ProField mode={props?.mode} valueType="image" />;
};

export default ItemImage;
