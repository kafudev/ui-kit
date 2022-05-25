---
title: 简介
order: 1
group:
  path: /
nav:
  title: 文档
  path: /docs
  order: 1
---

# UI-KIT

## UI-KIT 的理念

Ant Design 和 ProComponents 定义了基础的设计规范，对应也提供了大量的基础组件。但是对于中后台类应用，我们希望提供更高程度的抽象，提供更上层的设计规范，并且对应提供相应的组件使得开发者可以快速搭建出高质量的页面。

在这个基础上我们同样提供了灵活的支持，比如对于 BaseList 来说你也可以把它完全当做 Ant Design 的 Table 和 ProTable 来用，对于 BaseForm 来说你也可以直接使用 ProForm 或者 Ant Design 的基础组件或者你的自定义组件。我们希望通过 Base 系列组件提供快速高效大家高质量中后台应用的能力，进一步扩展 Ant Design 的能力，欢迎使用并提出宝贵的意见。

### 一个组件 ≈ 一个页面

重型组件区别于传统组件有个很大的不同，重型组件在抽象时是将其当成一个页面来进行处理，所以 BaseList 会支持网络请求和自动生成查询表单，而 BaseEdit 会支持自动生成表单，两者都基于同样的思想也就是提供页面级别的抽象。

一个列表页应该可以用 BaseList 完成，一个编辑页应该使用 BaseEdit 完成，详情页可以用 BaseInfo 完成。 一个页面在开发工程中只需要关注对应的类型组件，降低心智负担，专注于更核心的业务逻辑。

### 设计与样式

在实际开发中我们也经常会碰到一些设计问题，比如经典的按钮应该放在左面还是右面，查询表单怎么布局，日期怎么格式化，数字的对齐问题，在重型组件中都进行了抽象，对于各种行为与样式我们都经过了设计师的讨论与设计可以达到默认好看及好用。

如果你还是想自定义相关渲染可以通过自定义 valueType 的方式来实现。默认的不一定是最好的，但是一定不差，如果你要自定义最好考虑一下投入产出比，毛坯房里雕花真的好吗？

## 参与贡献

我们非常欢迎你的贡献，你可以通过以下方式和我们一起共建 :smiley:：

- 在你的公司或个人项目中使用 UI-KIT。
- 通过 [Issue](http://github.com/ant-design/pro-components/issues) 报告 bug 或进行咨询。
- 提交 [Pull Request](http://github.com/ant-design/pro-components/pulls) 改进 UI-KIT 的代码。

### 风格指南

我们使用自动化代码格式化软件 [`Prettier`](https://prettier.io/)。 对代码做出更改后，运行 `npm run prettier`。当然我们更推荐 prettier 的插件，随时格式化代码。

> 我们的 CI 会检查代码是否被 prettier，在提交代码前最好执行一下 `npm run prettier`。

之后，`linter` 会捕获代码中可能出现的多数问题。 你可以运行 `npm run lint` 来检查代码风格状态。

不过，`linter` 也有不能搞定的一些风格。如果有些东西不确定，请查看 [Airbnb’s Style Guide](https://github.com/airbnb/javascript) 来指导自己。

### 开发工作流

安装yarn完成后你可以使用以下命令：

- `yarn start` 预览你的改动
- `yarn lint` 检查代码风格
- `yarn tsc` 检查 TypeScript 是否符合规范
- `yarn test` 测试代码是否可以通过测试用例
- `yarn test:coverage` 测试仓库的测试覆盖率
- `yarn build` 编译当前组件库

我们建议运行 `yarn test` 或前文提及的 linter 以确保你的代码变更有没有影响原有功能，同时保证你写的每行代码都被正确的测试到，不管怎样这样都会提升组件库的整体质量。

如果你增加了一个新功能，请添加测试后再提交 pr，这样我们能确保以后你的代码不出问题。

### 一些约定

UI-KIT 基于 antd 和 ProComponents 之上来开发，为了与 antd 的生态保持兼容性，我们要求覆盖 antd 的样式必须要使用 `.@{ant-prefix}` 变量来生成类名，在 js 中使用如下代码来配置实现。

```tsx | pure
const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
const prefixCls = getPrefixCls('pro-${包名}');
```
