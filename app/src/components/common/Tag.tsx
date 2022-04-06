import book from 'assets/images/book.png'
import monk from 'assets/images/monk.png'
import temple from 'assets/images/temple.png'
import candle from 'assets/images/candle.png'
import calendar from 'assets/images/calendar.png'

// type Tag = {
//   onClick: () => void
//   handleLogout: () => void
//   handleCategory: (catName: string) => void
// }

export const Tag = () => {
  const handleCategory = (catName: string) => {
    console.log(catName)
  }

  return (
    <div className="flex flex-col w-4/5 p-2 mb-4 mt-28 rounded-xl bg-primary-light">
      <p className="pl-2 font-semibold">หมวดหมู่ : </p>
      <div className="flex items-center justify-around text-lg">
        <button
          onClick={() => handleCategory('ธรรมะคำสอน')}
          className="flex flex-col items-center justify-center w-32 h-32 font-bold"
        >
          <img className="w-20 h-20" src={book} />
          <p>ธรรมะคำสอน</p>
        </button>
        <button
          onClick={() => handleCategory('ท่องเที่ยว')}
          className="flex flex-col items-center justify-center w-32 h-32 font-bold"
        >
          <img className="w-20 h-20" src={temple} />
          <p>ท่องเที่ยว</p>
        </button>
        <button
          onClick={() => handleCategory('พระสงฆ์')}
          className="flex flex-col items-center justify-center w-32 h-32 font-bold"
        >
          <img className="w-20 h-20" src={monk} />
          <p>พระสงฆ์</p>
        </button>
        <button
          onClick={() => handleCategory('ความเชื่อ')}
          className="flex flex-col items-center justify-center w-32 h-32 font-bold"
        >
          <img className="w-20 h-20" src={candle} />
          <p>ความเชื่อ</p>
        </button>
        <button
          onClick={() => handleCategory('วันสำคัญ')}
          className="flex flex-col items-center justify-center w-32 h-32 font-bold"
        >
          <img className="w-20 h-20" src={calendar} />
          <p>วันสำคัญ</p>
        </button>
      </div>
    </div>
  )
}
