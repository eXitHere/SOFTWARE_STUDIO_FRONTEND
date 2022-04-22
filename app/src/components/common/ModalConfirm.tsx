import { Modal } from 'types'

type ModalProps = Pick<Modal, 'warningText' | 'close' | 'agree'>
export const ModalConfirm = ({ warningText, close, agree }: ModalProps) => {
  return (
    <div
      // id="popup-modal"
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-screen h-screen backdrop-blur-lg"
    >
      <div className="flex flex-col items-center justify-center h-56 bg-white shadow rounded-2xl dark:bg-gray-700 w-96">
        <div className="w-full p-6 pt-6 text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 className="mb-5 text-lg font-normal text-white dark:text-white">{warningText}</h3>
          <button
            onClick={close}
            data-modal-toggle="popup-modal"
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-8 justify-center w-24"
          >
            ยกเลิก
          </button>
          <button
            onClick={agree}
            data-modal-toggle="popup-modal"
            type="button"
            className="text-white-500 hover:bg-green-600 rounded-lg text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-green-600 dark:text-white dark:hover:text-white dark:hover:bg-green-700 w-24"
          >
            ตกลง
          </button>
        </div>
      </div>
    </div>
  )
}
