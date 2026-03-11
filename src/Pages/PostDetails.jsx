import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Post from "../Components/Post/Post";
import { apiServices } from "../Services/Api";
import LoadingScreen from "../Components/LoadingScreen";

export default function PostDetails() {

  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [statusCode, setStatusCode] = useState(null)

  async function getPostDetails() {
    try {
      const { data } = await apiServices.getPostDetails(postId);
      setPost(data.post);
    } catch (error) {
      setStatusCode(error.status)
    } finally {
      setIsLoading(false)
    }
  }

  async function getPostComments() {
    const { data } = await apiServices.getPostComments(postId);
    setComments(data.comments);
  }

  useEffect(() => {
    getPostDetailsAndComments()
  }, [])

  function getPostDetailsAndComments() {
    getPostDetails()
    getPostComments()
  }

  return (
    <div className="max-w-3xl mx-auto py-10 grid gap-3">
      {
        isLoading ? <LoadingScreen /> :
          statusCode == 404 ? <NotFound title='Post Not Found' /> :
            <Post post={post} comments={comments} getPosts={getPostDetailsAndComments} />
      }
    </div>
  )
}
