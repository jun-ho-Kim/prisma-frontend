import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PostPresenter from "./PostPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "../../../node_modules/@apollo/react-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueires";
import { toast } from "../../../node_modules/react-toastify";

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
    const [isLikedS, setIsLiked] = useState(isLiked);
    const [likeCountS, setLikeCount] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const [selfComments, setSelfComments] = useState([]);
    const comment = useInput("");
    
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
        variables: {postId: id}
    });
    const [addCommentMutation] = useMutation(ADD_COMMENT, {
        variables: {postId: id, text: comment.value}
    });
    const slide = () => {
        const totalFiles = files.length;
        if(currentItem === totalFiles) {
            setTimeout(() => setCurrentItem(0), 3000);
        } else {
            setTimeout(() => setCurrentItem(currentItem + 1), 3000)
        }
    };
    useEffect(() =>  {
        slide();
    }, [currentItem]);

    const toggleLike = async () => {
            if(isLikedS === true) {
                setIsLiked(false);
                setLikeCount(likeCountS - 1);
            } else {
                setIsLiked(true);
                setLikeCount(likeCountS + 1);
            } 
            await toggleLikeMutation();
    };

    const onKeyPress = async (e) => {
        const {which} = e;
        if(which === 13){
            e.preventDefault();
            try{
                const {
                    data: {addComment}
                } = await addCommentMutation();
                console.log("addComment:", addComment);
                setSelfComments([...selfComments, addComment])
                comment.setValue("");
            } catch {
                toast.error("Cant send comment")
            }
        }
    };

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
        setIsLiked={setIsLiked}
        setLikeCount={setLikeCount}
        currentItem={currentItem}
        toggleLike={toggleLike}
        onKeyPress={onKeyPress}
        selfComments={selfComments}
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