import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Movie from "Components/Movie";
import styled from "styled-components";

const Container = styled.div`
    display:flex;
    flex-direction : column;
    align-items: center;
    width: 100%;
`;
const Header = styled.div`
    background-image: linear-gradient(-45deg, #4ECDC4,#556270);
    height: 45vh;
    color:white;
    width :100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Title = styled.h1`
    font-size:60px;
    font-weight: 600;
    margin-bottom: 20px;
`;
const SubTitle = styled.div`
    font-size: 35px;
`;
const Loading = styled.div`
    font-size: 18px;
    opacity: 0.5;
    font-weight: 500;
    margin-top: 10px;
`;
const Movies = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px;
    width: 60%;
    position: relative;
    top: -50px;
`;


const GET_MOVIES = gql`
    {
        movies {
            id,
            medium_cover_image
        }
    }
`;

export default () => {
    const {loading, data} = useQuery(GET_MOVIES);
    return (
        <Container>
            <Header>
                <Title>2020</Title>
                <SubTitle>I love GraphQL</SubTitle>
            </Header>
            {loading &&< Loading>Loading...</Loading>}
            {!loading && data.movies && (
                <Movies>
                    {data.movies.map(movie =>
                    (<Movie key={movie.id} id={movie.id} bg={movie.medium_cover_image} />))}
                </Movies>
            )}
        </Container>
    )
}