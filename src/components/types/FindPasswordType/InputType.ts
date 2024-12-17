export type NameInputProps = {
  name: string;
  handleNameChange: (text: string) => void;
  nameError: string;
  deleteName: () => void;
};

export type EmailInputProps = {
  email: string;
  handleEmailChange: (text: string) => void;
  emailError: string;
  isActive: boolean;
  handleRequire: () => void;
  askCode: string;
};

export type VerifyCodeInputProps = {
  code: string;
  handleCodeChange: (text: string) => void;
  timeLeft: number;
  verifiedEmail: () => void;
};

export type ChangePasswordProps = {
  resetPasswordInput: string;
  handleResetPasswordChange: (password: string) => void;
  deletePassword: () => void;
  errorMessage: string;
};
