import { Button, Checkbox, Divider, Heading, Text, useToast, VStack } from "@chakra-ui/react"
import React from "react"
import { CredentialsLayout } from "../components/layouts/CredentialsLayout"
import Head from "next/head"
import { Formik, Form } from "formik"
import { InputField } from "../components/ui/InputField"
import { useRegisterMutation } from "../generated/graphql"
import { toErrorMap } from "../utils/erropMap"
import { useRouter } from "next/router"
import NextLink from "next/link"
import { withUrqlClient } from "next-urql"
import { createUrqlClient } from "../utils/createUrqlClient"


const Signup = () => {
    const [_, registerUser] = useRegisterMutation()    
    const router = useRouter()
    const toast = useToast()

    return (
        <>
            <Head>
                <title>Register Your Account</title>
            </Head>
            <CredentialsLayout>
                <Heading
                    pb={4} 
                    alignSelf="center"
                    >
                        Register
                </Heading>
                <Formik 
                    initialValues={{ username: "", password: "", email: "" }}
                    onSubmit={async(values, { setErrors }) => {
                        const responseUser = await registerUser(values)
                        if(responseUser.data?.registerUser.errors) {
                            setErrors(toErrorMap(responseUser.data.registerUser.errors))
                        }else if (responseUser.data?.registerUser.user) {
                            router.push("/dashboard")
                            toast({
                                title: "Register succesfull",
                                description: "You succesfully registered your account",
                                status: "success",
                                duration: 2000,
                                isClosable: true
                            })
                        }
                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <InputField 
                                name="username" 
                                label="Username"
                                placeholder="Enter your username"
                                variant="filled" 
                                inputsize="sm"
                            />

                            <InputField 
                                name="email"
                                label="Email"
                                placeholder="Enter your email"
                                variant="filled"
                                inputsize="sm"
                            />

                            <InputField 
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                variant="filled"
                                inputsize="sm"
                            />
                            <Button 
                                type="submit" 
                                colorScheme="teal" 
                                mt={4}
                                w="30%"
                                
                                isLoading={isSubmitting}
                            >
                                Register
                            </Button>
                            <VStack justifyContent="left" alignItems="left">
                                <Checkbox  defaultIsChecked id="newsletter-cb" name="newsletter" colorScheme="teal" borderColor="teal.600">
                                    Notify me when new recipes are uploaded 
                                </Checkbox>
                                <Checkbox id="terms-cb" name="terms"  borderColor="teal.600" colorScheme="teal" mt={4}>
                                    I read and I agree to the terms and conditions
                                </Checkbox>
                                <Checkbox id="terms-cb" name="terms"  borderColor="teal.600" colorScheme="teal" mt={4}>
                                    I read and I agree to the privacy policy
                                </Checkbox>
                            </VStack>
                        </Form>
                    )}
                </Formik>
                <Divider mt={2} maxW="250px" alignSelf="center" />
                <NextLink href="/login">
                    <Text mt={4} fontSize="sm" alignSelf="center" _hover={{ textColor: "blue.500", cursor:"pointer" }} >
                        Already have an account ? Click here to login.
                    </Text>
                </NextLink>
            </CredentialsLayout>
        </>
    )
}

export default withUrqlClient(createUrqlClient)(Signup)