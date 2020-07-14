import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PostPresenter from "./PostPresenter";
import useInput from "../../Hooks/useInput";

const PostContainer  = ({
    id,
    caption,
    location,
    user,
    files,
    likeCount,
    isLiked,
    comments,
    createdAt
}) => { 
    const [isLikedS, setIsLiekd] = useState(isLiked);
    const [likeCountS, setLikeCount] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const comment = useInput("");
    const slide = () => {
        const totalFiles = files.length;
        if(currentItem === totalFiles) {
            setTimeout(() => setCurrentItem(0), 3000);
        } else {
            setTimeout(() => setCurrentItem(currentItem + 1), 3000)
        }
    }

    useEffect(() =>  {
        slide();
    }, [currentItem]);
    return (
    <PostPresenter
        id={id}
        user={user}
        files={files}
        caption={caption}
        location={location}
        likeCount={likeCountS}
        isLiked={isLikedS}
        comments={comments}
        newComment={comment}
        createdAt={createdAt}
        setIsLiekd={setIsLiekd}
        setLikeCount={setLikeCount}
        currentItem={currentItem}
    />
    );
};

PostContainer.propTypes = {
    id: PropTypes.string.isRequired,
    caption: PropTypes.string,
    location: PropTypes.string,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avartar: PropTypes.string,
        username: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ),
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            user: PropTypes.shape({
                id: PropTypes.string.isRequired,
                username: PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired,
    createdAt: PropTypes.string.isRequired
};


export default PostContainer;