# react-dynamic-mount

A lightweight React component dynamic mounting utility.

- When you need to dynamically create and destroy components like modals and drawers
- When you need to reuse component mounting logic

## Basic Usage

```tsx
import createDynamicMount from 'react-dynamic-mount'

// Base Modal.ts
import { Modal } from 'antd'

export default function IModal() {
  // Automatically inject visible state into component
  // children is <YourComponent />
  const { visible, children, ...rest } = props
  return (
    <Modal {...rest} open={visible}>
      {children}
    </Modal>
  )
}

// dynamic.ts
import IModal from 'path/to/IModal'
export const createModal = createDynamicMount({
  extend: IModal,
  defaultProps: {
    width: 500,
    maskClosable: false,
    onClosed: () => {
      window.confirm('Confirm to close ?')
      // handle close confirm
    }
  }
})

import { createModal } from 'path/to/dynamic.ts'
const instance = createModal({
  title: 'Title',
  width: 800, // override default props
  component: <YourComponent />,
  onOk: () => {
    console.log('callback')
  }
})

// manually close
instance.close()
```

## API

#### createDynamicMount

| Parameter    | Description         | Type                | Default |
| ------------ | ------------------- | ------------------- | ------- |
| extend       | Component to extend | React.ComponentType | -       |
| className    | Container class     | string              | -       |
| defaultProps | Default properties  | object              | {}      |

#### createDynamicMount Instance Props
```tsx
const instance = createModal({
  component: ReactNode,
  [key]: any
})
```

| Parameter | Description         | Type      | Default |
| --------- | ------------------- | --------- | ------- |
| component | Component to render | ReactNode | -       |

#### Instance Methods

| Method        | Description            |
| ------------- | ---------------------- |
| update(state) | Update component state |
| close()       | Close component        |
| root          | React 18 Root instance |
