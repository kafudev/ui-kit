---
title: BaseItem - 基础单项
order: 8
group:
  title: 基础单项
  path: /
nav:
  title: 组件
  path: /components
  order: 2
---

# BaseItem - 基础单项

BaseItem 是为了可直接在表单、详情、表格中渲染单项的输入和显示组件，通用的 ProField 渲染组件。

## 代码演示

### 基本使用

<code src="./demos/base.tsx" iframe="200px" title="基本使用" desc="基本使用" />

### 表单使用

<code src="./demos/form.tsx" iframe="200px" title="表单使用" desc="BaseFormItem在表单中使用, 包含标签名称label " />

### 详情使用

<code src="./demos/info.tsx" iframe="200px" title="详情使用" desc="BaseInfoItem在详情中使用, 包含标签名称label " />

## API

### BaseItem

> BaseItem 仅渲染输入组件，继承 ProField 的定义，详细可以看[这里](https://procomponents.ant.design/components/field)。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 渲染类型，read=仅显示，edit=可编辑 | `read \| edit` | `'edit'` |
| label | 标签名称 | `string \| ReactNode` | - |
| type | 表单输入组件的类型,会生成不同的渲染器，跟 ProForm 的[`valueType`](https://procomponents.ant.design/components/schema#valuetype)是同定义 | `string` | - |
| fieldProps | 输入组件的属性，可以通过该配置透传 | `object` | - |
| ... | 继承 ProField 的定义,详细可以看[这里](https://procomponents.ant.design/components/field) | `` | - |

### BaseFormItem

> 应用于表单的渲染输入组件，带标签名称和输入组件。

### BaseInfoItem

> 应用于详情的渲染显示组件，带标签名称和显示组件。
