export type SignUp = {
  email: string;
  emailVerified: boolean;
  college: string;
  department: string;
  name: string;
  nickNameVerified: boolean;
  password: string;
};

export type CheckEmailResponse = {
  success: boolean;
  response: null;
  error: {
    status: number;
    message: string;
  } | null;
};

export type CheckCodeData = {
  email: string;
  code: string;
};

export type CheckCodeResponse = {
  success: boolean;
  response: null;
  error: null;
};

export type CheckNameResponse = {
  success: boolean;
  response: null;
  error: {
    status: number;
    message: string;
  } | null;
};

export type SignUpData = {
  email: string;
  password: string;
  name: string;
  college: string;
  department: string;
};

export type SignUpResponse = {
  success: boolean;
  response: null;
  error: null;
};
