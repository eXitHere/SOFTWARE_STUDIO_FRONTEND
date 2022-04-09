import { Screen } from 'components/layouts/Screen'
import { Navbar } from 'components/common/Navbar'
import { ChangeEvent, useState } from 'react'

import profile1 from 'assets/images/profile1.jpeg'


  
export const CreateBlog = () => {
  const [topicText, setTopicText] = useState<string>('')
  const [contentText, setContentText] = useState<string>('')

  const handleChangeTopic = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTopicText(e.target.value)
  }

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContentText(e.target.value)
  }

  const handleCreateBlog = () => {
    console.log("create!")
    setContentText('')
  }
  
  return (
    <Screen>
      <Navbar isBoards={false} />
      <p className="mb-4 text-3xl font-bold text-white mt-28"> สร้างกระทู้ใหม่</p>
      <form className="flex flex-col items-center justify-center w-11/12 h-full md:w-3/4">
        <p className="w-full my-4 text-xl text-white">ชื่อกระทู้</p>
        <textarea
          value={topicText}
          onChange={handleChangeTopic}
          rows={4}
          cols={50}
          className="w-full h-20 p-4 text-lg rounded-xl"
        />
        <p className="w-full my-4 text-xl text-white">เนื้อหา</p>
        <textarea
          value={contentText}
          onChange={handleChangeContent}
          rows={4}
          cols={50}
          className="w-full p-4 text-lg h-88 rounded-xl"
        />
        <div className="relative w-full pb-10 mb-10">
          <button className="absolute right-0 w-32 p-4 m-4 mr-0 font-bold text-white bg-green-500 rounded-xl">
            สร้าง
          </button>
        </div>
      </form>
    </Screen>
  )
}

export default CreateBlog
