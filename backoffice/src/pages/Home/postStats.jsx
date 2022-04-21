import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import Loader from '../../components/loader'

ChartJS.register(ArcElement, Tooltip, Legend)

function getRandomColor() {
  const tmp = `rgba(${Math.floor(Math.random() * 1000) % 255}, ${Math.floor(Math.random() * 1000) % 255}, ${
    Math.floor(Math.random() * 1000) % 255
  }, 0.2)`
  return tmp
}

function PostStats({ data }) {
  const [colorList, setColorList] = useState([])

  useEffect(() => {
    if (data?.posts) {
      const colors = Object.keys(data.posts).map((e) => getRandomColor())
      setColorList(colors)
    }
  }, [data])

  return (
    <div className="p-4 shadow-md divide-y grid grid-cols-1">
      {data ? (
        <div>
          <div className="mb-4">จำนวนโพสทั้งหมด</div>
          <div className="flex flex-row justify-evenly p-4">
            <div className="flex flex-col justify-center">
              <div className="p-2 flex flex-row items-center">
                <div
                  className="rounded-full w-5 h-5 m-2"
                  style={{
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                  }}
                ></div>
                <div className="w-24">โพสทั้งหมด</div>
                <div className="text-blue-600 w-8">{data?.postsCount}</div>
                <div className="">posts</div>
              </div>
            </div>
            <div className="w-82 h-82">
              <Doughnut
                data={{
                  labels: Object.keys(data.posts),
                  datasets: [
                    {
                      data: Object.values(data.posts).map((e) => e.length),
                      backgroundColor: colorList,
                      borderColor: colorList,
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default PostStats
