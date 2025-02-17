export type InputBoxProps = {
  inputTitle: string;
  placeholderText: string;
  value: string;
  setValue: (text: string) => void;
};

export type ErrorMessageProps = {
  errorMessage: string;
};

export type SecondsProps = {
  seconds: number;
};

export type VerifyCodeProps = {
  timeLeft: number;
  code: string;
  setCode: (code: string) => void;
  onVerify: () => void;
};
