import { useEffect } from 'react'
import { getMypost } from '../Service/postService'
import { useState } from 'react'
import StatusCodes from '../helpers/statusCodes'
import PostCard from './postCard'

const Home = () => {
  const [posts, setPosts] = useState(null)
  const fetchPost = async () => {
    try {
      const res = await getMypost()
      if (res.status === StatusCodes.OK) {
        setPosts(res.post)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchPost()
  }, [])

  useEffect(() => {
    console.log(posts)
  }, [posts])

  if (!posts) {
    return null
  }
  return (
    <div className=''>
      {
        posts.map((post) => {
          return (
            <div className='mt-10'>
              <PostCard key={post._id} post={post} />
            </div>
          )
        })
      }
    </div>
  )
}

export default Home