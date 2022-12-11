// src/components/Card.tsx

import React, { FC, ReactElement, useEffect, useState, useRef } from "react"
import axios from "axios"
import {
  Box,
  Button,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Modal,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"

import { Close, LibraryAdd } from "@mui/icons-material"
import { CopyToClipboard } from "react-copy-to-clipboard"

import Upload from "./Upload"

export const SUPPORTED_IMAGE_TYPES = ["JPG", "PNG", "GIF", "JPEG"]

interface ModalProps {
  open: boolean
  onClose: () => void
}

export const CardComponent: FC = (): ReactElement => {
  const SERVER_URL = "http://localhost:5000/v1"

  const [file, setFile] = useState<string | Blob>()
  const [fileName, setFileName] = useState<string>("")

  const [timeExpire, setTimeExpire] = useState(0)
  const [fileSelected, setFileSelected] = useState(false)
  const [canUpload, setCanUpload] = useState(false)

  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const timeExpireRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (file: File, name: string) => {
    setFileSelected(true)
    setFile(file)
    setFileName(name)
  }

  const handleTimeToExpireChange = (value: string) => {
    if (value) {
      const numericValue = parseInt(value, 10)
      setTimeExpire(numericValue)
    } else {
      setTimeExpire(0)
    }
  }

  const handleUpload = () => {
    const formData = new FormData()
    if (file) {
      const timeToExpireInMinutes = timeExpire * 60 * 60
      formData.append("name", fileName)
      formData.append("timeExpire", timeToExpireInMinutes.toString())
      formData.append("image", file, fileName)
      axios.post(`${SERVER_URL}/file`, formData).then((res) => {
        console.log("Axios POST request successful!")
        setOpen(true)
      })
    }
  }

  const handleOnClose = () => {
    setOpen(false)
  }

  const getLinkToFile = () => {
    return `${SERVER_URL}/${fileName}`
  }

  const ModalDialogContent = (props: Pick<ModalProps, "onClose">) => {
    const { onClose } = props
    return (
      <Paper sx={{ px: 2, py: 2, display: "flex", flexDirection: "column" }}>
        {/*MenuBar could be reused*/}
        <Stack sx={{ alignItems: "center" }} direction={"row"} gap={1}>
          <Typography fontWeight={"bolder"}>Get Image Link</Typography>
          <Box flexGrow={1} />
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>
        <CopyToClipboard text={getLinkToFile()} onCopy={() => setCopied(true)}>
          <span>
            <IconButton>
              <LibraryAdd />
            </IconButton>
            Link: {getLinkToFile()}
          </span>
        </CopyToClipboard>
      </Paper>
    )
  }

  const ModalDialog = (props: ModalProps) => {
    const { open, onClose } = props

    return (
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: 600,
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        >
          <ModalDialogContent onClose={onClose} />
        </Box>
      </Modal>
    )
  }

  useEffect(() => {
    setCanUpload(timeExpire > 0 && fileSelected)
  }, [fileSelected, timeExpire])

  useEffect(() => {
    if (copied && !open) {
      setFile("")
      setTimeExpire(0)
      if (timeExpireRef.current !== null) {
        const inputElement: HTMLInputElement = timeExpireRef.current.children[1]
          .children[0] as HTMLInputElement
        inputElement.value = ""
      }
      setFileName("")
    }
  }, [copied, open])

  return (
    <React.Fragment>
      <div style={{ margin: 100 }}>
        <Card raised={true} sx={{ maxWidth: 500 }}>
          <CardContent sx={{ bgcolor: "#E8E8E8" }}>
            <Box sx={{ border: "1px dashed #ccc" }}>
              <Upload
                onFileUpload={(file, name) => handleFileUpload(file, name)}
                imageName={fileName}
              />
            </Box>
          </CardContent>
          <CardContent sx={{ bgcolor: "#E8E8E8" }}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "50ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                type="number"
                id="filled-basic"
                label="Time to Expire"
                placeholder="File Expiry Time (in minutes)"
                onChange={(e) => handleTimeToExpireChange(e.target.value)}
                variant="filled"
                data-testid="retentaion-time-input"
                ref={timeExpireRef}
              />
            </Box>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title="Upload or drag a file and add expiry in seconds">
              <span>
                <Button
                  variant="contained"
                  color="success"
                  disabled={!canUpload}
                  onClick={handleUpload}
                >
                  Upload
                </Button>
              </span>
            </Tooltip>
          </CardActions>
        </Card>
        <ModalDialog open={open} onClose={handleOnClose} />
      </div>
    </React.Fragment>
  )
}

export default CardComponent
