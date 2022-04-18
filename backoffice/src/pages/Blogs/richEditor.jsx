import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const RichEditor = () => {
    const { id } = useParams();

    const [blogName, setBlogName] = useState('');
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );
    const [convertedContent, setConvertedContent] = useState('');

    const handleCreateBlog = async (e) => {
        const sendData = {
            topic: topicText,
            content: String(convertedContent),
            category: selectTag,
        };
        e.preventDefault();
        try {
            // const response = await axios.post('', String(convertedContent));
            console.log(
                'Response : ' + JSON.stringify(response.headers, null, 2),
            );
        } catch (e) {
            console.log(e);
        }
        console.log(sendData);
    };

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    };

    const convertContentToHTML = () => {
        const currentContentAsHTML = convertToHTML(
            editorState.getCurrentContent(),
        );
        setConvertedContent(currentContentAsHTML);
    };

    return (
        <div className="w-full p-5">
            <div className="p-4 shadow-md w-full">
                <p className="text-xl font-bold"> สร้างบทความใหม่</p>
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full p-4 shadow-md">
                        <p className="w-full my-4 text ">ชื่อบทความ</p>
                        <input
                            value={blogName}
                            onChange={(e) => setBlogName(e.target.value)}
                            className="w-full h-10 p-2"
                            placeholder="ธรรมะไดอารี่"
                        />
                    </div>
                    <div className="w-full p-4 shadow-md mt-4">
                        <div className="bg-white rounded-xl w-full">
                            <Editor
                                placeholder="วันนี้คุณทำดีแล้วหรือยัง..."
                                editorState={editorState}
                                onEditorStateChange={handleEditorChange}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                toolbar={{
                                    options: [
                                        'inline',
                                        'blockType',
                                        'list',
                                        'history',
                                    ],
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
                        <button className="right-0 w-32 p-4 m-4 mr-0 font-bold  bg-green-500 rounded-xl">
                            สร้าง
                        </button>

                        <button className="left-0 w-32 p-4 m-4 ml-0 font-bold  bg-red-400 rounded-xl">
                            ยกเลิก
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RichEditor;
