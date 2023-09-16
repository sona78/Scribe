import {useNavigate} from "react-router-dom"
import {Auth, API} from "aws-amplify"
import { useCallback } from "react";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";
import { Storage } from "@aws-amplify/storage";
import  awsmobile  from "../aws-exports";

export const getUser = async (userid) => {
    const user = await API.graphql({ 
      query: queries.getUser,
      variables: {
          id: userid
      }
      });
    return user;
  };

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

export const classCreate = async (newClass) => {
    const promise = await API.graphql({
      query: mutations.createClass,
      variables: { input: newClass },
    });
    return promise;
}

export const userClassCreate = async (newUserClass) => {
    const promise = await API.graphql({
      query: mutations.createUserClass,
      variables: { input: newUserClass },
    });
    return promise;
}