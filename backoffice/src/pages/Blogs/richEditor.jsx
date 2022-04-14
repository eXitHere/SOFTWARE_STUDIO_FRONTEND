import { Link } from 'react-router-dom';
import { useState, MouseEvent } from 'react';
//import profile1 from 'assets/images/profile1.jpeg'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
// import axios, { AxiosResponse } from 'axios';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const RichEditor = () => {
    const [topicText, setTopicText] = useState('');
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );
    const [convertedContent, setConvertedContent] = useState('');
    const [selectTag, setSelectTag] = useState('');

    const handleChangeTopic = (e) => {
        setTopicText(e.target.value);
    };

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

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html),
        };
    };

    const handleChoose = (Category) => {
        setSelectTag(Category);
    };

    return (
        <div>
            <p className="mb-4 text-3xl font-bold text-white mt-28">
                {' '}
                สร้างกระทู้ใหม่
            </p>
            <div className="flex flex-col items-center justify-center w-11/12 h-full md:w-3/4">
                <p className="w-full my-4 text-xl text-white">ชื่อกระทู้</p>

                {/* preview div */}
                {/* <div dangerouslySetInnerHTML={createMarkup(convertedContent)}></div> */}
                <textarea
                    value={topicText}
                    onChange={handleChangeTopic}
                    rows={4}
                    cols={50}
                    className="w-full h-20 p-4 text-lg rounded-xl"
                />
                <p className="w-full my-4 text-xl text-white">เลือกหมวดหมู่</p>
                <p className="w-full my-4 text-xl text-white">เนื้อความ</p>
                <div className="w-full p-5 bg-white rounded-xl">
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        toolbar={{
                            options: ['inline', 'blockType', 'list', 'history'],
                            inline: {
                                inDropdown: false,
                                options: ['bold', 'italic', 'underline'],
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

                <div
                    className="relative w-full pb-10 mb-10"
                    onClick={handleCreateBlog}
                >
                    <button className="absolute right-0 w-32 p-4 m-4 mr-0 font-bold text-white bg-green-500 rounded-xl">
                        สร้าง
                    </button>

                    <button className="absolute left-0 w-32 p-4 m-4 ml-0 font-bold text-white bg-red-400 rounded-xl">
                        ยกเลิก
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RichEditor;
