import { useParams } from "react-router-dom"
import Post from "../Components/Post/Post";
import { apiServices } from "../Services/Api";
import LoadingScreen from "../Components/LoadingScreen";
import { useQuery } from "@tanstack/react-query";

export default function PostDetails() {

  const { postId } = useParams()

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => apiServices.getPostDetails(postId),
    select: (data) => data.data.post
  })

  const { data: comments } = useQuery({
    queryKey: ["postComments", postId],
    queryFn: () => apiServices.getPostComments(postId),
    select: (data) => data.data.comments
  })

  return (
    <div className="max-w-3xl mx-auto py-10 grid gap-3">
      {
        isLoading ? <LoadingScreen /> :
          error?.response?.status == 404 ? <NotFound title='Post Not Found' /> :
            <Post post={post} comments={comments} />
      }
    </div>
  )
}
