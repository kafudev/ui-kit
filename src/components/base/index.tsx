import BasePage, { BasePageProps } from './BasePage';
import BaseEdit, { BaseEditProps } from './BaseEdit';
import BaseInfo, { BaseInfoProps } from './BaseInfo';
import BaseList, { BaseListProps } from './BaseList';
import BaseForm, { BaseFormProps } from './BaseForm';
import BaseIcon, { BaseIconProps } from './BaseIcon';
import BaseButton, { BaseButtonProps } from './BaseButton';
import BaseItem, { BaseItemProps, BaseFormItem, BaseInfoItem } from './BaseItem';

export type {
  BasePageProps,
  BaseEditProps,
  BaseInfoProps,
  BaseListProps,
  BaseFormProps,
  BaseItemProps,
  BaseIconProps,
  BaseIconProps as IconProps,
  BaseButtonProps,
  BaseButtonProps as ButtonProps,
};

export default {
  BasePage,
  BaseEdit,
  BaseInfo,
  BaseList,
  BaseForm,
  BaseIcon,
  Icon: BaseIcon,
  BaseButton,
  Button: BaseButton,
  BaseItem,
  BaseFormItem,
  BaseInfoItem,
};
