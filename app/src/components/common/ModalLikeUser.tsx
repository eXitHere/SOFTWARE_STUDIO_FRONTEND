import { ModalLikeUser } from 'types'
import { PostComment } from './PostComment'

type ModalLikeUserProp = Pick<ModalLikeUser, 'like_users' | 'close'>
export const ModalLikeUsers = ({ like_users, close }: ModalLikeUserProp) => {
  return (
    <div
      id="popup-modal"
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex flex-col items-center justify-center w-screen h-screen backdrop-blur-lg"
    >
      <div className="flex flex-col items-center justify-center w-11/12 bg-white shadow h-3/6 rounded-2xl dark:bg-gray-700">
        <p className="p-4 mb-6 text-3xl font-bold text-white">แก้ไขความคิดเห็น</p>
        <div>{JSON.stringify(like_users, null, 2)}</div>
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
