---
title: UI-KIT - 页面级别的基础组件
order: 1
sidebar: false
hero:
  title: UI-KIT
  desc: 🧩 快速搭建风格统一化的中后台
  actions:
    - text: 🚀 快速开始 →
      link: /docs/getting-started

features:
  - icon: https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*43rfS4dD0MUAAAAAAAAAAABkARQnAQ
    title: 简单易用
    desc: 在 Ant Design 和 ProComponents 上进行了自己的封装，更加易用
  - icon: https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg
    title: Ant Design
    desc: 与 Ant Design 设计体系一脉相承，无缝对接 antd 项目
  - icon: https://gw.alipayobjects.com/zos/antfincdn/CPoxyg4J2d/geography.png
    title: 国际化
    desc: 提供完备的国际化，与 Ant Design 体系打通
  - icon: https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*cY0tTr8q3Y4AAAAAAAAAAABkARQnAQ
    title: 预设样式
    desc: 样式风格与 antd 一脉相承，无需魔改，浑然天成
  - icon: https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*abGUQKUocSMAAAAAAAAAAABkARQnAQ
    title: 预设行为
    desc: 更少的代码，更少的 Bug
  - icon: https://gw.alipayobjects.com/zos/antfincdn/Eb8IHpb9jE/Typescript_logo_2020.svg
    title: TypeScript
    desc: 使用 TypeScript 开发，提供完整的类型定义文件

footer: Open-source MIT Licensed | © 2022 [卡服科技](http://www.kafukeji.com)
---

# UI-KIT [组件库](https://kafudev.github.io/ui-kit)

> 🚀 快速搭建风格统一化的中后台

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

## 🎉 [组件 components](/components)

| 组件       | 类型                                               |
| ---------- | -------------------------------------------------- |
| BasePage   | 基础页面模板组件，提供统一化的页面配置和适配       |
| BaseList   | 表格列表模板组件，提供抽象网络请求和表格格式化     |
| BaseEdit   | 编辑表单模板组件，提供表单渲染输入和表单布局       |
| BaseInfo   | 内容展示模板组件，提供内容展示布局能力             |
| BaseForm   | 表单样式模板组件，提供统一化的表单内页渲染输入     |
| BaseItem   | 输入展示项目组件，提供通用的渲染输入和展示组件能力 |
| BaseIcon   | 图标展示模板组件，提供通过名称渲染图标的能力       |
| BaseButton | 基础按钮模板组件，提供颜色类型渲染按钮的能力       |

## 🎉 [工具 utils](/utils)

| 工具 | 类型                                 |
| ---- | ------------------------------------ |
| page | 提供全局统一的侧栏和弹窗的打开和关闭 |

## 👏 特别鸣谢

> 该组件库基于 Ant Design 和 ProComponents 组件库进行封装，基础组件依赖于 Ant Design 的组件

- [Ant Design](https://ant.design/) 企业级产品设计体系，创造高效愉悦的工作体验
- [ProComponents](https://procomponents.ant.design/) 🏆 让中后台开发更简单

## 🛠️ 技术支持

- [杭州卡服电子科技有限公司](https://www.kafukeji.com/)

## 🖥 浏览器兼容性

- 现代浏览器和 Internet Explorer 11 (with [polyfills](https://stackoverflow.com/questions/57020976/polyfills-in-2019-for-ie11))
- [Electron](https://www.electronjs.org/)

| [![edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![electron_48x48](https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png)](http://godban.github.io/browsers-support-badges/) |
| --- | --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |
