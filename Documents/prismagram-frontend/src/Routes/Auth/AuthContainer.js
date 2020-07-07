import React, {useState} from "react";
import AuthPresentation from "./AuthPresentation";
import useInput from "../../Hooks/useInput";
import {useMutation} from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";
    
export default () => {
    const [action, setAction] = useState("login");
    const username = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const email = useInput("");
    /*useInput은 return 값으로 value와 onChange 값을 줄 것이다.
    그래서 email.value 사용 */
    const requestSecret = useMutation(LOG_IN, {
        variables: { email: email.value }
    });

    const onSubmit = e => {
        e.preventDefault();
        if(email !== "") {
            requestSecret();
        }
    };

    return (
        <AuthPresentation
            setAction={setAction}
            action={action}
            username={username}
            firstName={firstName}
            lastName={lastName}
            email={email}
            onSubmit={onSubmit}
        />
    )
};