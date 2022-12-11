// src/pages/Home.tsx

import React, { ReactElement, FC } from "react"
import { Box, Typography } from "@mui/material"

import CardComponent from "../components/Card"

const Home: FC<any> = (): ReactElement => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">
          Drag and drop or upload an image file
        </Typography>
        <CardComponent />
      </Box>
    </Box>
  )
}

export default Home
