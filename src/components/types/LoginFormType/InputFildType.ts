import {TextInput} from "react-native";

export type InputFieldProps = {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    onSubmitEditing?: () => void;
    ref?: React.RefObject<TextInput>;
}