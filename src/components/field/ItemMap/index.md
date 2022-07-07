---
order: 50
group:
  title: 原子组件
  path: /field
nav:
  title: 组件
  path: /components
---

## ItemMap 地图组件

基于 高德地图 Amap 的地图组件。可使用 valueType ['map'] 进行渲染输出, 通用的 ProField 渲染组件。

## 代码演示

### 基本使用

```tsx
import React from 'react';
import { Space, Row } from 'antd';
import { ItemMap } from '@kafudev/ui-kit';

export default () => (
  <Row>
    <ItemMap
      mode={'edit'}
      appkey={'c407726980f74ca15448e203b7b3cad9'}
      appsecret={'5b40550d726a78728164a49ce094b728'}
    />
  </Row>
);
```

### 显示小地图

```tsx
import React from 'react';
import { Space, Row } from 'antd';
import { ItemMap } from '@kafudev/ui-kit';

export default () => (
  <Row>
    <ItemMap
      mode={'edit'}
      showMap={true}
      appkey={'c407726980f74ca15448e203b7b3cad9'}
      appsecret={'5b40550d726a78728164a49ce094b728'}
    />
  </Row>
);
```

## API

> BaseItem 组件的内置组件，可通过 valueType ['map'] 进行渲染输出，继承 BaseItem 的定义，详细可以看[这里](/components/base-item)。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| appkey | web 端地图开发者 key | `string` | - |
| appsecret | web 端地图开发者密钥 | `string` | - |
| width | 地图组件宽度，设置 auto 为可自动拉伸 | `string` | '350px' |
| height | 地图组件高度，设置 auto 为可自动拉伸 | `string` | '200px' |
| showMap | 是否显示小地图，默认不显示 | `boolean` | false |
| plugins | 插件集合(\*暂无效) ，参考[amap 插件配置](https://lbs.amap.com/api/jsapi-v2/guide/abc/plugins) | `any` | - |
| onChange | 数据更新，返回 value 和地址信息 | `(value: any, address?: any, addressInfo?: any) => void` | - |
| ... | 继承 BaseItem 的定义,详细可以看[这里](/components/base-item) | `` | - |
