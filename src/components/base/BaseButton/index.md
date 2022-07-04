---
title: BaseButton - 基础按钮
order: 7
group:
  title: 基础组件
  path: /
nav:
  title: 组件
  path: /components
  order: 2
---

# BaseButton - 基础按钮

BaseButton 是为了可直接通过类型显示的不同颜色的按钮组件，基于 antd 的[按钮]组件(https://ant.design/components/button-cn/)。

## 代码演示

### 基本使用

<code src="./demos/base.tsx" iframe="100px" title="基本使用" desc="基本使用" />

### 继承 Button 属性

<code src="./demos/props.tsx" iframe="100px" title="继承Button属性" desc="继承Button属性" />

### 颜色属性

<code src="./demos/color.tsx" iframe="300px" title="Button颜色属性" desc="Button颜色属性" />

## API

> 继承 Button 的定义，详细可以看[这里](https://ant.design/components/button-cn/#API)。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型，在 Button 的基础类型上，新增了几种按钮类型 | `info \| success \| warning \| error ` | `default` |
| title | 按钮标题 | `string \| ReactNode` | - |
| backgroundColor | 背景颜色 | `string` | - |
| color | 文字颜色 | `string` | - |
| borderColor | 边框颜色 | `string` | - |
| ... | 继承 Button 的定义,详细可以看[这里](https://ant.design/components/button-cn/#API) | `` | - |
