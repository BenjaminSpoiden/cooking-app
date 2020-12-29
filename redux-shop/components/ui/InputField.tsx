import { Box, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import React, { InputHTMLAttributes } from "react"
import { useField } from "formik"

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string
    label: string
    variant?: string
    inputsize?: string
}

export const InputField: React.FC<InputFieldProps> = ({label, ...props}) => {
    const [field, { error }] = useField(props)

    return (
        <Box mt={4} >
            <FormControl isInvalid={!!error}>
                <FormLabel htmlFor={field.name} fontSize={props.inputsize} > {label} </FormLabel>
                <Input {...field} {...props} id={field.name} variant={props.variant} size={props.inputsize} />
                { error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
            </FormControl>
        </Box>
    )
}