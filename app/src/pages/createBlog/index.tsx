import { Screen } from 'components/layouts/Screen'
import { Navbar } from 'components/common/Navbar'
import { Footer } from 'components/common/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { ChangeEvent, useState, useEffect } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import jwt_decode from 'jwt-decode'
import axios from '../apiclient'

import { Path } from 'routes'
import { ChooseCategory } from 'components/common/ChooseCategory'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export const CreateBlog = () => {
  const [topicText, setTopicText] = useState<string>('')

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [selectTag, setSelectTag] = useState<string[]>(['คำสอน'])
  const [decoded, setDecoded] = useState<any>({})
  const navigateTo = useNavigate()

  const handleChangeTopic = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTopicText(e.target.value)
  }

  const handleCreateBlog = async (e: { preventDefault: () => void }) => {
    const content = convertContentToRaw()
    console.log(content)
    const sendData = {
      topic: topicText,
      content: JSON.stringify(content),
      category: selectTag,
    }
    e.preventDefault()
    try {
      if (sendData.topic == '' || sendData.category.length == 0) {
        alert('กรุณากรอกข้อมูลให้ครบทุกช่อง')
      } else {
        const response = await axios.post('https://thammathip.exitguy.studio/api/Blog/create', sendData, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        console.log(response)
        return navigateTo(Path.Profile)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const convertContentToRaw = () => {
    const content = convertToRaw(editorState.getCurrentContent())
    return content
  }

  const getFileBase64 = (file: File, callback: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => callback(reader.result)
  }

  const imageUploadCallback = (file: File) =>
    new Promise((resolve) => getFileBase64(file, (data: any) => resolve({ data: { link: data } })))

  const handleChoose = (Category: string) => {
    if (selectTag.includes(Category) == false) {
      setSelectTag([Category, ...selectTag])
    } else {
      const newArray = selectTag.filter(function (f) {
        return f !== Category
      })
      setSelectTag([...newArray])
    }
  }

  useEffect(() => {
    if (window.localStorage.getItem('accessToken') == null) {
      window.localStorage.setItem('auth', 'NO')
    } else {
      const token = window.localStorage.getItem('accessToken')
      setDecoded(jwt_decode(token || '{}'))
    }
  }, [])

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
            placeholder="วันนี้คุณทำดีแล้วหรือยัง..."
            editorState={editorState}
            onEditorStateChange={(e) => setEditorState(e)}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            toolbar={{
              options: ['inline', 'blockType', 'list', 'history', 'image'],
              inline: {
                inDropdown: false,
                options: ['bold', 'italic', 'underline'],
              },
              list: {
                inDropdown: true,
                options: ['unordered', 'ordered'],
              },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              fontFamily: { inDropdown: true },
              image: {
                uploadCallback: imageUploadCallback,
                previewImage: true,
              },
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
              blockType: {
                inDropdown: true,
                options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
              },
            }}
          />
        </div>

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
      <Footer />
    </Screen>
  )
}

export default CreateBlog
