import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Array<User>;
  getUser: User;
  currentUser?: Maybe<User>;
  getAllProducts: Array<Product>;
  getProduct: ProductResponse;
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};


export type QueryGetProductArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  isConnected: Scalars['Boolean'];
  gender: Scalars['String'];
  profilePic: Scalars['String'];
  bmi: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Int'];
  productName: Scalars['String'];
  produceDesc: Scalars['String'];
  productPrice: Scalars['Float'];
  productImage: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
  errors?: Maybe<Array<FieldErrors>>;
  product?: Maybe<Product>;
};

export type FieldErrors = {
  __typename?: 'FieldErrors';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserReponse;
  forgotPassword: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  registerUser: UserReponse;
  loginUser: UserReponse;
  logoutUser: Scalars['Boolean'];
  addProduct: ProductResponse;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterUserArgs = {
  userCreds: RegisterUserInput;
};


export type MutationLoginUserArgs = {
  userCreds: LoginUserInput;
};


export type MutationAddProductArgs = {
  productInput: ProductInput;
};

export type UserReponse = {
  __typename?: 'UserReponse';
  errors?: Maybe<Array<FieldErrors>>;
  user?: Maybe<User>;
};

export type RegisterUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type LoginUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type ProductInput = {
  productName: Scalars['String'];
  produceDesc: Scalars['String'];
  productPrice: Scalars['Float'];
  productImage: Scalars['String'];
};

export type RegularErrorFragment = (
  { __typename?: 'FieldErrors' }
  & Pick<FieldErrors, 'field' | 'message'>
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserReponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrors' }
      & RegularErrorFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename?: 'UserReponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrors' }
      & Pick<FieldErrors, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logoutUser'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'UserReponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrors' }
      & Pick<FieldErrors, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'createdAt' | 'updatedAt' | 'isConnected'>
    )> }
  ) }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldErrors {
  field
  message
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    errors {
      ...RegularError
    }
    user {
      id
      username
    }
  }
}
    ${RegularErrorFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  loginUser(userCreds: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logoutUser
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!) {
  registerUser(
    userCreds: {username: $username, password: $password, email: $email}
  ) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
      createdAt
      updatedAt
      isConnected
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    id
    username
  }
}
    `;

export function useCurrentUserQuery(options: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CurrentUserQuery>({ query: CurrentUserDocument, ...options });
};