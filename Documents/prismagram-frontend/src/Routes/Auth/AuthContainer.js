import React, {useState} from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import {useMutation} from "@apollo/react-hooks";
import { LOG_IN, CREATE_ACCOUNT, CONFRIM_SECRET, LOCAL_LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
    const [action, setAction] = useState("logIn");
    const username = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const email = useInput("");
    const secret = useInput("");
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
      const [confirmSecretMutation] = useMutation(CONFRIM_SECRET, {
          variables: {
              email: email.value,
              secret: secret.value
          }
      });
      const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

    const onSubmit = async (e) => {
        e.preventDefault();
        if(action === "logIn") {
            if(email.value !== "") {
                try {
                    const { 
                        data: { requestSecret } 
                    } =  await requestSecretMutation();
                    if(requestSecret) {
                        toast.error("You dont have an account yet, create one");
                        toast.error("등록이 안된 email 입니다.");
                        setTimeout(() => setAction("signUp"), 3000);
                    } else {
                        toast.success("Check Check your inbox for your login secret");
                        setAction("confirm");
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
                    const {
                        data: { createAccount } 
                    } = await createAccountMutation();
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
        } else if(action === "confirm") {
            if(secret.value !== "") {
                try {
                    const {
                        data: {confirmSecret: token}
                    } = await confirmSecretMutation();
                    console.log("token:", token);
                    if(token !== "" && token !== undefined) {
                        localLogInMutation({variables: {token}});
                    } else {
                        throw Error();
                    }
                } catch {
                    toast.error("Cant confirm secret,check again");
                }
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
            secret={secret}
            onSubmit={onSubmit}

        />
    )
};