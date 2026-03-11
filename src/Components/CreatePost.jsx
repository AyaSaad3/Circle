import { useRef, useState } from "react"
import { apiServices } from "../Services/Api"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../App"

export default function CreatePost() {

    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const fileInput = useRef()

    const { mutate, isPending } = useMutation({
        mutationFn: (e) => handleSubmit(e),
        onSuccess: () => {
            removeImage()
            setCaption("")
            queryClient.invalidateQueries(["posts"])
        },
        onError: (error) => {
            console.log(error);
        }
    })

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

    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()

        if (caption) {
            formData.set("body", caption)
        }
        if (image) {
            formData.append("image", image)
        }

        return await apiServices.createPost(formData)
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <form onSubmit={mutate}>
                <div className="relative">
                    <textarea value={caption} onChange={(e) => setCaption(e.target.value)} rows="3" placeholder="What's on your mind?" className="w-full rounded-2xl border border-purple-200 bg-purple-50 px-4 py-3 text-[17px] text-text-dark outline-none transition focus:border-purple-500 focus:bg-white" />
                </div>

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

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-purple-600 pt-3">
                    <div className="relative flex items-center gap-2">
                        <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-text-dark transition hover:bg-purple-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image text-active" aria-hidden="true">
                                <rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
                                <circle cx={9} cy={9} r={2} />
                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                            </svg>
                            <span>Photo</span>
                            <input className="hidden" type="file" accept="image/*" disabled={isPending} onChange={handleImageChange} ref={fileInput} />
                        </label>
                    </div>
                    <div className="flex items-center gap-3">
                        <button type="submit" disabled={isPending || (!caption.trim() && !image)} className="disabled:cursor-not-allowed flex items-center gap-2 rounded-lg bg-linear-to-r from-purple-500 to-purple-300 hover:bg-active px-5 py-2 text-sm font-extrabold text-white shadow-sm transition-colors">
                            {
                                isPending ?
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-active"></div>
                                    :
                                    <>
                                        Post
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send" aria-hidden="true">
                                            <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                                            <path d="m21.854 2.147-10.94 10.939" />
                                        </svg>
                                    </>
                            }

                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
