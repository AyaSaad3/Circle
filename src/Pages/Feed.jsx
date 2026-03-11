import Post from "../Components/Post/Post";
import { apiServices } from "../Services/Api";
import LoadingScreen from "../Components/LoadingScreen";
import CreatePost from "../Components/CreatePost";
import { useQuery } from "@tanstack/react-query";

export default function Feed() {

  const { data: posts = [], isLoading, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: () => apiServices.getPosts(),
    select: (data) => data.data.data.posts,
  })

  return (
    <div className="max-w-3xl mx-auto py-10 grid gap-3">
      {
        isFetching && !isLoading && <div className="flex justify-center items-center">< div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-active"></div></div>
      }
      <CreatePost />
      <div className="max-w-3xl">
        {
          isLoading
            ? <LoadingScreen />
            : posts.map((post) => <Post key={post._id} post={post}/>)
        }
      </div>
    </div>
  )
}