import * as React from "react"
import { ThemeProvider, theme, CSSReset, StylesProvider } from "@chakra-ui/react"

function MyApp({ Component, pageProps }:  any) {
  return (
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
  )
}

export default MyApp
