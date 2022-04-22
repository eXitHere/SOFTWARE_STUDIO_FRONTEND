import { useState, useEffect } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw } from 'draft-js'
import AvatarGroup from 'react-avatar-group'
import axios from 'pages/apiclient'

import likeImg from 'assets/images/like.png'
import unlikeImg from 'assets/images/unlike.png'

import { Detail } from 'types'

type ContentProps = Pick<
  Detail,
  | 'blog_id'
  | 'topic'
  | 'content'
  | 'category'
  | 'like_users'
  | 'like'
  | 'createdDate'
  | 'author_name'
  | 'author_id'
  | 'username'
>

export const Content = ({
  blog_id,
  topic,
  content,
  // category,
  like_users,
  like,
  createdDate,
  author_name,
}: // author_id,
// username
ContentProps) => {
  // const [clickLike, setClickLike] = useState<boolean>(true)
  // const [likePhoto, setLikePhoto] = useState<string>(unlikeImg)
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [likeData, setLikeData] = useState<number>(1)
  const [listLikeData, setListLikeData] = useState<string[]>([])

  const sendLike = async () => {
    const response = await axios.patch(
      `https://thammathip.exitguy.studio/api/Blog/like/${blog_id}`,
      {},
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    )

    const updateData = await axios(`https://thammathip.exitguy.studio/api/Blog/${blog_id}`)
    setLikeData(updateData.data.like)
    setListLikeData(updateData.data.like_users)
    console.log(updateData.data.like)
  }

  const handleLike = () => {
    // if (like_users.includes(username) == false) {
    //   console.log('Like')
    // } else {
    //   console.log('UnLike')
    // }
    sendLike()
  }

  useEffect(() => {
    if (content) {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(content))))
    }
  }, [content])

  useEffect(() => {
    setLikeData(like)
    setListLikeData(like_users)
    console.log(like_users)
  }, [])

  return (
    <div className="flex flex-col w-11/12 mt-20 lg:w-4/5 md:mt-28">
      <div className="p-4 mt-4 rounded-xl bg-primary-light ">
        <p className="p-4 text-3xl font-bold">{topic}</p>
        <div className="w-full p-5 mb-2 rounded-xl">
          <Editor
            editorState={editorState}
            toolbarClassName="hidden"
            // wrapperClassName="wrapperClassName"
            // editorClassName="editorClassName"
            readOnly={true}
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center p-1 py-1 md:p-4">
              {author_name ? (
                <AvatarGroup
                  avatars={[author_name]}
                  initialCharacters={1}
                  max={1}
                  size={50}
                  displayAllOnHover
                  shadow={1}
                />
              ) : null}
              <div className="ml-2">
                <p className="text-md">{author_name}</p>
                <p className="text-sm italic mt-1 opacity-70">{createdDate}</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button onClick={handleLike} className="w-12 h-8 mr-4 md:w-16 md:h-12">
                <img src={likeImg} className="w-full h-full" />
              </button>
              <p className="pr-1 text-lg font-bold md:pr-3 md:text-xl">{like}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
