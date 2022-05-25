---
title: 快速开始
order: 2
group:
  path: /
nav:
  title: 文档
  path: /docs
  order: 2
---

## 🧩 UI-KIT

UI-KIT 是基于 Ant Design 和 ProComponents 而开发的模板组件，提供了更高级别的抽象支持，开箱即用。可以显著的提升制作 CRUD 页面的效率，更加专注于页面。

- [BasePage](/components/base-page) 基础页面模板组件，提供统一化的页面配置和适配
- [BaseList](/components/base-list) 表格列表模板组件，提供抽象网络请求和表格格式化
- [BaseEdit](/components/base-edit) 编辑表单模板组件，提供表单渲染输入和表单布局
- [BaseInfo](/components/base-info) 内容展示模板组件，提供内容展示布局能力
- [BaseForm](/components/base-form) 表单样式模板组件，提供统一化的表单内页渲染输入
- [BaseIcon](/components/base-icon) 图标展示模板组件，提供通过名称渲染图标的能力

在使用之前可以查看一下组件的类型来判断组件是否适合你们的业务。UI-KIT 专注于更统一化的中后台的 CRUD, 预设了相当多的样式和行为。这些行为和样式更改起来会比较困难，如果你的业务需要丰富的自定义建议直接使用 [Ant Design](https://ant.design/) 或者 [ProComponents](https://procomponents.ant.design/) 。


## 📦 安装

```bash
$ npm install --save @kafudev/ui-kit
# or
$ yarn add @kafudev/ui-kit
```

## 🔨 使用

```ts
import { BasePage } from '@kafudev/ui-kit';
```

## 🌅 在项目中使用效果

使用示例如下 ：

```tsx
import React from 'react';
import { BasePage } from '@kafudev/ui-kit';

export default () => {
  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <BasePage title={'这是页面标题'}>{'页面内容content'}</BasePage>
    </div>
  );
};
```
