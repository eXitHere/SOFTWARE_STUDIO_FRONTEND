import { useState, useEffect, useContext } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw } from 'draft-js'
import AvatarGroup from 'react-avatar-group'
import axios from 'pages/apiclient'

import { UpdateContext } from 'contexts/store'

import likeImg from 'assets/images/like.png'
import unlikeImg from 'assets/images/unlike.png'
import likeHover from 'assets/images/likeHover.png'
import unlikeHover from 'assets/images/unlikeHover.png'
import tagIcon from 'assets/icons/tagIcon.png'

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
  category,
  like_users,
  like,
  createdDate,
  author_name,
  username,
}: 

ContentProps) => {
  const updateContext = useContext(UpdateContext)
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
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

    if (like_users.includes(username) == false) {
      console.log('Like')
      updateContext.setUpdate(`LIKE BLOG ${blog_id}`)
    } else {
      console.log('UnLike')
      updateContext.setUpdate(`UNLIKE BLOG ${blog_id}`)
    }
  }

  const handleLike = () => {
    sendLike()
  }

  useEffect(() => {
    if (content) {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(content))))
    }
  }, [content])

  return (
    <div className="flex flex-col w-11/12 mt-36 lg:w-4/5 md:mt-28 drop-shadow-md">
      <div className="p-4 mt-4 rounded-xl bg-primary-light ">
        <p className="p-4 text-3xl font-bold">{topic}</p>
        <div className="flex flex-row items-center px-4 my-1 mt-2">
          <img src={tagIcon} className="w-6 h-6 mr-2" />
          <p className="px-2">{category?.join(', ')}</p>
        </div>
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
                <p className="mt-1 text-sm italic opacity-70">{createdDate}</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              {window.localStorage.getItem('auth') == 'YES' ? (
                <button onClick={handleLike} className="h-10 w-14 md:w-20 md:h-12 drop-shadow-md">
                  {like_users?.includes(username) ? (
                    <img
                      src={likeImg}
                      onMouseOver={(e) => (e.currentTarget.src = likeHover)}
                      onMouseOut={(e) => (e.currentTarget.src = likeImg)}
                      className="w-full h-full"
                    />
                  ) : (
                    <img
                      src={unlikeImg}
                      onMouseOver={(e) => (e.currentTarget.src = unlikeHover)}
                      onMouseOut={(e) => (e.currentTarget.src = unlikeImg)}
                      className="w-full h-full"
                    />
                  )}
                </button>
              ) : (
                <button className="w-12 h-8 md:w-16 md:h-12">
                  <img src={likeImg} className="w-full h-full" />
                </button>
              )}
              <p className="px-1 text-lg font-bold md:px-3 md:text-xl">{like}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
