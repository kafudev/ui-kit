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

基于 wangEditor 富文本编辑器组件

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

| 参数   | 说明                                                         | 类型           | 默认值 |
| ------ | ------------------------------------------------------------ | -------------- | ------ |
| config | editor 编辑器配置                                            | `EditorConfig` | -      |
| ...    | 继承 BaseItem 的定义,详细可以看[这里](/components/base-item) | ``             | -      |
