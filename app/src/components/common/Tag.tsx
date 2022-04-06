import { useState, useEffect } from 'react'
import book from 'assets/images/book.png'
import monk from 'assets/images/monk.png'
import temple from 'assets/images/temple.png'
import candle from 'assets/images/candle.png'
import calendar from 'assets/images/calendar.png'
import {Category} from 'types'
// type Tag = {
//   onClick: () => void
//   handleLogout: () => void
//   handleCategory: (catName: string) => void
// }

const dataCategory: Category[] = [
  {
    categoryID: '1',
    categoryName: 'คำสอน',
    logo: book,
  },
  {
    categoryID: '2',
    categoryName: 'ท่องเที่ยว',
    logo: temple,
  },
  {
    categoryID: '3',
    categoryName: 'พระสงฆ์',
    logo: monk,
  },
  {
    categoryID: '4',
    categoryName: 'ความเชื่อ',
    logo: candle,
  },
  {
    categoryID: '5',
    categoryName: 'วันสำคัญ',
    logo: calendar,
  },
]

export const Tag = () => {
  const [category, setCategory] = useState('คำสอน')
  const handleCategory = (catName: string) => {
    setCategory(catName)
  }

  return (
    
  <div className="flex flex-col p-2 mt-2 mb-4 w-80 md:w-3/5 lg:w-4/5 md:mt-28 rounded-xl bg-primary-light">
      <p className="pl-2 font-semibold">หมวดหมู่ : </p>
      <div className="flex items-center justify-around text-lg">
        {dataCategory.map((data) => {
          return (
            <button
              key={data.categoryID}
              onClick={() => handleCategory(data.categoryName)}
              className={
                category === data.categoryName
                  ? 'flex flex-col items-center justify-center w-16 h-20 md:w-32 md:h-32 mt-2 font-bold bg-yellow-300 rounded-lg'
                  : 'flex flex-col items-center justify-center w-16 h-20 md:w-32 md:h-32 mt-2 font-bold '
              }
            >
              <img className="w-12 h-12 md:w-20 md:h-20" src={data.logo} />
              <p className="text-sm md:text-lg">{data.categoryName}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

