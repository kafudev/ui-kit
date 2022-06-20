---
title: BaseInfo - 基础信息
order: 4
group:
  title: 基础组件
  path: /
nav:
  title: 组件
  path: /components
  order: 2
---

# BaseInfo - 基础信息

BaseInfo 是为了直接通过信息项渲染页面，包含很多预设的展示组件。

## 代码演示

### 基本使用

<code src="./demos/base.tsx" iframe="400px" title="基本使用" desc="基本使用" />

### 编辑使用

<code src="./demos/edit.tsx" iframe="400px" title="编辑使用" desc="编辑使用" />

## API

### 属性定义

> 继承 ProDescriptions 的数据展示定义，详细可以看[这里](https://procomponents.ant.design/components/descriptions#prodescriptions)。

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| mode | 呈现类型 | `'page'` \| `'drawer'` \| `'modal'` | `'page'` |
| pageProps | 页面配置，关联的 BasePage 的[配置](/components/base-page) | `object` | - |
| labelWidth | 标签宽度, 支持数值或者字符串 px | `string \| number` | `100px` |
| items | 详情字段配置，查看[item 定义](/components/base-info#item-表单项定义)， | `{[key:string]: any}[]` | - |
| values | 详情数据值，键值对对象类型 | `object` | - |
| renderHeader | 自定义头部 | `() => React.ReactNode ` | - |
| renderFooter | 自定义底部 | `() => React.ReactNode ` | - |
| ... | 继承 ProDescriptions 的数据展示定义，详细可以看[这里](https://procomponents.ant.design/components/descriptions#prodescriptions) | `` | - |

> 部分 ProDescriptions 的属性定义无效， title、columns 均无效

### item 项目定义

> 继承 ProDescriptions.Item 的项目定义，详细可以看[这里](https://procomponents.ant.design/components/descriptions#prodescriptionsitem)。

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签名称 | `string` | - |
| labelWidth | 标签宽度 | `string \| number` | `100px` |
| tooltip | 会在 label 之后展示一个 icon，hover 之后提示一些信息 | `string` | - |
| name | 项目对应的字段名, 跟 ProDescriptions.Item 的[`dataIndex`](https://procomponents.ant.design/components/descriptions#prodescriptionsitem)是同定义 | `string` | - |
| type | 项目输入组件的类型,会生成不同的渲染器，跟 ProDescriptions.Item 的[`valueType`](https://procomponents.ant.design/components/descriptions#prodescriptionsitem)是同定义 | `string` | - |
| options | 项目组件的选项, 枚举的简化 | `any[]` | - |
| valueEnum | 项目组件的枚举，会自动转化把值当成 key 来取出要显示的内容 | [valueEnum](https://procomponents.ant.design/components/schema#valueenum) | - |
| request | 从服务器请求枚举 | [request](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params) | - |
| ... | 继承 ProDescriptions.Item 的项目定义,详细可以看[这里](https://procomponents.ant.design/components/descriptions#prodescriptionsitem) | `` | - |

> 部分 ProDescriptions.Item 的项目定义无效
