import { Screen } from 'components/layouts/Screen'
import { Navbar } from 'components/common/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { ChangeEvent, SetStateAction, useState, useEffect } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'

import DOMPurify from 'dompurify'
import axios from '../apiclient'
import { Path } from 'routes'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { ChooseCategory } from 'components/common/ChooseCategory'
import draftToHtml from 'draftjs-to-html'


export const CreateBlog = () => {
  const [topicText, setTopicText] = useState<string>('')
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [convertedContent, setConvertedContent] = useState<string | null>(null)
  const [selectTag, setSelectTag] = useState<string[]>(['คำสอน'])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [decoded, setDecoded] = useState<any>({})
  const navigateTo = useNavigate()

  const handleChangeTopic = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTopicText(e.target.value)
  }

  const handleCreateBlog = async (e: { preventDefault: () => void }) => {
    const sendData = {
      topic: topicText,
      content: String(convertedContent),
      category: selectTag,
    }
    e.preventDefault()
    try {
      const response = await axios.post('https://thammathip.exitguy.studio/api/Blog/create', sendData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      console.log(response)
    } catch (e) {
      console.log(e)
    }
    return navigateTo(Path.Profile)
    // console.log(sendData)
  }

  const handleEditorChange = (state: SetStateAction<EditorState>) => {
    setEditorState(state)
    convertContentToHTML()
  }

  const convertContentToHTML = () => {
    const currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    setConvertedContent(currentContentAsHTML)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createMarkup = (html: any) => {
    return {
      __html: DOMPurify.sanitize(html),
    }
  }

  const handleChoose = (Category: string) => {
    if (selectTag.includes(Category) == false) {
      setSelectTag([Category, ...selectTag])
    } else {
      // const myIndex = selectTag.indexOf(Category)
      // if (myIndex !== -1) {
      //   selectTag.splice(myIndex, 1)
      // }
      const newArray = selectTag.filter(function (f) {
        return f !== Category
      })
      setSelectTag([...newArray])
    }
  }


  return (
    <Screen>
      <Navbar isBoards={false} username={decoded.username} />
      <p className="mb-4 text-3xl font-bold text-white mt-28"> สร้างกระทู้ใหม่</p>
      <div className="flex flex-col items-center justify-center w-11/12 h-full md:w-3/4">
        <p className="w-full my-4 text-xl text-white">ชื่อกระทู้</p>
        <textarea
          value={topicText}
          onChange={handleChangeTopic}
          rows={4}
          cols={50}
          className="w-full h-20 p-4 text-lg rounded-xl"
        />
        <p className="w-full my-4 text-xl text-white">เลือกหมวดหมู่</p>
        <ChooseCategory selectTag={selectTag} handleChoose={handleChoose} />
        <p className="w-full my-4 text-xl text-white">เนื้อความ</p>
        <div className="w-full p-5 bg-white rounded-xl">
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            toolbar={{
              options: ['inline', 'blockType', 'list', 'history', 'image'],
              inline: { inDropdown: false, options: ['bold', 'italic', 'underline'] },
              list: { inDropdown: true, options: ['unordered', 'ordered'] },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              fontFamily: { inDropdown: true },
              blockType: { inDropdown: true, options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'] },
              // image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: false } },
              image: {
                // uploadCallback: uploadImageCallBack,
                previewImage: true,
                alt: { present: true, mandatory: false },
                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
              },
            }}
          />
        </div>

        {/* preview div */}
        <div
          className="w-full p-5 my-10 bg-white rounded-xl"
          dangerouslySetInnerHTML={createMarkup(convertedContent)}
        ></div>

        <div className="relative w-full pb-10 mb-10">
          {/* <Link to={Path.Profile}> */}
          <button
            onClick={handleCreateBlog}
            className="absolute right-0 w-32 p-4 m-4 mr-0 font-bold text-white bg-green-500 rounded-xl"
          >
            สร้าง
          </button>

          <Link to={Path.Profile}>
            <button className="absolute left-0 w-32 p-4 m-4 ml-0 font-bold text-white bg-red-400 rounded-xl">
              ยกเลิก
            </button>
          </Link>
        </div>
      </div>
    </Screen>
  )
}

export default CreateBlog
