import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

function PostStats({ data }) {
    return (
        <div className="p-4 shadow-md divide-y grid grid-cols-1">
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
                        <div className="text-blue-600 w-8">
                            {data.posts.sum}
                        </div>
                        <div className="">posts</div>
                    </div>
                    <div className="p-2 flex flex-row items-center">
                        <div
                            className="rounded-full w-5 h-5 m-2"
                            style={{
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            }}
                        ></div>
                        <div className="w-24">ผู้ใช้งานทั่วไป</div>
                        <div className="text-blue-600 w-8">
                            {data.users.user}
                        </div>
                        <div className="">users</div>
                    </div>
                </div>
                <div className="w-40 h-40">
                    <Bar
                        options={options}
                        data={{
                            labels: ['ทั้งหมด', 'แสดง', 'ซ่อน', 'ลบ'],
                            datasets: [
                                {
                                    label: 'ทดสอบ',
                                    data: [
                                        data.posts.sum,
                                        data.posts.normal,
                                        data.posts.hidden,
                                        data.posts.deleted,
                                    ],
                                    backgroundColor: [
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 159, 64, 1)',
                                        'rgba(255, 159, 64, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                    ],
                                },
                            ],
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default PostStats;
