/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClass = /* GraphQL */ `
  mutation CreateClass(
    $input: CreateClassInput!
    $condition: ModelClassConditionInput
  ) {
    createClass(input: $input, condition: $condition) {
      id
      Name
      Users {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateClass = /* GraphQL */ `
  mutation UpdateClass(
    $input: UpdateClassInput!
    $condition: ModelClassConditionInput
  ) {
    updateClass(input: $input, condition: $condition) {
      id
      Name
      Users {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteClass = /* GraphQL */ `
  mutation DeleteClass(
    $input: DeleteClassInput!
    $condition: ModelClassConditionInput
  ) {
    deleteClass(input: $input, condition: $condition) {
      id
      Name
      Users {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      Email
      Name
      Classes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      Email
      Name
      Classes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      Email
      Name
      Classes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createUserClass = /* GraphQL */ `
  mutation CreateUserClass(
    $input: CreateUserClassInput!
    $condition: ModelUserClassConditionInput
  ) {
    createUserClass(input: $input, condition: $condition) {
      id
      classId
      userId
      class {
        id
        Name
      }
      user {
        id
        Email
        Name
      }
    }
  }
`;
export const updateUserClass = /* GraphQL */ `
  mutation UpdateUserClass(
    $input: UpdateUserClassInput!
    $condition: ModelUserClassConditionInput
  ) {
    updateUserClass(input: $input, condition: $condition) {
      id
      classId
      userId
      class {
        id
        Name
        createdAt
        updatedAt
      }
      user {
        id
        Email
        Name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserClass = /* GraphQL */ `
  mutation DeleteUserClass(
    $input: DeleteUserClassInput!
    $condition: ModelUserClassConditionInput
  ) {
    deleteUserClass(input: $input, condition: $condition) {
      id
      classId
      userId
      class {
        id
        Name
        createdAt
        updatedAt
      }
      user {
        id
        Email
        Name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
