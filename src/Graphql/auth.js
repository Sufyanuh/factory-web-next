import { gql } from "@apollo/client";

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const CHANGE_PASSWORD_WITH_OTP = gql`
  mutation ChangePasswordWithOtp(
    $otp: Int!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    changePasswordWithOtp(
      otp: $otp
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    )
  }
`;

export const LOGIN_USER = gql`
  mutation login(
    $email: String!
    $password: String!
    $token: String!
    $os: String
  ) {
    login(email: $email, password: $password, token: $token, os: $os) {
      user {
        id
        email
        username
        password
        role
        status
      }
      device {
        id
        userId
        token
      }
      token
      errors {
        message
      }
    }
  }
`;
