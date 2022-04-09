import { createContext, useState, FC } from 'react'

// interface IModalContext {
//   content: React.ReactNode
//   setContent: React.ReactNode
//   isModalOpen: React.ReactNode
//   setIsModalOpen: React.ReactNode
//   open?: (content: React.ReactNode) => void
//   close?: () => void
//   agree?: () => void
// }
// export const ModalContext = createContext<IModalContext>({} as IModalContext)
// export const ModalProvider: FC = ({children}) => {
//   const [content, setContent] = useState<React.ReactNode>(null)
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

//   const open = (content: React.ReactNode) => {
//     setContent(content)
//     setIsModalOpen(true)
//   }

//   const close = () => {
//     setIsModalOpen(false)
//     setContent(null)
//   }

//   const agree = () => {
//     setIsModalOpen(false)
//     setContent(null)
//     // logout to login page
//   }
//   return (
//     <ModalContext.Provider
//       value={{
//         content,
//         setContent,
//         isModalOpen,
//         setIsModalOpen,
//         open,
//         close,
//         agree
//       }}
//     >
//       {children}
//     </ModalContext.Provider>
//   )





// interface IBlurContext {
//   isBlur: Boolean
//   handleBlur: () => void
// }
// export const BlurContext = createContext<IBlurContext>({} as IBlurContext)
// export const BlurProvider: FC = ({children}) => {
//   const [isBlur, setIsBlur] = useState<boolean>(false)
//   const handleBlur = () => {
//     setIsBlur(!isBlur)
//   }
//   return (
//     <BlurContext.Provider
//       value={{
//         isBlur,
//         handleBlur
        
//       }}
//     >
//       {children}
//     </BlurContext.Provider>
//   )
// }