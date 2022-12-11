import React, { FC, DragEvent, useState, useRef } from "react"
import { Box, Button } from "@mui/material"

export type UploadProps = {
  onFileUpload: (file: File, name: string) => void
  imageName: string
}

const UploadFile: FC<UploadProps> = ({
  onFileUpload,
  imageName,
}): React.ReactElement => {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = function (event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true)
    } else if (event.type === "dragleave") {
      setDragActive(false)
    }
  }
  const handleDrop = function (event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    setDragActive(false)
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      onButtonClick()
    }
  }

  const onButtonClick = () => {
    if (inputRef.current !== null) {
      inputRef.current.click()
    }
  }

  const changeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<any> => {
    const files = event.target.files
    if (files && files.length > 0) {
      imageName = event.target.value.split("\\")[2]
      const fileLoaded = files[0]
      if (fileLoaded) {
        onFileUpload(fileLoaded, event.target.value.split("\\")[2])
      }
    }
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        id="form-file-upload"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          style={{ visibility: "hidden" }}
          ref={inputRef}
          type="file"
          onChange={changeHandler}
          accept="image/jpg,.gif,.png,.jpeg"
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? "drag-active" : ""}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingBottom: "16px",
            }}
          >
            FileName: {imageName} <br />
            <p>Drag and drop your file here or</p>
            <Button variant="contained" color="info" onClick={onButtonClick}>
              Upload a file
            </Button>
          </Box>
        </label>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </form>
    </Box>
  )
}

export default UploadFile
