import React from 'react';

function Announcement() {
    return (
        <div className="w-full p-5">
            <div className="p-4 shadow-md">
                <div className="text-xl font-bold mb-4">สร้างประกาศ</div>
                <textarea
                    className="p-2 w-full"
                    placeholder="สวัสดีครับท่านสมาชิก"
                ></textarea>
                <div className="flex justify-end w-full text-white space-x-2">
                    <button className="right-0 w-32 p-4 m-4 mr-0 font-bold  bg-green-500 rounded-xl">
                        สร้าง
                    </button>

                    <button className="left-0 w-32 p-4 m-4 ml-0 font-bold  bg-red-400 rounded-xl">
                        ยกเลิก
                    </button>
                </div>
            </div>
        </div>
    );
}

export { Announcement };
