import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.input`
`;

const Input = ({placeholder}) => <Container placeholder={placeholder} />;

Input.propTypes = {
    placeholder: PropTypes.string.isRequired
};

export default Input;