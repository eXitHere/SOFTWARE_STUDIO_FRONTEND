import React, { useEffect, useState } from 'react';
import {
    EditorState,
    ContentState,
    convertToRaw,
    convertFromRaw,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { createAnnounce, getAnnounce } from '../../api/announce';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function Announcement() {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );

    const contentIsEmpty = () => {
        const htmlString = convertContentToHTML();
        return htmlString.length === 7;
    };

    const handleCreateBlog = async (e) => {
        const htmlString = convertContentToHTML();
        console.log(htmlString);
        if (contentIsEmpty()) {
            console.log('empty!');
        } else {
            await createAnnounce(htmlString);
        }
    };

    useEffect(async () => {
        const { content } = await getAnnounce();
        setEditorState(
            EditorState.createWithContent(convertFromRaw(JSON.parse(content))),
        );
        // console.log(content);
    }, []);

    const handleClearState = () => {
        if (contentIsEmpty()) {
            return;
        }
        Swal.fire({
            title: 'ยืนยันการเคลียร์ข้อความ',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'ยืนยัน',
            denyButtonText: `ยกเลิก`,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const tmpEditorState = EditorState.push(
                    editorState,
                    ContentState.createFromText(''),
                );
                setEditorState(tmpEditorState);
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    confirmButtonText: 'Close',
                });
            }
        });
    };

    const handleEditorChange = (state) => {
        setEditorState(state);
        // convertContentToHTML();
    };

    const getFileBase64 = (file, callback) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callback(reader.result);
        reader.onerror = (error) => {};
    };

    const imageUploadCallback = (file) =>
        new Promise((resolve, reject) =>
            getFileBase64(file, (data) => resolve({ data: { link: data } })),
        );

    const convertContentToHTML = () => {
        const currentContentAsHTML = convertToRaw(
            editorState.getCurrentContent(),
        );
        return currentContentAsHTML;
    };

    return (
        <div className="w-full p-5">
            <div className="p-4 shadow-md w-full">
                <p className="text-xl font-bold"> สร้างประกาศใหม่ </p>
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full p-4 shadow-md mt-4">
                        <div className="bg-white rounded-xl w-full">
                            <Editor
                                placeholder="วันนี้คุณทำดีแล้วหรือยัง..."
                                editorState={editorState}
                                onEditorStateChange={handleEditorChange}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                readOnly={true}
                                toolbar={{
                                    // options: [
                                    //     'inline',
                                    //     'blockType',
                                    //     'list',
                                    //     'history',
                                    //     'image',
                                    // ],
                                    inline: {
                                        inDropdown: false,
                                        options: [
                                            'bold',
                                            'italic',
                                            'underline',
                                        ],
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
                                    inputAccept:
                                        'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                    blockType: {
                                        inDropdown: true,
                                        options: [
                                            'Normal',
                                            'H1',
                                            'H2',
                                            'H3',
                                            'H4',
                                            'H5',
                                            'H6',
                                        ],
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end w-full text-white space-x-2">
                        <button
                            className="right-0 w-32 p-4 m-4 mr-0 font-bold  bg-green-500 rounded-xl disabled:bg-gray-300"
                            onClick={(e) => handleCreateBlog(e)}
                            disabled={contentIsEmpty() === true}
                        >
                            สร้าง
                        </button>

                        <button
                            className="left-0 w-32 p-4 m-4 ml-0 font-bold  bg-red-400 rounded-xl disabled:bg-gray-300"
                            onClick={(e) => handleClearState(e)}
                            disabled={contentIsEmpty() === true}
                        >
                            ยกเลิก
                        </button>
                    </div>
                </div>
                <div>Hello World</div>
            </div>
        </div>
    );
}

export { Announcement };
