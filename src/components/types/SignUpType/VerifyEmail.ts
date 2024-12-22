import {Dispatch, SetStateAction} from 'react';

export type InputBoxProps = {
  inputTitle: string;
  placeholderText: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export type ErrorMessageProps = {
  errorMessage: string;
};

export type VerifyCodeProps = {
  timeLeft: number;
};
