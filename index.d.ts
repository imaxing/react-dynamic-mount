import type { ComponentType, ReactNode, ReactElement } from 'react'

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

declare const createDynamicMount: DynamicMountFunction

export default createDynamicMount
