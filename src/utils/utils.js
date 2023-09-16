import {useNavigate} from "react-router-dom"
import {Auth, API} from "aws-amplify"
import { useCallback } from "react";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";
import { Storage } from "@aws-amplify/storage";
import  awsmobile  from "../aws-exports";


export const userCreate = async (newUser) => {
    const promise = await API.graphql({
      query: mutations.createUser,
      variables: { input: newUser },
    });
    return promise;
}

export const userUpdate = async (newUser) => {
    const promise = await API.graphql({
      query: mutations.updateUser,
      variables: { input: newUser },
    });
    return promise;
};