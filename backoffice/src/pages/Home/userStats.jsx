import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Loader from '../../components/loader';

ChartJS.register(ArcElement, Tooltip, Legend);

function UserStats({ data }) {
    return (
        <div className="p-4 shadow-md divide-y grid grid-cols-1">
            {data ? (
                <div>
                    <div className="mb-4">จำนวนผู้ใช้งาน</div>
                    <div className="flex flex-row justify-evenly p-4">
                        <div className="flex flex-col justify-center">
                            <div className="p-2 flex flex-row items-center">
                                <div
                                    className="rounded-full w-5 h-5 m-2"
                                    style={{
                                        backgroundColor:
                                            'rgba(255, 159, 64, 0.2)',
                                    }}
                                ></div>
                                <div className="w-24">ผู้ดูแลระบบ</div>
                                <div className="text-blue-600 w-8">
                                    {data.users?.admin}
                                </div>
                                <div className="">users</div>
                            </div>
                            <div className="p-2 flex flex-row items-center">
                                <div
                                    className="rounded-full w-5 h-5 m-2"
                                    style={{
                                        backgroundColor:
                                            'rgba(54, 162, 235, 0.2)',
                                    }}
                                ></div>
                                <div className="w-24">ผู้ใช้งานทั่วไป</div>
                                <div className="text-blue-600 w-8">
                                    {data.users?.user}
                                </div>
                                <div className="">users</div>
                            </div>
                        </div>
                        <div className="w-40 h-40">
                            <Doughnut
                                data={{
                                    labels: ['ผู้ดูแลระบบ', 'ผู้ใช้งานทั่วไป'],
                                    datasets: [
                                        {
                                            data: [
                                                data.users?.admin,
                                                data.users?.user,
                                            ],
                                            backgroundColor: [
                                                'rgba(54, 162, 235, 0.2)',
                                                'rgba(255, 159, 64, 0.2)',
                                            ],
                                            borderColor: [
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 159, 64, 1)',
                                            ],
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
    );
}

export default UserStats;
