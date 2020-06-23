import React from "react";
import { useParams } from "react-router-dom"
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from "../Components/Movie";

const Container = styled.div`
    height: 100vh;
    background-image: linear-gradient(-45deg, #d754ab, #fd723a);
    width:100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;

`;
const Column = styled.div`
    margin-left: 10px;
    width: 50%;
`;
const Title = styled.h1`
    font-size: 65px;
    margin-bottom: 15px;
`;

const SubTitle = styled.h3`
    font-size: 35px;
    margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 28px;
`;

const Poster = styled.div`
    width: 25%;
    height: 60%;
    background-color: transparent;
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center center;
`;

const Suggestion = styled.div`
`;


const GET_MOVIE = gql`
    query getMovie($id:Int!) {
        movie(id: $id) {
            id
            title
            year
            rating
            medium_cover_image
            language
            description_intro
        }
        suggestion(id: $id) {
            id
            title
            medium_cover_image
  	    }
    }
`;


export default () => {
    let {id} = useParams();
    id=parseInt(id);
    const { loading, data } = useQuery(GET_MOVIE, {
        variables: { id }
    });
    console.log("data:", data);
    return (
        <>
        <Container>
            <Column>
                <Title>{loading ? "Loading..." : data.movie.title }</Title>
                {!loading && data.movie && (
                <>
                    <SubTitle>
                        {data.movie.language} · {data.movie.rating}
                    </SubTitle>
                    <Description>
                        {data.movie.description_intro}
                    </Description>
                </>
                
                )}
            </Column>
            <Poster bg={data && data.movie ? data.movie.medium_cover_image : "" }></Poster>
        </Container>
        <Suggestion>
            {data && data.suggestion && data.suggestion.map(movie => (<Movie id={movie.id} bg={movie.medium_cover_image}>{movie.title}</Movie>))}
        </Suggestion>
        </>
    )
    };