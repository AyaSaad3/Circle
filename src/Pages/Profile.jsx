import { useContext, useState } from "react"
import { apiServices } from "../Services/Api"
import Post from "../Components/Post/Post"
import { authContext } from "../contexts/authContext";
import { useQuery } from "@tanstack/react-query";

export default function Profile() {

  const [addPhoto, setAddPhoto] = useState(false)
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [modelPreview, setModelPreview] = useState(null)
  const { userData, setUserData } = useContext(authContext);
  const [uploadLoading, setUploadLoading] = useState(false)

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
      const imgSrc = URL.createObjectURL(e.target.files[0])
      setModelPreview(imgSrc);
      setAddPhoto(true)
    }
  }

  function removeImage() {
    setModelPreview(null)
    setImage(null)
    setAddPhoto(false)
    document.getElementById("imageInput").value = null
  }

  async function handleSavePhoto(e) {
    e.preventDefault()
    setUploadLoading(true)
    const formData = new FormData();
    formData.append("photo", image);

    const response = await apiServices.UploadPhoto(formData);

    if (response.success) {
      setImagePreview(response.data?.photo)

      setUserData(d => ({
        ...d,
        photo: response.data?.photo
      }))

      setModelPreview(null)
      setImage(null)
      setAddPhoto(false)
    }
    setUploadLoading(false)
  }

  const { data: posts = [], isLoading, refetch } = useQuery({
    queryKey: ['posts', userData?._id],
    queryFn: () => apiServices.getUserPosts(userData?._id),
    select: (data) => data.data.posts
  })


  return (
    <div className="mx-auto max-w-7xl px-3 py-3.5">
      <div className="mb-5 overflow-hidden rounded-3xl border border-purple-50 bg-purple-50 shadow ">
        <div className="relative h-44 bg-linear-270 from-[#d2daff] from-10% to-[#6f79aa] to-60% sm:h-52 lg:h-60"></div>

        <div className="relative -mt-12 px-3 pb-5 sm:-mt-16 sm:px-8 sm:pb-6">
          <div className="rounded-3xl border border-purple-50 bg-white/92 p-5 backdrop-blur-xl sm:p-7">
            <div className="flex flex-col gap-6">
              <div className="min-w-0">
                <div className="flex items-center gap-4">
                  <div className="group/avatar relative shrink-0">
                    <button type="button" className="cursor-auto rounded-full">
                      <img className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md ring-2 ring-purple-200" src={imagePreview || userData?.photo} alt={userData?.name} />
                    </button>
                    <label className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-active text-white opacity-100 shadow-sm transition duration-200 hover:bg-[#6c7ad8] sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera" aria-hidden="true">
                        <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
                        <circle cx={12} cy={13} r={3} />
                      </svg>
                      <input accept="image/*" className="hidden" type="file" onChange={handleImageChange} id='imageInput' />
                    </label>
                  </div>
                  <div className="min-w-0 pb-1">
                    <h2 className="text-2xl text-slate-900 sm:text-4xl">{userData?.name}</h2>
                    <p className="mt-1 text-lg font-semibold text-text-light sm:text-xl">{userData?.username}</p>
                  </div>
                </div>
              </div>
              <div className="grid w-full grid-cols-3 gap-2">
                <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-text-light sm:text-xs">Followers</p>
                  <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{userData?.followersCount}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-text-light sm:text-xs">Following</p>
                  <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{userData?.followingCount}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-text-light sm:text-xs">Bookmarks</p>
                  <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{userData?.bookmarksCount}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-bold">About</h3>
                <div className="mt-3 space-y-2 text-sm text-text-dark">
                  <p className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail text-slate-500" aria-hidden="true">
                      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                      <rect x={2} y={4} width={20} height={16} rx={2} />
                    </svg>
                    {userData?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <button className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition bg-purple-400 text-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text" aria-hidden="true">
              <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
              <path d="M14 2v5a1 1 0 0 0 1 1h5" />
              <path d="M10 9H8" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
            </svg>
            My Posts
          </button>
          <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-active">
            {posts.length}
          </span>
        </div>

        {
          posts.length == 0 ? <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">No posts yet.</p>
            :
            posts.map((post) => <Post key={post._id} post={post} getPosts={refetch} />)
        }
      </div>

      {
        addPhoto && <div className="fixed inset-0 z-90 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-140 rounded-2xl border border-purple-50 bg-white p-4 shadow-xl sm:p-5">
            <div className="mx-auto w-full max-w-85 pb-1">
              <div className="h-80 w-[320px] overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
                <img alt="preview" className="h-full object-cover" src={modelPreview} />
              </div>
            </div>
            <div className="mt-5 flex items-center justify-center gap-2">
              <button onClick={removeImage} type="button" className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50">Cancel</button>
              <button onClick={handleSavePhoto} disabled={uploadLoading || !image} type="button" className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-bold text-white transition bg-linear-to-r from-purple-500 to-purple-300 hover:bg-active">
                {
                  isLoading ?
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-active"></div>
                    : "Save photo"
                }
              </button>
            </div>
          </div>
        </div>
      }

    </div>
  )
}
