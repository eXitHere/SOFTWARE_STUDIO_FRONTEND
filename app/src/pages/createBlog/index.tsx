import { Screen } from 'components/layouts/Screen'
import { Navbar } from 'components/common/Navbar'
import { ChangeEvent, SetStateAction, useState } from 'react'
//import profile1 from 'assets/images/profile1.jpeg'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { convertToHTML } from 'draft-convert'
import DOMPurify from 'dompurify'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export const CreateBlog = () => {
  const [topicText, setTopicText] = useState<string>('')
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [convertedContent, setConvertedContent] = useState<string | null>(null)
  const handleChangeTopic = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTopicText(e.target.value)
  }

  // const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   setContentText(e.target.value)
  // }

  const handleCreateBlog = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log(String(convertedContent))
  }

  const handleEditorChange = (state: SetStateAction<EditorState>) => {
    setEditorState(state)
    convertContentToHTML()
  }

  const convertContentToHTML = () => {
    const currentContentAsHTML = convertToHTML(editorState.getCurrentContent())
    setConvertedContent(currentContentAsHTML)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createMarkup = (html: any) => {
    return {
      __html: DOMPurify.sanitize(html),
    }
  }

  return (
    <Screen>
      <Navbar isBoards={false} />
      <p className="mb-4 text-3xl font-bold text-white mt-28"> สร้างกระทู้ใหม่</p>
      <form className="flex flex-col items-center justify-center w-11/12 h-full md:w-3/4">
        <p className="w-full my-4 text-xl text-white">ชื่อกระทู้</p>

        {/* preview div */}
        {/* <div dangerouslySetInnerHTML={createMarkup(convertedContent)}></div> */}
        <textarea
          value={topicText}
          onChange={handleChangeTopic}
          rows={4}
          cols={50}
          className="w-full h-20 p-4 text-lg rounded-xl"
        />

        <p className="w-full my-4 text-xl text-white">เนื้อความ</p>
        <div className="w-full p-5 bg-white rounded-xl">
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            toolbar={{
              options: ['inline', 'blockType', 'list', 'history'],
              inline: { inDropdown: false, options: ['bold', 'italic', 'underline'] },
              list: { inDropdown: true, options: ['unordered', 'ordered'] },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              fontFamily: { inDropdown: true },
              blockType: { inDropdown: true, options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'] },
            }}
          />
        </div>
        <div className="relative w-full pb-10 mb-10" onClick={handleCreateBlog}>
          <button className="absolute right-0 w-32 p-4 m-4 mr-0 font-bold text-white bg-green-500 rounded-xl">
            สร้าง
          </button>
        </div>
      </form>
    </Screen>
  )
}

export default CreateBlog
