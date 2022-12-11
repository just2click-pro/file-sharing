import { Box, Container, CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { routes as appRoutes } from "./routes"
import Navbar from "./components/Navbar"
import FooterComponent from "./components/Footer"

import theme from "./theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false}>
        <Box height="100vh" display="flex" flexDirection="column">
          <Router>
            <Navbar />
            <Routes>
              {appRoutes.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
            <FooterComponent />
          </Router>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
