---
order: 30
group:
  title: 原子组件
  path: /field
nav:
  title: 组件
  path: /components
---

# ItemDocument - 文档组件

文档上传、多文档上传的文档编辑和显示组件，可使用 valueType ['document'] 进行渲染输出, 通用的 ProField 渲染组件。默认支持格式：.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt

## 代码演示

### 基本使用

```tsx
import React from 'react';
import { Space } from 'antd';
import { ItemDocument } from '@kafudev/ui-kit';

export default () => (
  <Space>
    <ItemDocument mode={'edit'} />
  </Space>
);
```

### 上传按钮

```tsx
import React from 'react';
import { Space, Row } from 'antd';
import { ItemDocument } from '@kafudev/ui-kit';

export default () => (
  <Space direction="vertical">
    <Row>
      <ItemDocument mode={'edit'} uploadType={'button'} />
    </Row>
    <Row>
      <ItemDocument mode={'edit'} uploadType={'dragger'} />
    </Row>
  </Space>
);
```

### 多选上传

```tsx
import React from 'react';
import { Space, Row } from 'antd';
import { ItemDocument } from '@kafudev/ui-kit';

export default () => (
  <Space direction="vertical">
    <Row>
      <ItemDocument mode={'edit'} uploadType={'button'} max={5} />
    </Row>
  </Space>
);
```

## API

> BaseItem 组件的内置组件，可通过 valueType ['document'] 进行渲染输出，继承 ItemUpload 的定义，详细可以看[这里](/components/field/item-document)。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| uploadType | 上传按钮类型 | `card \| button \| dragger` | `'card'` |
| actionUrl | 上传请求链接 | `string` | - |
| onResult | 上传请求完成数据处理，可格式化 actionUrl 请求后的数据 | `(object: any) => Promise<{ url: string; name?: string }>` | - |
| onUpload | 自定义上传请求方法，返回带有 url 的数据 | `(file: RcFile) => Promise<{ url: string; name?: string }>` | - |
| onChange | 数据更新，返回 value 和文件结构数据 | `(value: any, info: any) => void` | - |
| ... | 继承 ItemUpload 的定义,详细可以看[这里](/components/field/item-document) | `` | - |
