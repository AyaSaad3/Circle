import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import CreateCommentInput from "../Comment/CreateCommentInput";
import ShowMoreBtn from "../Comment/ShowMoreBtn";
import Comment from "../Comment/Comment";
import { apiServices } from "../../Services/Api";
import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";
import { queryClient } from "../../App";

export default function Post({ post, comments }) {

    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isInEditMode, setIsInEditMode] = useState(false)
    const [postBody, setPostBody] = useState(post.body)
    const [isUpdating, setIsUpdating] = useState(false)

    async function addComment(formData) {
        const response = await apiServices.createComment(post._id, formData)
        if (response.success) {
            queryClient.invalidateQueries(["posts"])
        }
    }

    async function deleteComment(commentId) {
        setLoading(true)
        const response = await apiServices.deleteComment(post._id, commentId)
        if (response.success) {
            queryClient.invalidateQueries(["posts"])
        }
        setLoading(false)
    }

    async function deletePost() {
        const response = await apiServices.deletePost(post._id)
        if (response.success) {
            queryClient.invalidateQueries(["posts"])
        }
    }

    async function updatePost() {
        setIsUpdating(true)
        const formData = new FormData()
        formData.set("body", postBody)

        await apiServices.updatePost(post._id, formData)

        await queryClient.invalidateQueries(["posts"])
        setIsInEditMode(false)
        setIsUpdating(false)
    }

    return (
        post && <article className="mb-4 break-inside p-6 rounded-xl bg-white flex flex-col bg-clip-border w-full shadow">
            <PostHeader userName={post.user.name} userPhoto={post.user.photo} date={post.createdAt} creatorId={post.user._id} onOpen={onOpen} setIsInEditMode={setIsInEditMode} />
            <PostBody post={post} isInEditMode={isInEditMode} setIsInEditMode={setIsInEditMode} postBody={postBody} setPostBody={setPostBody} isUpdating={isUpdating} updatePost={updatePost} />
            <PostFooter likesCount={post.likesCount} commentsCount={post.commentsCount} />

            <div className="h-px mb-5 bg-purple-600"></div>

            <div className="pb-5">
                {
                    comments ? comments.map((comment) => <Comment key={comment._id} comment={comment} deleteComment={deleteComment} postCreatorId={post.user._id} loading={loading} />)
                        :
                        post.topComment && <Comment comment={post.topComment} deleteComment={deleteComment} postCreatorId={post.user._id} loading={loading} />
                }
            </div>

            {!comments && <ShowMoreBtn postId={post._id} />}
            <CreateCommentInput addComment={addComment} postId={post._id} />

            <>
                <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 border-b border-slate-200">Confirm action</ModalHeader>
                                <ModalBody>
                                    <div className="flex items-start gap-3 p-4">
                                        <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-triangle-alert" aria-hidden="true">
                                                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                                                <path d="M12 9v4"></path>
                                                <path d="M12 17h.01"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-bold text-slate-900">Delete this post?</h5>
                                            <p className="mt-1 text-sm text-slate-600">This post will be permanently removed from your profile and feed.</p>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter className="border-t border-slate-200">
                                    <Button variant="flat" onPress={onClose} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
                                        Cancel
                                    </Button>
                                    <Button onClick={deletePost} onPress={onClose} className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700">
                                        Delete Post
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
        </article>


    )
}
