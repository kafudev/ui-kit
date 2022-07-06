---
order: 50
group:
  title: 原子组件
  path: /field
nav:
  title: 组件
  path: /components
---

## ItemArea 省市区组件

省市区选择组件，可设置不同的行政级别。支持行政级别：省级、地级、县级、乡级和村级。可使用 valueType ['area'] 进行渲染输出, 通用的 ProField 渲染组件。

## 代码演示

### 省市区三级

```tsx
import React from 'react';
import { Space, Row } from 'antd';
import { ItemArea } from '@kafudev/ui-kit';
import ProCard from '@ant-design/pro-card';

export default () => {
  const [value, setValue] = React.useState(['33', '3301', '330102']);
  return (
    <ProCard>
      <Row>
        <Space>
          <ItemArea
            mode={'edit'}
            text={value}
            onChange={(v, s) => {
              console.log('ItemArea onChange', v, s);
              setValue(v);
            }}
          />
          <p />
          <ItemArea mode={'read'} text={value} />
        </Space>
      </Row>
    </ProCard>
  );
};
```

### 省市区街道四级

```tsx
import React from 'react';
import { Space, Row } from 'antd';
import { ItemArea } from '@kafudev/ui-kit';
import ProCard from '@ant-design/pro-card';

export default () => {
  const [value, setValue] = React.useState(['33', '3301', '330102', '330102001']);

  return (
    <ProCard>
      <Row>
        <Space>
          <ItemArea
            mode={'edit'}
            areaType="pcas"
            text={value}
            onChange={(v, s) => {
              console.log('ItemArea onChange', v, s);
              setValue(v);
            }}
          />
          <p />
          <ItemArea mode={'read'} areaType="pcas" text={value} />
        </Space>
      </Row>
    </ProCard>
  );
};
```

## API

> BaseItem 组件的内置组件，可通过 valueType ['area'] 进行渲染输出，继承 BaseItem 的定义，详细可以看[这里](/components/base-item)。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| areaType | 地区数据类型，省市区三级 pca、省市区街道四级 pcas | `pca \| pcas` | `'pca'` |
| fieldProps | Cascader 组件自带属性, 可参照 Cascader 组件 | `object` | - |
| ... | 继承 BaseItem 的定义,详细可以看[这里](/components/base-item) | `` | - |
