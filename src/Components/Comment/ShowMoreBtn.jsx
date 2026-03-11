import { Link } from "react-router-dom";

export default function ShowMoreBtn({ postId }) {
    return (
        <div className="w-full mb-1 text-center">
            <Link to={"/posts/" + postId} className="py-2 inline-block text-center font-medium text-active hover:text-purple-600 transition">
                More Comments
            </Link>
        </div>
    )
}
