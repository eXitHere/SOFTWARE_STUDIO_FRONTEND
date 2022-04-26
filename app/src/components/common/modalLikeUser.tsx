import { ModalLikeUserType } from 'types'
import AvatarGroup from 'react-avatar-group'

type ModalLikeUserProps = Pick<ModalLikeUserType, 'like_users' | 'close'>
export const ModalLikeUser = ({ like_users, close }: ModalLikeUserProps) => {
  return (
    <div
      id="popup-modal"
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center h-screen backdrop-blur-lg"
    >
      <div className=" flex flex-col items-center justify-center w-11/12 bg-white shadow h-3/6 rounded-2xl">
        <p className="text-xl font-bold mt-4 mb-4">คนที่กดถูกใจทั้งหมด</p>
        {/* add Component Here */}
        <div className="space-y-4 divide-y p-10 shadow-md overflow-auto ">
          {like_users.map((e, idx) => (
            <div key={idx} className="flex items-center w-60 pt-2">
              <div className="w-12 h-10 mr-6">
                {e.name ? (
                  <AvatarGroup
                    avatars={[e.name]}
                    initialCharacters={1}
                    max={1}
                    size={50}
                    displayAllOnHover
                    shadow={1}
                  />
                ) : null}
              </div>
              <div className="ml-2">
                <p className={`text-md ${!e.name && 'text-red-400'}`}>{e.name || 'Blocked User'}</p>
              </div>
            </div>
          ))}
        </div>
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
