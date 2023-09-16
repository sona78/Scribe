/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClass = /* GraphQL */ `
  subscription OnCreateClass($filter: ModelSubscriptionClassFilterInput) {
    onCreateClass(filter: $filter) {
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
export const onUpdateClass = /* GraphQL */ `
  subscription OnUpdateClass($filter: ModelSubscriptionClassFilterInput) {
    onUpdateClass(filter: $filter) {
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
export const onDeleteClass = /* GraphQL */ `
  subscription OnDeleteClass($filter: ModelSubscriptionClassFilterInput) {
    onDeleteClass(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateUserClass = /* GraphQL */ `
  subscription OnCreateUserClass(
    $filter: ModelSubscriptionUserClassFilterInput
  ) {
    onCreateUserClass(filter: $filter) {
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
export const onUpdateUserClass = /* GraphQL */ `
  subscription OnUpdateUserClass(
    $filter: ModelSubscriptionUserClassFilterInput
  ) {
    onUpdateUserClass(filter: $filter) {
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
export const onDeleteUserClass = /* GraphQL */ `
  subscription OnDeleteUserClass(
    $filter: ModelSubscriptionUserClassFilterInput
  ) {
    onDeleteUserClass(filter: $filter) {
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
