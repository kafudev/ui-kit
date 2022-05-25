---
title: 常见问题
group:
  path: /
nav:
  title: FAQ
  path: /faq/faq
  order: 5
---

## FAQ 疑问

以下整理了一些 UI-KIT 社区常见的问题和官方答复，在提问之前建议找找有没有类似的问题。此外我们也维护了一个反馈较多 [how to use 标签](https://github.com/ant-design/pro-components/issues?q=is%3Aissue+label%3A%22%F0%9F%A4%B7%F0%9F%8F%BC+How+to+use%22+) 亦可参考。

## BaseList request 返回的数据格式可以自定义吗?

不行的，你可以在 request 中转化一下，或者写个拦截器。

[示例](https://beta-pro.ant.design/docs/request-cn)

## `BaseForm` 当中 `initialValues`

`ProComponents` 底层也是封装的 [antd](https://ant.design/index-cn) ，所以用法也是和 [antd](https://ant.design/index-cn) 相同。注意 `initialValues` 不能被 `setState` 动态更新，你需要用 `setFieldsValue` 来更新。 `initialValues` 只在 `form` 初始化时生效且只生效一次，如果你需要异步加载推荐使用 `request`，或者 `initialValues ? <Form/> : null`

## 错误和警告

这里是一些你在使用 UI-KIT 的过程中可能会遇到的错误和警告，但是其中一些并不是 UI-KIT 的 bug。

## Cannot read property 'Provider' of undefined

请确保 antd 的版本 >= `4.11.1`

## Cannot read property 'Provider' of undefined

请确保 antd 的版本 >= `4.11.1`

## Cannot read property 'Provider' of undefined

请确保 antd 的版本 >= `4.11.1`

## Cannot read property 'Provider' of undefined

请确保 antd 的版本 >= `4.11.1`
