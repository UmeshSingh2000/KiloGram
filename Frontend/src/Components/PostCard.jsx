import moment from 'moment';
import { Heart, MessageCircle, Share } from "lucide-react"; // optional: icon library
import { toggleLike } from '../Service/postService'
import { toggleLike as reduxToggleLike } from '../Redux/Features/postSlice'
import StatusCodes from '../helpers/statusCodes';
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import throttle from 'lodash/throttle'
import { useCallback, useEffect, useState, useRef } from 'react';

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

    const userId = useSelector((state) => state.auth.user._id)
    const hasLiked = likes.includes(userId)
    const dispatch = useDispatch()
    const [index, setIndex] = useState(0)
    
    // Drag functionality states
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const imageRef = useRef(null);
    
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

    const [showHeart, setShowHeart] = useState(false);

    const handleDoubleClick = () => {
        setShowHeart(true);
        throttledToggleLike(_id);
        setTimeout(() => setShowHeart(false), 1000);
    };

    // Mouse events
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setDragOffset(0);
        e.preventDefault();
    };

    const handleMouseMove = useCallback((e) => {
        if (!isDragging) return;
        const currentX = e.clientX;
        const offset = currentX - startX;
        setDragOffset(offset);
    }, [isDragging, startX]);

    const handleMouseUp = useCallback(() => {
        if (!isDragging) return;
        
        const threshold = 50;
        
        if (Math.abs(dragOffset) > threshold) {
            if (dragOffset > 0 && index > 0) {
                setIndex(prev => prev - 1);
            } else if (dragOffset < 0 && index < image.length - 1) {
                setIndex(prev => prev + 1);
            }
        }
        
        setIsDragging(false);
        setDragOffset(0);
        setStartX(0);
    }, [isDragging, dragOffset, index, image.length]);

    // Touch events
    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
        setDragOffset(0);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const offset = currentX - startX;
        setDragOffset(offset);
        e.preventDefault();
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        
        const threshold = 50;
        
        if (Math.abs(dragOffset) > threshold) {
            if (dragOffset > 0 && index > 0) {
                setIndex(prev => prev - 1);
            } else if (dragOffset < 0 && index < image.length - 1) {
                setIndex(prev => prev + 1);
            }
        }
        
        setIsDragging(false);
        setDragOffset(0);
        setStartX(0);
    };

    // Global event listeners
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, handleMouseMove, handleMouseUp]);

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
                <div className="relative overflow-hidden">
                    {image.length > 0 && (
                        <img
                            ref={imageRef}
                            src={image[index]}
                            alt="Post"
                            className="w-full object-cover rounded select-none"
                            style={{
                                transform: image.length > 1 ? `translateX(${dragOffset}px)` : 'translateX(0)',
                                transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                                cursor: image.length > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                            }}
                            onDoubleClick={handleDoubleClick}
                            onMouseDown={image.length > 1 ? handleMouseDown : undefined}
                            onTouchStart={image.length > 1 ? handleTouchStart : undefined}
                            onTouchMove={image.length > 1 ? handleTouchMove : undefined}
                            onTouchEnd={image.length > 1 ? handleTouchEnd : undefined}
                            draggable={false}
                        />
                    )}
                    {showHeart && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <Heart
                                className={`w-20 h-20 fill-white text-white drop-shadow-lg transform transition-all duration-300 ease-out animate-ping opacity-90 ${showHeart ? 'scale-110' : 'scale-0'
                                    }`}
                                style={{
                                    animation: showHeart
                                        ? 'heartBeat 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                                        : 'none'
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="py-2 flex items-center space-x-4">
                    <button onClick={() => throttledToggleLike(_id)}>
                        <Heart
                            className={`w-6 h-6 cursor-pointer transition-all duration-150 ${hasLiked ? 'fill-red-500 text-red-500' : ''
                                }`}
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

            <style jsx>{`
                @keyframes heartBeat {
                    0% {
                        transform: scale(0);
                        opacity: 0;
                    }
                    15% {
                        transform: scale(1.2);
                        opacity: 0.9;
                    }
                    30% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.1);
                        opacity: 0.9;
                    }
                    70% {
                        transform: scale(1);
                        opacity: 0.7;
                    }
                    100% {
                        transform: scale(0.8);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    )
}

export default PostCard