import {Text, VStack} from "@/components/ui";
import {TextInput} from "react-native";
import React from "react";
import {InputFieldProps} from "@/src/components/types/LoginFormType/InputFildType.ts";
import {InputFieldStyles} from "@/src/components/LoginFrom/InputField/InputFieldStyle.ts";


export const InputField = React.forwardRef<TextInput, InputFieldProps>(
    ({ label, placeholder, value, onChangeText, secureTextEntry, onSubmitEditing }, ref) => (
        <VStack style={InputFieldStyles.inputContainer}>
            <Text style={InputFieldStyles.inputLabel}>{label}</Text>
            <TextInput
                style={InputFieldStyles.input}
                placeholder={placeholder}
                placeholderTextColor="#B9B9B9"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                returnKeyType={secureTextEntry ? "done" : "next"}
                onSubmitEditing={onSubmitEditing}
                ref={ref}
                blurOnSubmit={!secureTextEntry}
            />
        </VStack>
    )
);