import {ImageSourcePropType} from "react-native";

export type InputFieldProps = {
  title: string;
  placeholder?: string;
  errorMessage?: string;
  description?: string;
  icon?: ImageSourcePropType;
  value: string;
  onChange: (text: string) => void;
};
