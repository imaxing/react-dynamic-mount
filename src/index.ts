import { createRoot } from 'react-dom/client'
import React from 'react'
import type { ComponentType, ReactNode } from 'react'

export interface Options<T> {
  extend: ComponentType<T>
  defaultProps?: Partial<T>
  className?: string
}

export type Result = {
  root: any
  close: () => void
  update: (state: Record<string, any>) => void
}

export type CreateDynamicMount = <P>(options: Options<P>) => (props: Partial<P & { component?: ReactNode }>) => Result
export const createDynamicMount: CreateDynamicMount =
  <P>(options: Options<P>) =>
  (props: Partial<P & { component?: ReactNode }>) => {
    const { extend: Component, className, defaultProps: dps = {} } = options
    const container = document.createElement('div')
    className && (container.className = className)
    document.body.appendChild(container)

    const root = createRoot(container)

    const close = () => {
      update({ visible: false })
      setTimeout(() => {
        container.remove()
        root.unmount()
      }, 100)
    }

    const update = (state: any = {}) => {
      root.render(
        React.createElement(Component as any, {
          visible: false,
          onUpdate: update,
          containerEl: container,
          children: props.component,
          ...dps,
          ...state
        })
      )
    }

    update()

    setTimeout(() => update({ ...props, visible: true }), 100)

    return { root, update, close }
  }

export default createDynamicMount
