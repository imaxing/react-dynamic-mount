/// <reference path="../index.d.ts" />
import { createRoot } from 'react-dom/client'
import React from 'react'
import type { ComponentType, ReactNode } from 'react'

export interface ExtendProps {
  component?: ReactNode
  children?: ReactNode
  onUpdate?: (state: any) => void
}

export interface CreateDynamicMountOptions<T> {
  extend: ComponentType<T>
  defaultProps?: Partial<T>
  className?: string
  closeHook?: 'onClose' | 'onCancel' | string
}

export type DynamicMountResult = {
  root: any
  close: () => void
  update: (state: any) => void
}

export type DynamicMountFunction = <P>(
  options: CreateDynamicMountOptions<P>
) => (props: Partial<P & ExtendProps>) => DynamicMountResult

export const createDynamicMount: DynamicMountFunction =
  <P>(options: CreateDynamicMountOptions<P>) =>
  props => {
    const { extend: Component, className, closeHook = 'onCancel', defaultProps = {} } = options
    const container = document.createElement('div')
    container.className = className || ''
    document.body.appendChild(container)

    const root = createRoot(container)

    const merged_props = {
      ...defaultProps,
      ...props,
      open: true,
      afterClose: () => {
        setTimeout(() => {
          root.unmount()
          ;(props as any).afterClose?.()
        }, 100)
      },
      [closeHook]: () => {
        close()
        ;(props as any)[closeHook]?.()
      }
    }

    const update = (state: any) => {
      root.render(
        React.createElement(Component as any, {
          ...merged_props,
          ...state
        })
      )
    }

    ;(merged_props as any).children = React.cloneElement((props as any).component, { onUpdate: update })

    const close = () => {
      setTimeout(() => {
        update({ open: false })
      }, 100)
    }

    root.render(React.createElement(Component as any, merged_props))

    container.remove()

    return {
      root,
      close,
      update
    }
  }

export default createDynamicMount
