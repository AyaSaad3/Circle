import { Button } from "@heroui/react";

export default function PostBody({ post, setIsInEditMode, isInEditMode, postBody, setPostBody, isUpdating, updatePost }) {
    return (
        <>
            {
                isInEditMode ?
                    <div className="mt-3">
                        <textarea value={postBody} onChange={(e) => setPostBody(e.target.value)} maxLength="5000" className="min-h-27.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-[#1877f2]/20 focus:border-[#1877f2] focus:ring-2"></textarea>
                        <div className="mt-2 flex items-center justify-end gap-2">
                            <Button isLoading={isUpdating} onPress={updatePost} className="rounded-full bg-active py-1.5 px-6 h-auto min-w-0 text-xs font-bold text-white hover:bg-[#6a78d3]">
                                Save
                            </Button>
                            <button onClick={() => { setIsInEditMode(false); setPostBody(post.body) }} className="rounded-full border border-purple-200 bg-white px-3 py-1.5 text-xs font-bold text-text-dark hover:bg-purple-50">
                                Cancel
                            </button>
                        </div>
                    </div>
                    :
                    post.body && <h2 className="text-xl font-medium dark:text-white">
                        {post.body}
                    </h2>
            }

            <div className="py-4">
                <div className=" mb-1 ">
                    <img className="w-full rounded-lg" src={post.image} />
                </div>
            </div>
        </>
    )
}
