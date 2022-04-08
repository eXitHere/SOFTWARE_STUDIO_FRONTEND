import { ReactNode } from 'react'
import classNames from 'classnames'

type ScreenProps = {
  children: ReactNode
  overflowHidden?: boolean
}

export const Screen = ({ children, overflowHidden = false }: ScreenProps) => {
  return (
    <div
      className={classNames('flex items-center flex-col min-h-screen w-screen m-0 bg-primary-main', {
        'overflow-hidden': overflowHidden,
      })}
    >
      {children}
    </div>
  )
}
