import React from "react";
import styled from "styled-components";
import Button from "../../Components/Button";
import Input from "../../Components/Input";

const Wrapper = styled.div`
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Box = styled.div`
    ${props => props.theme.whiteBox}
    border-radius:0px;
    width: 100%;
    max-width: 350px;

`;

const StateChanger = styled(Box)`
    text-align: center;
    padding:20px 0px;
`;

const Link = styled.span`
    color: ${props => props.theme.blueColor};
    cursor: pointer;
`;

const Form = styled(Box)`
    padding: 40px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    form {
        width: 100%;
        input {
            width: 100%;
            &:not(:last-child) {
                margin-bottom: 7px;
            }
        }
        button {
            margin-top: 10px;
    }
}
`;

export default ({
    action,
    setAction,
    firstName,
    lastName,
    email,
    username,
    onSubmit
}) => (
    <Wrapper>
        <Form>
            {action === "login" ? (
                <form onSubmit={onSubmit}>
                    <Input placeholder={"Email"} {...email} />
                    <Button text={"Log in"} />
                </form>
            ) : (
                <form onSubmit={onSubmit}>
                    <Input placeholder={"First name"} {...firstName}/>
                    <Input placeholder={"Last name"} {...lastName}/>
                    <Input placeholder={"Email"}  {...email} type="email"/>
                    <Input placeholder={"Username"} {...username} />
                    <Button text={"Sign Up"} />
                </form>
            )}
        </Form>
        <StateChanger>
            {action ==="login" ?( 
                <>
                    Don`t have account?{""}
                    <Link onClick={() => setAction("signUp")}>sign Up</Link>
                </>
                ) : (
                <> 
                    Have an account?{""}
                    <Link onClick={() => setAction("login")}>Log In</Link>
                </>
                )}
        </StateChanger>
     </Wrapper>
);