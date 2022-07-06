---
order: 50
group:
  title: 原子组件
  path: /field
nav:
  title: 组件
  path: /components
---

## ItemEditor 富文本编辑器组件

基于 wangEditor 富文本编辑器组件。可使用 valueType ['editor'] 进行渲染输出, 通用的 ProField 渲染组件。

## 代码演示

### 基本使用

```tsx
import React from 'react';
import { Space } from 'antd';
import { ItemEditor } from '@kafudev/ui-kit';

export default () => (
  <Space>
    <ItemEditor mode={'edit'} />
  </Space>
);
```

### 简单模式

```tsx
import React from 'react';
import { Space } from 'antd';
import { ItemEditor } from '@kafudev/ui-kit';

export default () => (
  <Space>
    <ItemEditor mode={'edit'} modeType={'simple'} />
  </Space>
);
```

## API

> BaseItem 组件的内置组件，可通过 valueType ['editor'] 进行渲染输出，继承 BaseItem 的定义，详细可以看[这里](/components/base-item)。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modeType | 编辑器模式类型，default=默认模式，simple=简单模式 | `default \| simple` | default |
| zIndex | 编辑器堆叠顺序 | `number` | 100 |
| height | 编辑器高度，设置 auto 为可自动拉伸 | `string` | '300px' |
| config | 编辑器配置 ，参考[wangEditor 配置](https://www.wangeditor.com/v5/editor-config.html) | `EditorConfig` | - |
| toolbarConfig | 工具栏配置，参考[wangEditor 配置](https://www.wangeditor.com/v5/toolbar-config.html) | `ToolbarConfig` | - |
| uploadUrl | 上传请求链接 | `string` | - |
| uploadResult | 上传请求完成数据处理，可格式化 uploadUrl 请求后的数据 | `(res: any) => { url: string; alt?: string; href?: string }` | - |
| ... | 继承 BaseItem 的定义,详细可以看[这里](/components/base-item) | `` | - |
