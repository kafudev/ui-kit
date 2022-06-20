---
title: BaseList - 基础列表
order: 2
group:
  title: 基础组件
  path: /
nav:
  title: 组件
  path: /components
  order: 2
---

# BaseList - 基础列表

BaseList 是为了快速呈现模块的列表页，可以保持列表页风格统一，自动分页、自动展示筛选条件，配置头部操作栏，以及底部操作栏

## 代码演示

### 基本使用

<code src="./demos/base.tsx" background="#f5f5f5" title="基本使用" />

### 查询列表

<code src="./demos/base.tsx" background="#f5f5f5" title="查询列表" />

### 无筛选列表

<code src="./demos/nosearch.tsx" background="#f5f5f5" title="无筛选列表" />

## API

### 属性定义

BaseList 与 antd 的 [ProList](https://procomponents.ant.design/components/table/) 和 [List](https://ant.design/components/list-cn/) 相比，API 设计上更像 Table，使得可以通过配置化的方式快速定义数据项的展现形式。也使得 Table 和 List 的切换变得更加容易。**另外 BaseList 基于 ProList 实现，除了 ProList 和 Table 相关的 API 以外 BaseList 支持大部分 ProTable 的 API**。

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| mode | 呈现类型 | `'page'` \| `'drawer'` \| `'modal'` | `'page'` |
| table | 表格关联数据库配置，查看[table 定义](#table-定义) | `object` | - |
| pageProps | 页面配置，关联的 BasePage 的[配置](/components/base-page) | `object` | - |
| columns | 表格列项配置，查看[column 定义](#column-列定义)， | `{[key:string]: any}[]` | - |
| filters | 筛选项配置，查看[filter 定义](#filter-列定义) | `{[key:string]: any}[]` | - |
| actions | 头部操作区列表，可快速渲染操作区 | `{[key:string]: any}[]` | - |
| footerActions | 底部操作区列表，可快速渲染操作区 | `{[key:string]: any}[]` | - |
| request | 数据请求方法 | `(params: {pageSize: number, current: number, keyword: number}, sort: Record<string, SortOrder>, filter: any) => Promise<any> ` | - |
| renderTableTitle | 自定义表格标题 | `() => React.ReactNode ` | - |
| renderTableTool | 自定义表格右边工具 | `() => React.ReactNode ` | - |
| renderTableFilter | 自定义表格筛选块 | `() => React.ReactNode ` | - |
| renderTableHeader | 自定义表格头部 | `() => React.ReactNode ` | - |
| renderTableFooter | 自定义表格底部 | `() => React.ReactNode ` | - |
| renderTableActions | 自定义表格头部操作区 | `() => React.ReactNode ` | - |
| renderTableFooterActions | 自定义表格底部操作区 | `() => React.ReactNode ` | - |

### table 定义

| 参数  | 说明                              | 类型     | 默认值 |
| :---- | :-------------------------------- | :------- | :----- |
| mname | 数据库表名                        | `string` | -      |
| key   | 数据库主键，行的 key，一般是行 id | `string` | -      |

### column 列定义

> 继承 ProTable 的列定义，详细可以看[这里](https://procomponents.ant.design/components/table?current=1&pageSize=5#columns-%E5%88%97%E5%AE%9A%E4%B9%89)。

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 列名称，可自定义渲染, 跟 ProTable 的 title 是同定义 | `string \| ReactNode ` | - |
| tooltip | 会在 title 之后展示一个 icon，hover 之后提示一些信息 | `string` | - |
| name | 表格行对应的字段名，跟 ProTable 的 dataIndex 是同定义 | `string` | - |
| type | 值的类型,会生成不同的渲染器，跟 ProTable 的[`valueType`](https://procomponents.ant.design/components/schema#valuetype)是同定义 | `string` | - |
| copy | 是否支持复制, 跟 ProTable 的 copyable 是同定义 | `boolean` | - |
| align | 排列位置 | `'center'` \| `'left'` \| `'right'` | `'left'` |
| valueEnum | 值的枚举，会自动转化把值当成 key 来取出要显示的内容 | [valueEnum](https://procomponents.ant.design/components/schema#valueenum) | - |
| order | 查询表单中的权重，权重大排序靠前 | `number` | - |
| disabled | 列设置中`disabled`的状态 | `boolean` \| `{ checkbox: boolean; }` | - |
| initialValue | 查询表单项初始值 | `any` | - |
| request | 从服务器请求枚举 | [request](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params) | - |
| ... | 继承 ProTable 的列定义,详细可以看[这里](https://procomponents.ant.design/components/table?current=1&pageSize=5#columns-%E5%88%97%E5%AE%9A%E4%B9%89) | `` | - |

> 部分 ProTable 里的列属性定义无效，hideInSearch、hideInTable、hideInForm、hideInDescriptions、filters、onFilter 均无效，因为该封装组件已经拆分了筛选和表格列定义

### filter 筛选定义

> 跟 Column 列定义基本一致，可参照

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 表单标签名称 | `string` | - |
| tooltip | 会在 标签 之后展示一个 icon，hover 之后提示一些信息 | `string` | - |
| name | 表格行对应的字段名，跟 ProTable 的 dataIndex 是同定义 | `string` | - |
| type | 值的类型,会生成不同的渲染器，跟 ProTable 的[`valueType`](https://procomponents.ant.design/components/schema#valuetype)是同定义 | `string` | - |
| options | 值的选项, 枚举的简化 | `any[]` | - |
| valueEnum | 值的枚举，会自动转化把值当成 key 来取出要显示的内容 | [valueEnum](https://procomponents.ant.design/components/schema#valueenum) | - |
| request | 从服务器请求枚举 | [request](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params) | - |
| ... | 继承 ProTable 的列定义,详细可以看[这里](https://procomponents.ant.design/components/table?current=1&pageSize=5#columns-%E5%88%97%E5%AE%9A%E4%B9%89) | `` | - |

> 部分 ProTable 里的列属性定义无效，hideInSearch、hideInTable、hideInForm、hideInDescriptions、filters、onFilter 均无效，因为该封装组件已经拆分了筛选和表格列定义
