import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import userAvatar from "../../assets/default-profile.png";
import { useContext } from "react";
import { authContext } from "../../contexts/authContext";

export default function PostHeader({ userName, userPhoto, date, creatorId, onOpen, setIsInEditMode }) {

    const { userData } = useContext(authContext)

    return (
        <div className="flex pb-6 items-center justify-between">
            <div className="flex">
                <a className="inline-block mr-4" href="#">
                    <img onError={(e) => e.target.src = userAvatar} className="rounded-full max-w-none w-12 h-12" src={userPhoto} />
                </a>
                <div className="flex flex-col">
                    <div>
                        <a className="inline-block text-lg font-bold dark:text-white" href="#">{userName}</a>
                    </div>
                    <div className="text-slate-500">
                        {new Date(date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </div>
                </div>
            </div>
            {
                creatorId == userData._id && <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <button className="mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu text-slate-500" aria-hidden="true">
                                <path d="M4 5h16"></path>
                                <path d="M4 12h16"></path>
                                <path d="M4 19h16"></path>
                            </svg>
                        </button>
                    </DropdownTrigger>

                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="edit" className="gap-2 text-text-dark data-[hover=true]:text-text-dark data-[hover=true]:bg-purple-100">
                            <Button onClick={() => setIsInEditMode(true)} className="flex w-full items-center gap-2 rounded-lg text-sm font-semibold bg-transparent text-text-dark justify-start h-auto px-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit icon-font-light iw-16 ih-16">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                Edit Post
                            </Button>
                        </DropdownItem>
                        <DropdownItem key="delete" className="gap-2 text-text-dark data-[hover=true]:bg-red-50 data-[hover=true]:text-red-500">
                            <Button onPress={onOpen} className="flex w-full items-center gap-2 rounded-lg text-sm font-semibold bg-transparent text-text-dark justify-start h-auto px-1">
                                <svg width="15" height="15" className="svg-inline--fa fa-trash" aria-hidden="true" focusable="false" data-prefix="fa-regular" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                                    <path fill="currentColor" d="M424 80h-74.38l-34-56.75C306.9 8.875 291.3 0 274.4 0H173.6c-16.88 0-32.5 8.875-41.25 23.25L98.38 80H23.1C10.75 80 0 90.75 0 103.1S10.75 128 23.1 128H32l21.21 339c1.5 25.25 22.52 45 47.9 45h245.8c25.38 0 46.4-19.75 47.9-45L416 128h8C437.3 128 448 117.3 448 104S437.3 80 424 80zM173.6 48h100.8l19.25 32H154.4L173.6 48zM346.9 464H101.1L80.13 128h287.8L346.9 464z"></path>
                                </svg>
                                Delete Post
                            </Button>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            }
        </div>
    )
}
