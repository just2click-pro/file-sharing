const express = require("express")
const fileupload = require("express-fileupload")
const fs = require("fs")
const bodyParser = require("body-parser")
const path = require("path")
const cors = require("cors")
const { v4: uuidv4 } = require("uuid")

const { scanFolder } = require("./utils/timedFileDelete")

require("dotenv").config()

const filesLog = []

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.use(
  fileupload({
    limits: {
      fileSize: 10000000, // Around 10MB
    },
    abortOnLimit: true,
  })
)

const port = parseInt(process.env.PORT, 10) || 4000

app.post("/v1/file", (req, res) => {
  // Get the file that was set to our field named "image"
  const { timeExpire, name } = req.body

  const { image } = req.files

  // If no image submitted, exit
  if (!image) return res.sendStatus(400)

  // If does not have image mime type prevent from uploading
  // if (/^image/.test(image.mimetype)) return res.sendStatus(400)

  const id = uuidv4().replace(/-/g, "")
  const timestamp = new Date().getTime()
  const timeToExpire = parseInt(timeExpire, 10)
  const fileLog = {
    id,
    timestamp,
    name,
    timeToDlete: timestamp + timeToExpire,
    isAlive: true,
  }

  image.mv(__dirname + "/uploads/" + image.name)

  filesLog.push(fileLog)

  scanFolder(__dirname + "/uploads/", filesLog)

  res.sendStatus(200)
})

app.get("/v1/:filename", (req, res) => {
  const fileName = req.params.filename

  const filePath = path.join(`${__dirname}/uploads/${fileName}`)

  try {
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath)
    } else {
      res.status(404).send(`File: ${fileName} is no longer available`)
    }
  } catch (err) {
    res
      .status(404)
      .send(`File: ${fileName} is no longer available, error: ${err}`)
    console.error("File fetch failed, ", err)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
