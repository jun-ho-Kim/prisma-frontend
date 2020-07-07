import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.input`
`;

const Input = ({
    placeholder,
    required = true,
    value,
    onChange,
    type = "text"
}) => 
    <Container 
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        type={type}
    />;

Input.propTypes = {
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string
};

export default Input;