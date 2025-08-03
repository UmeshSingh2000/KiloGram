import moment from 'moment';
import { Heart, MessageCircle, Share } from "lucide-react"; // optional: icon library
import { toggleLike } from '../Service/postService'
import { toggleLike as reduxToggleLike } from '../Redux/Features/postSlice'
import StatusCodes from '../helpers/statusCodes';
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import throttle from 'lodash/throttle'
import { useCallback } from 'react';
const PostCard = ({ post }) => {
    const {
        postedBy,
        image,
        content,
        likes,
        comments,
        createdAt,
        _id
    } = post;

    const dispatch = useDispatch()
    const userId = useSelector((state) => state.auth.user._id)
    const throttledToggleLike = useCallback(
        throttle(async (id) => {
            dispatch(reduxToggleLike({ postId: id, userId }));
            try {
                const res = await toggleLike(id);
                if (res.status !== StatusCodes.OK) {
                    throw new Error(res.message);
                }
            } catch (error) {
                dispatch(reduxToggleLike({ postId: id, userId })); // rollback
                toast.error("Failed to update like");
                console.error(error);
            }
        }, 1500), // throttled for 1 second
        [dispatch, userId]
    );


    return (
        <div>
            <div className="max-w-md mx-auto shadow-md rounded-lg overflow-hidden mb-6">
                {/* Header */}
                <div className="flex items-center py-3">
                    <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={
                            postedBy.profilePicture ||
                            "https://avatars.githubusercontent.com/u/124599?v=4"
                        }
                        alt={postedBy.userName}
                    />
                    <div className="ml-3">
                        <p className="text-sm font-semibold">{postedBy.userName}</p>
                        <p>{moment(createdAt).fromNow()}</p>
                    </div>
                </div>

                {/* Image */}
                {image.length > 0 && (
                    <img
                        src={image[0]}
                        alt="Post"
                        className="w-full object-cover rounded"
                    />
                )}

                {/* Actions */}
                <div className="py-2 flex items-center space-x-4">
                    <button onClick={() => throttledToggleLike(_id)}>
                        <Heart
                            className={`w-6 h-6 cursor-pointer`}
                        />
                    </button>
                    <MessageCircle className="w-6 h-6 cursor-pointer" />
                    <Share />
                </div>

                {/* Likes */}
                <div className="">
                    <p className="text-sm font-semibold">{likes.length} likes</p>
                </div>

                {/* Content */}
                <div className="pb-4">
                    <p className="text-sm">
                        <span className="font-semibold">{postedBy.userName} </span>
                        {content}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PostCard
