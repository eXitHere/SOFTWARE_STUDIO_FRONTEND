import { Anoucement } from 'types'

type AnoucementProps = Pick<Anoucement, 'topic' | 'text' | 'close'>
export const AnoucementModal = ({ topic, text, close }: AnoucementProps) => {
  return (
    <div
      id="popup-anoucement"
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-screen h-screen backdrop-blur-lg"
    >
      <div className="relative flex flex-col items-center w-3/4 bg-white shadow rounded-2xl dark:bg-white">
        <p className="p-5 text-3xl font-normal">{topic}</p>
        <p className="p-5 mb-5 text-lg font-normal">{text}</p>
        <button
          onClick={close}
          data-modal-toggle="popup-modal"
          type="button"
          className="absolute flex items-center justify-center w-2 h-2 p-4 text-sm font-medium text-white bg-red-600 rounded-full right-2 bottom-2 hover:bg-red-800 dark:focus:ring-red-800"
        >
          x
        </button>
      </div>
    </div>
  )
}
