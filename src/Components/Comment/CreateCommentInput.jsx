import { useRef, useState } from "react"

export default function CreateCommentInput({ addComment }) {

    const [commentContent, setCommentContent] = useState("")
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const fileInput = useRef()

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            const imgSrc = URL.createObjectURL(e.target.files[0])
            setImagePreview(imgSrc);
        }
    }

    function removeImage() {
        setImagePreview(null)
        setImage(null)
        fileInput.current.value = null
    }

    async function handleCreateComment() {
        setLoading(true)
        const formData = new FormData()
        if (commentContent) {
            formData.set("content", commentContent)
        }
        if (image) {
            formData.append("image", image)
        }

        await addComment(formData)
        setCommentContent("")
        removeImage()
        setLoading(false)
    }

    return (
        <div className="relative">
            <input value={commentContent} onChange={(e) => setCommentContent(e.target.value)} className="pt-2 pb-2 pl-3 w-full h-11 border border-purple-200 bg-purple-50 rounded-lg placeholder:text-text-dark font-medium pr-20 focus:outline-none focus:border-purple-600" type="text" placeholder="Write a comment" />
            <span className="flex absolute right-3 top-4.25 -mt-3 items-center gap-3">
                <label className="flex cursor-pointer items-center rounded-lg py-2 text-sm font-semibold text-text-dark transition hover:bg-purple-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image text-active" aria-hidden="true">
                        <rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
                        <circle cx={9} cy={9} r={2} />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                    <input className="hidden" type="file" accept="image/*" disabled={loading} onChange={handleImageChange} ref={fileInput} />
                </label>

                <button onClick={handleCreateComment} className="inline-flex h-8 w-8 rounded-full bg-active items-center justify-center text-white shadow-sm transition hover:bg-purple-600 disabled:cursor-not-allowed" disabled={loading || (!commentContent.trim() && !image)}>
                    {
                        loading ?
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                            :
                            <svg className="lucide lucide-send-horizontal" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"></path>
                                <path d="M6 12h16"></path>
                            </svg>
                    }
                </button>
            </span>

            {
                imagePreview && (
                    <div className="relative mt-2">
                        <img className="max-h-60 w-full rounded-lg object-cover" src={imagePreview} alt="Preview" />
                        <button onClick={removeImage} className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x" aria-hidden="true">
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>
                )
            }
        </div>
    )
}
