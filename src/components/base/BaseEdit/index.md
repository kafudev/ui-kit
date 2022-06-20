---
title: BaseEdit - 基础编辑
order: 3
group:
  title: 基础组件
  path: /
nav:
  title: 组件
  path: /components
  order: 2
---

# BaseEdit - 基础编辑

BaseEdit 是为了减少复杂的表单编辑页面，通过表单项直接生成统一的编辑页面，包含很多预设的输入组件。

## 代码演示

### 基本使用

<code src="./demos/base.tsx" iframe="500px" title="基本使用" desc="基本使用" />

### 多列使用

<code src="./demos/col2.tsx" iframe="500px" title="多列使用" desc="一行两列显示" />

### 嵌套行组使用

<code src="./demos/group.tsx" iframe="400px" title="嵌套行组使用" desc="表单内嵌套行组" />

### 嵌套对象使用

<code src="./demos/object.tsx" iframe="450px" title="嵌套对象使用" desc="表单内嵌套对象" />

### 嵌套数组使用

<code src="./demos/array.tsx" iframe="450px" title="嵌套数组使用" desc="表单内嵌套数组" />

## API

### 属性定义

> 继承 BaseForm 的表单定义，详细可以看[这里](/components/base-form)。

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| mode | 呈现类型 | `'page'` \| `'drawer'` \| `'modal'` | `'page'` |
| pageProps | 页面配置，关联的 BasePage 的[配置](/components/base-page) | `object` | - |
| layout | 表单布局 | `'horizontal'` \| `'vertical'` | `'horizontal'` |
| rowCol | 行列数，默认呈现一行一列 | `1`\|`2` | 1 |
| items | 表单项配置，查看[item 定义](/components/base-form#item-表单项定义)， | `{[key:string]: any}[]` | - |
| values | 表单数据值，键值对对象类型 | `object` | - |
| onValuesChange | 表单数据变化方法 | `(changedValues: any, value: any) => void ` | - |
| onSubmit | 提交表单方法 | `(value: any) => void ` | - |
| onReset | 重置表单方法 | `() => void ` | - |
| onCancel | 取消表单方法 | `() => void ` | - |
| renderHeader | 自定义头部 | `() => React.ReactNode ` | - |
| renderFooter | 自定义底部 | `() => React.ReactNode ` | - |
| ... | 继承 BaseForm 的表单定义，详细可以看[这里](/components/base-form) | `` | - |
