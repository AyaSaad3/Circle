import { useContext, useEffect, useState } from "react";
import userAvatar from "../../assets/default-profile.png";
import { timeAgo } from "../../Helper/Time";
import { authContext } from "../../contexts/authContext";
import { apiServices } from "../../Services/Api";
import { Button } from "@heroui/react";
import { queryClient } from "../../App";

export default function Comment({ comment, deleteComment, postCreatorId, loadingComment }) {

    const [time, setTime] = useState(timeAgo(comment.createdAt));
    const { userData } = useContext(authContext)
    const [isInEditMode, setIsInEditMode] = useState(false)
    const [commentContent, setCommentContent] = useState(comment.content)
    const [isUpdating, setIsUpdating] = useState(false)

    async function updateComment() {
        setIsUpdating(true)
        const formData = new FormData()
        formData.set("content", commentContent)

        await apiServices.updateComment(comment.post, comment._id, formData)

        await queryClient.invalidateQueries(["posts"])
        await queryClient.invalidateQueries(["post-comments", comment.post])
        await queryClient.invalidateQueries(["post", comment.post])
        setIsInEditMode(false)
        setIsUpdating(false)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(timeAgo(comment.createdAt));
        }, 60000);

        return () => clearInterval(interval);
    }, [comment.createdAt]);

    return (
        <div className="media flex pt-4">
            <a className="mr-4" href="#">
                <img onError={(e) => e.target.src = userAvatar} className="rounded-full max-w-none w-12 h-12" src={comment.commentCreator.photo} />
            </a>
            <div className="media-body">
                <div className="flex items-center justify-between">
                    <a className="inline-block text-base font-bold mr-2" href="#">{comment.commentCreator.name}</a>
                    <span className="text-purple-600">{time}</span>
                </div>

                {
                    isInEditMode ?
                        <div className="mt-2 flex items-center gap-2">
                            <input value={commentContent} onChange={(e) => setCommentContent(e.target.value)} className="w-full rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm" />
                            <Button isLoading={isUpdating} onPress={updateComment} className="rounded-full bg-active py-1.5 px-6 h-auto min-w-0 text-xs font-bold text-white hover:bg-[#6a78d3]">
                                Save
                            </Button>
                            <button onClick={() => { setIsInEditMode(false); setCommentContent(comment.content) }} className="rounded-full border border-purple-200 bg-white px-3 py-1.5 text-xs font-bold text-text-dark hover:bg-purple-50">
                                Cancel
                            </button>
                        </div>
                        :
                        comment.content && <p>{comment.content}</p>
                }
                {comment.image && <img className="mt-2 max-h-52 w-full rounded-lg object-cover" src={comment.image} alt="Comment"></img>}

                <div className="flex items-center">
                    <a className="inline-flex items-center py-2 " href="#">
                        <span className="mr-0.5">
                            <svg className="fill-purple-600 dark:fill-rose-400" style={{ width: 15, height: 15 }} viewBox="0 0 24 24">
                                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                                </path>
                            </svg>
                        </span>
                        <span className="text-small font-bold text-purple-600 mr-1">{comment.likes.length}</span>
                    </a>
                    {userData?._id == comment.commentCreator._id && <button onClick={() => setIsInEditMode(true)} className="py-2 px-2 font-medium hover:bg-purple-50 rounded-lg text-small text-purple-600">
                        Edit
                    </button>}
                    {(userData?._id == comment.commentCreator._id || userData._id == postCreatorId) && <button onClick={() => deleteComment(comment._id)} className="py-2 px-2 font-medium hover:bg-purple-50 rounded-lg text-small text-purple-600">
                        {
                            loadingComment == comment._id ? < div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-purple-600"></div>
                                :
                                "Delete"
                        }
                    </button>}
                </div>

            </div>
        </div>
    )
}
