import { useState } from 'react'

type Tag = {
  // onClick: () => void
  // onChange: () => void
  // handleLogout: () => void
}
const Tag = () => {

  return (
    <div className="flex flex-col w-4/5 p-5 mb-4 rounded-xl bg-primary-light">
      <p>หมวดหมู่ : </p>
      <div className="flex items-center justify-around text-lg">
        <button className="font-bold">ธรรมะคำสอน</button>
        <button className="font-bold">วัดและท่องเที่ยว</button>
        <button className="font-bold">พระสงค์</button>
      </div>
    </div>
  )
}

export default Tag
