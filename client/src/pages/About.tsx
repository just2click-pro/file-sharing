// src/pages/Home.tsx

import React, { ReactElement, FC } from "react"
import {
  Box,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material"

const About: FC<any> = (): ReactElement => {
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
        <div style={{ margin: 100 }}>
          <Card raised={true} sx={{ maxWidth: 800 }}>
            <Typography variant="h5" fontSize="md" sx={{ mb: 0.5, px: 1.5 }}>
              Cyolo Image Sharing Demo - Data
            </Typography>
            <CardContent sx={{ bgcolor: "#E8E8E8" }}>
              <Typography variant="body2">By Dror Avidov</Typography>
              <Typography variant="h6">Technological Stack:</Typography>
              <Typography variant="body2">
                * Client side: React (FC), MUI
              </Typography>
              <Typography variant="body2">
                * Server side: Node.js, Express
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Box>
    </Box>
  )
}

export default About
