import { useState, useEffect } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw } from 'draft-js'
import axios from 'pages/apiclient'

import { Announcement } from 'types'

type AnoucementProps = Pick<Announcement, 'close'>

export const AnoucementModal = ({ close }: AnoucementProps) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [data, setData] = useState<any>({})

  const getAnoucement = async () => {
    try {
      const response = await axios('https://thammathip.exitguy.studio/api/Announce')
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.content))))
      setData(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getAnoucement()
  }, [])

  return (
    <div
      id="popup-anoucement"
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-screen h-screen backdrop-blur-lg"
    >
      <div className="relative flex flex-col items-center w-11/12 p-8 bg-white shadow rounded-2xl dark:bg-white">
        <Editor
          editorState={editorState}
          toolbarClassName="hidden"
          // wrapperClassName="wrapperClassName"
          // editorClassName="editorClassName"
          readOnly={true}
          toolbar={{
            options: [],
          }}
        />
        <div className="flex items-center w-full pt-2">
          <p className="left-0 font-normal text-md bottom-1 opacity-70">
            {"ประกาศวันที่ : " + data.created_date?.split('T')[0].split('-')[2] +
              '/' +
              data.created_date?.split('T')[0].split('-')[1] +
              '/' +
              String(parseInt(data.created_date?.split('T')[0].split('-')[0]) + 543)}
          </p>
        </div>
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
