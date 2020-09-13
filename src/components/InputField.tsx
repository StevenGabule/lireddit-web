import React, {FC, InputHTMLAttributes} from "react";
import { useField } from "formik";
import {FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/core/dist";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
}

export const InputField: FC<InputFieldProps> = ({label,size:_, ...props}) => {
    const [field, {error}] = useField(props)
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Input {...field} {...props} id={field.name} placeholder={props.placeholder} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
}



