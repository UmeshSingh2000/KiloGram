import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import StatusCodes from '../helpers/statusCodes'
import PostCard from './postCard'
import { fetchPost } from '../Redux/Features/postSlice'

const Home = () => {
  // const [posts, setPosts] = useState(null)
  const { posts } = useSelector((state) => state.posts)
  const dispatch = useDispatch()

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPost())
    }
  }, [posts])



  if (posts.length === 0) {
    return <p className="text-center mt-10">No posts yet.</p>
  }
  return (
    <div className=''>
      {
        posts.map((post) => {
          return (
            <div className='mt-10' key={post._id}>
              <PostCard post={post} />
            </div>
          )
        })
      }
    </div>
  )
}

export default Home