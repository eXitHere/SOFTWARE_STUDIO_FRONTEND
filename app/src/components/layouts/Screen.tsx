import { ReactNode } from 'react'
import classnames from 'classnames'

type ScreenProps = {
  children: ReactNode
  overflowHidden?: boolean
}
export const Screen = ({ children, overflowHidden = false }: ScreenProps) => {
  return (
    <div
      className={classnames('flex items-center flex-col min-h-screen w-screen m-0 bg-primary-main', {
        'overflow-hidden': overflowHidden,
      })}
    >
      {children}
    </div>
  )
}
