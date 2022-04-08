import { PropsWithChildren } from 'react'

type ButtonProps = {
  onClick: () => void
}

export const Button = ({ onClick, children }: PropsWithChildren<ButtonProps>) => {
  return <button onClick={onClick}>{children}</button>
}
