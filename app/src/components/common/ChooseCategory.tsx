import { useContext, useState } from 'react'
import book from 'assets/images/book.png'
import monk from 'assets/images/monk.png'
import temple from 'assets/images/temple.png'
import candle from 'assets/images/candle.png'
import calendar from 'assets/images/calendar.png'
import { Category } from 'types'
import classNames from 'classnames'
import { ChooseCat } from 'types'

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

type CreateTagProps = Pick<ChooseCat, 'selectTag' | 'handleChoose'>
export const ChooseCategory = ({ selectTag, handleChoose }: CreateTagProps) => {
  return (
    <div className="flex flex-col w-full p-2 mt-6 mb-4 bg-white rounded-xl">
      <div className="flex items-center justify-around w-full text-lg">
        {dataCategory.map((data) => {
          return (
            <button
              key={data.categoryID}
              onClick={() => handleChoose(data.categoryName)}
              className={classNames(
                'flex flex-col items-center justify-center w-16 h-20 md:w-32 md:h-32 mt-2 font-bold',
                {
                  'bg-yellow-300 rounded-lg': selectTag.includes(data.categoryName),
                },
              )}
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
