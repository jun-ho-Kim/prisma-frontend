import React, {useState} from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import {useMutation} from "@apollo/react-hooks";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
    const [action, setAction] = useState("logIn");
    const username = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const email = useInput("wnsgh5049@naver.com");
    /*useInput은 return 값으로 value와 onChange 값을 줄 것이다.
    그래서 email.value 사용 */
    const [requestSecretMutation] = useMutation(LOG_IN,  {
        variables: { email: email.value }
      });
      const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
        variables: {
          email: email.value,
          username: username.value,
          firstName: firstName.value,
          lastName: lastName.value
        }
      });

    const onSubmit = async (e) => {
        e.preventDefault();
        if(action === "logIn") {
            if(email.value !== "") {
                try {
                    const { data: {requestSecret} } =  await requestSecretMutation();
                    if(requestSecret) {
                        toast.error("You dont have an account yet, create one");
                        toast.error("등록이 안된 email 입니다.");
                        setTimeout(() => setAction("signUp"), 3000);
                    } else {
                        toast.success("Check Check your inbox for your login secret");
                    }
                } catch {
                    toast.error("Can't request secret, try again")
                }
            } else {
                toast.error("Email is reqired");
                toast.error("Email을 입력해주세요~");
            }
        } else if(action==="signUp"){
            if(
                email.value !== "" &&
                username.value !== "" &&
                firstName.value !== "" &&
                lastName.value !== ""
            ) {
                try {
                    const {data: {createAccount}} = await createAccountMutation();
                    if(!createAccount) {
                        toast.error("Can't create account");
                    } else {
                        toast.success("Succet create account");
                        setTimeout(() => setAction("logIn"), 3000);
                    }
                } catch(error) {
                    toast.error(error.message);
                }
            } else {
                toast.error("All filed are required");
                toast.error("빈칸을 입력해주세요~");
            }
        }
    };

    return (
        <AuthPresenter
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