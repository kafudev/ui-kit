---
order: 40
group:
  title: 原子组件
  path: /field
nav:
  title: 组件
  path: /components
---

# ItemUpload - 上传组件

通用上传编辑和显示组件，可使用 valueType ['upload'] 进行渲染输出, 通用的 ProField 渲染组件。一般针对特有类型文件上传，建议使用对应的图片上传 ItemImage、视频上传 ItemVideo、文档上传 ItemDocument 组件

## 代码演示

### 基本使用

```tsx
import React from 'react';
import { Space } from 'antd';
import { ItemUpload } from '@kafudev/ui-kit';

export default () => (
  <Space>
    <ItemUpload mode={'edit'} />
  </Space>
);
```

### 上传按钮

```tsx
import React from 'react';
import { Space, Row } from 'antd';
import { ItemUpload } from '@kafudev/ui-kit';

export default () => (
  <Space direction="vertical">
    <Row>
      <ItemUpload mode={'edit'} uploadType={'button'} />
    </Row>
    <Row>
      <ItemUpload mode={'edit'} uploadType={'dragger'} />
    </Row>
  </Space>
);
```

### 多选上传

```tsx
import React from 'react';
import { Space, Row } from 'antd';
import { ItemUpload } from '@kafudev/ui-kit';

export default () => (
  <Space direction="vertical">
    <Row>
      <ItemUpload mode={'edit'} uploadType={'button'} max={5} />
    </Row>
  </Space>
);
```

## API

> BaseItem 组件的内置组件，可通过 valueType ['upload'] 进行渲染输出，继承 BaseItem 的定义，详细可以看[这里](/components/base-item)。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| uploadType | 上传按钮类型 | `card \| button \| dragger` | `'card'` |
| actionUrl | 上传请求链接 | `string` | - |
| onResult | 上传请求完成数据处理，可格式化 actionUrl 请求后的数据 | `(object: any) => Promise<{ url: string; name?: string }>` | - |
| onUpload | 自定义上传请求方法，返回带有 url 的数据 | `(file: RcFile) => Promise<{ url: string; name?: string }>` | - |
| fieldProps | Upload 组件自带属性, 可参照 Upload 组件 | `object` | - |
| onChange | 数据更新，返回 value 和文件结构数据 | `(value: any, info: any) => void` | - |
| ... | 继承 BaseItem 的定义,详细可以看[这里](/components/base-item) | `` | - |
