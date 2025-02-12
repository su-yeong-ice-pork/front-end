export type ResetPasswordData = {
  name: string;
  email: string;
  password: string;
};

export type ResetPasswordResponse = {
  success: boolean;
  response: null;
  error: null;
};

export type CheckPasswordEmailData = {
  name: string;
  email: string;
};

export type CheckPasswordEmailResponse = {
  success: boolean;
  response: null;
  error: null;
};
