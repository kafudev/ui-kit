---
title: BasePage - 基础页面
order: 1
group:
  title: 基础组件
  path: /
nav:
  title: 组件
  path: /components
  order: 2
---

# BasePage - 基础页面

BasePage 是为了减少繁杂的面包屑配置和标题，保持项目内的页面保持一致，可以适应多种排版布局。

BasePage 封装了 antd pro 的 PageContainer 组件。 BasePage 支持 PageContainer 和 PageHeader 的所有属性。

```tsx | pure
<BasePage
  content="欢迎使用 BasePage 组件"
  title="这是页面标题"
  extra={[
    <Button key="3">操作</Button>,
    <Button key="2">操作</Button>,
    <Button key="1" type="primary">
      主操作
    </Button>,
  ]}
>
  {children}
</BasePage>
```

## 代码演示

### 基本使用

<code src="./demos/base.tsx" iframe="200" title="基本使用" desc="基本使用" />

### 去掉返回

<code src="./demos/noback.tsx" iframe="200" title="去掉返回" desc="去掉返回按钮" />

### 扩展按钮

<code src="./demos/extra.tsx" iframe="200" title="扩展按钮" desc="通过 `extra` 设置标题栏扩展按钮" />

### 页面水印

<code src="./demos/water.tsx" iframe="400" title="页面水印" desc="通过 `waterMarkProps` 设置标题栏扩展按钮" />

### 关闭 Card

<code src="./demos/nocard.tsx" iframe="200" title="关闭Card" desc="通过 `cardProps` 设置false不显示内部card" />

### 显示 Card

<code src="./demos/card.tsx" iframe="300" title="显示Card" desc="通过 `cardProps` 设置内部card属性" />

## API

> 继承 PageContainer 的定义，详细可以看[这里](https://procomponents.ant.design/components/page-container)。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 呈现类型 | `'page'` \| `'drawer'` \| `'modal'` \| `'card'` | `'page'` |
| title | 页面标题 | ReactNode | - |
| extra | 标题栏扩展按钮 | ReactNode | - |
| content | 内容区 | ReactNode | - |
| cardProps | 页面内部默认 card 配置，设置为 false，则不渲染 ProCard，关联的 ProCard 的[配置](https://procomponents.ant.design/components/card#api) | `object \| boolean` | - |
| backTopProps | 页面 BackTop 向上配置，设置为 false，则不渲染 BackTop，关联的 BackTop 的[配置](https://ant.design/components/back-top-cn/#API) | `object \| boolean` | - |
| header | [PageHeader](https://ant.design/components/page-header-cn/) 的所有属性 | `PageHeaderProps` | - |
| waterMarkProps | 配置水印，Layout 会透传给 PageContainer，但是以 PageContainer 的配置优先 | [WaterMarkProps](https://procomponents.ant.design/components/water-mark) | - |
| ... | 继承 PageContainer 的定义,详细可以看[这里](https://procomponents.ant.design/components/page-container) | `` | - |
