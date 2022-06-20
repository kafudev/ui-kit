---
title: BaseForm - 基础表单
order: 5
group:
  title: 基础组件
  path: /
nav:
  title: 组件
  path: /components
  order: 2
---

# BaseForm - 基础表单

BaseForm 是为了直接通过表单项渲染表单，可以在页面、侧栏、弹窗等场景中直接展示表单，包含很多预设的输入组件。

BaseForm 封装了 antd pro 的 ProForm 和 Form 组件。 BasePage 支持 ProForm 和 Form 的所有属性。

## 代码演示

### 基本使用

<code src="./demos/base.tsx" iframe="600px" title="基本使用" desc="基本使用" />

## API

### 属性定义

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| formRef | 表单引用 | `ref` | - |
| layout | 表单布局 | `'horizontal'` \| `'vertical'` | `'horizontal'` |
| rowCol | 行列数，默认呈现一行一列 | `number` | 1 |
| items | 表单项配置，查看[item 定义](#item-表单项定义)， | `{[key:string]: any}[]` | - |
| values | 表单数据值，键值对对象类型 | `object` | - |
| submitTargetId | 提交按钮组挂载目标,可挂载组件节点或者 Id | `Element \| string` | - |
| globalFixedSubmit | 全局固定提交按钮组 | `{[key:string]: any}[]` | - |
| onValuesChange | 表单数据变化方法 | `(changedValues: any, value: any) => void ` | - |
| onSubmit | 提交表单方法 | `(value: any) => void ` | - |
| onReset | 重置表单方法 | `() => void ` | - |
| onCancel | 取消表单方法 | `() => void ` | - |
| ... | 继承 ProForm 的表单属性,详细可以看[这里](https://procomponents.ant.design/components/form#proform) | `` | - |

### item 表单项定义

> 继承 Form 的表单项定义，详细可以看[这里](https://ant.design/components/form-cn/#Form.Item)。

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签名称 | `string` | - |
| tooltip | 会在 label 之后展示一个 icon，hover 之后提示一些信息 | `string` | - |
| name | 表单对应的字段名 | `string` | - |
| placeholder | 表单输入框内的默认提示语 | `string` | - |
| type | 表单输入组件的类型,会生成不同的渲染器，跟 ProForm 的[`valueType`](https://procomponents.ant.design/components/schema#valuetype)是同定义 | `string` | - |
| fieldProps | 输入组件的属性，可以通过该配置透传 | `object` | - |
| rules | 校验规则, 可参照校验方法[验证规则](https://ant.design/components/form-cn/#Rule) | `any[]` | - |
| disabled | 表单项设置中`disabled`的状态 | `boolean` \| `{ checkbox: boolean; }` | - |
| options | 表单项组件的选项, 枚举的简化 | `any[]` | - |
| valueEnum | 表单项组件的枚举，会自动转化把值当成 key 来取出要显示的内容 | [valueEnum](https://procomponents.ant.design/components/schema#valueenum) | - |
| request | 从服务器请求枚举 | [request](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params) | - |
| ... | 继承 Form 的表单项定义,详细可以看[这里](https://ant.design/components/form-cn/#Form.Item) | `` | - |

> 部分 Form 的表单项定义无效
