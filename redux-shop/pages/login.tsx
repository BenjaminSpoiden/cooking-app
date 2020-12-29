import React from "react"
import Head from "next/head"
import { CredentialsLayout } from "../components/layouts/CredentialsLayout"
import { Heading, Button, Checkbox, VStack, Divider, Text, useToast } from "@chakra-ui/react"
import { useLoginMutation } from "../generated/graphql"
import { Form, Formik } from "formik"
import { toErrorMap } from "../utils/erropMap"
import { useRouter } from "next/router"
import { InputField } from "../components/ui/InputField"
import NextLink from "next/link"
import { withUrqlClient } from "next-urql"
import { createUrqlClient } from "../utils/createUrqlClient"

const Login = () => {

    const [_, loginUser] = useLoginMutation()
    const router = useRouter()
    const toast = useToast()

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <CredentialsLayout>
                <Heading
                    pb={4}
                    alignSelf="center"
                >
                    Login
                </Heading>

                <Formik 
                    initialValues={{ username: "", password: "" }} 
                    onSubmit={async (values, { setErrors }) => {
                        const response = loginUser(values)
                        return response
                        .then(result => {
                            if(result.data?.loginUser.errors) {
                                setErrors(toErrorMap(result.data.loginUser.errors))
                            }else if(result.data?.loginUser.user) {
                                router.push("/dashboard")
                                toast({
                                    title: "Login succesfull",
                                    description: "You are succesfully logged into your account.",
                                    status: "success",
                                    duration: 2000,
                                    isClosable: true
                                })
                            }
                        })
                        .catch(error => console.log("Error: " + error))
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField
                                name="username"
                                label="Username"
                                placeholder="Enter your username"
                                variant="filled"
                                inputsize="sm"
                            />
                            
                            <InputField
                                name="password"
                                label="Password"
                                placeholder="Enter your Password"
                                variant="filled"
                                inputsize="sm"
                                type="password"
                            />
                            <Button 
                                type="submit" 
                                colorScheme="teal"  
                                mt={4}
                                w="30%"
                                isLoading={isSubmitting}
                            >
                                Login
                            </Button>
                            <VStack alignItems="left" >
                                <Checkbox id="remember-me-cb" name="rememberMe" colorScheme="teal" borderColor="teal.600">Remember me</Checkbox>
                            </VStack>
                        </Form>
                    )}
                </Formik>
                <Divider mt={2} maxW="250px" alignSelf="center" />
                <NextLink href="/signup">
                    <Text mt={4} fontSize="sm" alignSelf="center" _hover={{ textColor: "blue.500", cursor:"pointer" }} >
                        Don't have an account yet ? Click here to create one
                    </Text>
                </NextLink>
                <NextLink href="/forget-password">
                    <Text mt={4} fontSize="sm" alignSelf="center" _hover={{ textColor: "blue.500", cursor:"pointer" }} >
                        Forgot your password ? Click here
                    </Text>
                </NextLink>

            </CredentialsLayout>
        </>
    )
}

export default withUrqlClient(createUrqlClient)(Login)