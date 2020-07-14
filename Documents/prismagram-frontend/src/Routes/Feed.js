import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks"
import Loader from "../Components/Loader";
import Post from "../Components/Post";

const Wrapper = styled.div`
`;


const FEED_QUERY = gql`
    {
        seeFeed {
            id
            location
            caption
            user {
                id
                username
            }
            files {
                id
                url
            }
            likeCount
            isLiked
            comments {
                id
                text
                user {
                    id
                    username
                }
            }
            createdAt
        }
    }
`;

export default () => {
    const {data, loading} = useQuery(FEED_QUERY);
    console.log("feed data:", data, loading);
    return (
    <>
    <Helmet>
        <title>Feed | Prismagram </title>
    </Helmet>
    <Wrapper>
        {loading && ""}
        {!loading &&
            data &&
            data.seeFeed &&
            data.seeFeed.map(post => (
                <Post
                    key={post.id}
                    id={post.id}
                    location={post.location}
                    caption={post.caption}
                    user={post.user}
                    files={post.files}
                    likeCount={post.likeCount}
                    isLiked={post.isLiked}
                    comments={post.comments}
                    createdAt={post.createdAt}
                />
            ))}
    </Wrapper>
    </>
    );
};