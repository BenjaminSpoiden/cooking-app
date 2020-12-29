import { Heading, Button, VStack, Checkbox, useToast } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { CredentialsLayout } from "../../components/layouts/CredentialsLayout"
import { InputField } from "../../components/ui/InputField"
import { toErrorMap } from "../../utils/erropMap"
import Head from "next/head"
import { useChangePasswordMutation } from "../../generated/graphql"
import { withUrqlClient } from "next-urql"
import { createUrqlClient } from "../../utils/createUrqlClient"


const ChangePassword: NextPage<{token: string}> = ({ token }) => {

    const [, changePassword ] = useChangePasswordMutation()
    const toast = useToast()
    const router = useRouter()
    const [tokenError, setTokenError] = useState('')

    return (
        <>
            <Head>
                <title>Change Password</title>
            </Head>
            <CredentialsLayout>
                <Heading
                    pb={4}
                    alignSelf="center"
                >
                    Reset Password
                </Heading>

                <Formik 
                    initialValues={{ resetPassword: ""}} 
                    onSubmit={async (values, { setErrors }) => {
                        const response = await changePassword({ newPassword: values.resetPassword, token })
                        if(response.data?.changePassword.errors) {
                            const errorMap = toErrorMap(response.data.changePassword.errors)
                            if('token' in errorMap) {
                                setTokenError(errorMap.token)
                                console.log(tokenError)
                            }                             
                            setErrors(errorMap)
                        }
                        else if(response.data?.changePassword.user) {
                            router.push("/dashboard")
                            toast({
                                title: "Changes successful",
                                description: "You are succesfully logged into your account.",
                                status: "success",
                                duration: 2000,
                                isClosable: true
                            })
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField
                                name="resetPassword"
                                label="Change your Password"
                                placeholder="choose your new password"
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
                                Reset Password
                            </Button>
                        </Form>
                    )}
                </Formik>
            </CredentialsLayout>
        </>
    )
}

ChangePassword.getInitialProps = ({ query }) => {
    return {
        token: query.token as string
    }
}

export default withUrqlClient(createUrqlClient)(ChangePassword)