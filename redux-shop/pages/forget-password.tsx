import { Heading, toast, Button, VStack, Checkbox, Divider, Box } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import { withUrqlClient } from "next-urql"
import router from "next/router"
import Head from "next/head"
import React, { useState } from "react"
import { CredentialsLayout } from "../components/layouts/CredentialsLayout"
import { InputField } from "../components/ui/InputField"
import { useForgotPasswordMutation } from "../generated/graphql"
import { createUrqlClient } from "../utils/createUrqlClient"
import { toErrorMap } from "../utils/erropMap"

const ForgetPassword: React.FC<{}> = () => {

    const [, forgotPassword] = useForgotPasswordMutation()
    const [complete, setComplete] = useState(false)
    return (
        <>
            <Head>
                <title>Forget password</title>
            </Head>
            <CredentialsLayout>
                <Heading
                    pb={4}
                    alignSelf="center"
                >
                    Forget password
                </Heading>

                <Formik 
                    initialValues={{ email: "" }} 
                    onSubmit={async (values) => {
                        await forgotPassword(values)
                        setComplete(true)
                        // const response = loginUser(values)
                        // return response
                        // .then(result => {
                        //     if(result.data?.loginUser.errors) {
                        //         setErrors(toErrorMap(result.data.loginUser.errors))
                        //     }else if(result.data?.loginUser.user) {
                        //         router.push("/dashboard")
                        //         toast({
                        //             title: "Login succesfull",
                        //             description: "You are succesfully logged into your account.",
                        //             status: "success",
                        //             duration: 2000,
                        //             isClosable: true
                        //         })
                        //     }
                        // })
                        // .catch(error => console.log("Error: " + error))
                    }}
                >
                    {({ isSubmitting }) => complete ? <Box>If the email exists, we sent you a request</Box> : (
                        <Form>
                            <InputField
                                name="email"
                                label="Email"
                                placeholder="Enter your Email"
                                variant="filled"
                                inputsize="sm"
                                type="email"
                            />
                            <Button 
                                type="submit" 
                                colorScheme="teal" 
                                mt={4}
                                w="auto"
                                isLoading={isSubmitting}
                            >
                                Forgot password
                            </Button>
                        </Form>
                    )}
                </Formik>
            </CredentialsLayout>
        </>
    )
}

export default withUrqlClient(createUrqlClient)(ForgetPassword)