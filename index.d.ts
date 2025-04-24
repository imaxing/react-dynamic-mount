import type { ComponentType, ReactNode, ReactElement } from 'react'

export interface Options<T> {
  extend: ComponentType<T>
  defaultProps?: Partial<T>
  className?: string
}

export type DynamicMountResult = {
  root: any
  close: () => void
  update: (state: Record<string, any>) => void
}

declare const createDynamicMount: <P>(
  options: Options<P>
) => (props: Partial<P & { component?: ReactNode }>) => DynamicMountResult

export default createDynamicMount
