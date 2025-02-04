import {ImageSourcePropType} from "react-native";

export type InputFieldProps = {
  title: string;
  placeholder?: string;
  description?: string;
  icon?: ImageSourcePropType;
  value: string;
  onChange: (text: string) => void;
};
