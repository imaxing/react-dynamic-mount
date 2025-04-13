# react-dynamic-mount

> 一个用于动态挂载 React 组件的工具库。

## 安装

```bash
npm install react-dynamic-mount
```

## 使用方法

```tsx
import createDynamicMount from 'react-dynamic-mount'
import { Modal } from 'antd'

// 创建一个动态挂载的 Modal
const createModal = createDynamicMount({
  extend: Modal,
  defaultProps: {
    width: 500,
    maskClosable: false
  }
})

// 使用
const instance = createModal({
  title: '标题',
  component: <YourComponent />,
  onCancel: () => {
    console.log('关闭了')
  }
})

// 更新属性
instance.update({ title: '新标题' })

// 手动关闭
instance.close()
```

## API

### createDynamicMount

创建一个动态挂载的函数。

#### 参数

| 参数名       | 说明             | 类型                    | 必填 | 默认值     |
| ------------ | ---------------- | ----------------------- | ---- | ---------- |
| extend       | 要扩展的组件     | React.ComponentType     | 是   | -          |
| className    | 容器类名         | string                  | 否   | -          |
| closeHook    | 组件关闭钩子名称 | 'onClose' \| 'onCancel' | 否   | 'onCancel' |
| defaultProps | 默认属性         | object                  | 否   | {}         |

### 返回值

返回一个函数，该函数接收组件属性并返回一个实例对象：

#### 实例方法

| 方法名 | 说明                  | 参数                    | 返回值 |
| ------ | --------------------- | ----------------------- | ------ |
| update | 更新组件属性          | (state: object) => void | -      |
| close  | 关闭组件              | -                       | -      |
| root   | React 18 的 Root 实例 | -                       | -      |

## 注意事项

1. 组件会自动挂载到 `document.body` 上
2. 组件关闭后会自动从 DOM 中移除
3. 支持 React 18 的 `createRoot` API
4. 组件会自动处理 `open` 状态
