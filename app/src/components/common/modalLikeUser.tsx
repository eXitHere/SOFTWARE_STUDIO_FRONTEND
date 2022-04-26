import { ModalLikeUserType } from 'types'
import { PostComment } from './PostComment'

type ModalLikeUserProps = Pick<ModalLikeUserType, 'like_users'| 'close'>
export const ModalLikeUser = ({like_users, close}: ModalLikeUserProps) => {
  return (
    <div
      id="popup-modal"
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-screen h-screen backdrop-blur-lg"
    >
      <div className="flex flex-col items-center justify-center w-11/12 bg-white shadow h-3/6 rounded-2xl">
        {/* add Component Here */}
        <button
          onClick={close}
          data-modal-toggle="popup-modal"
          type="button"
          className="text-white m-8 bg-red-600 hover:bg-red-800 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-8 justify-center w-24"
        >
          ปิด
        </button>
      </div>
    </div>
  )
}