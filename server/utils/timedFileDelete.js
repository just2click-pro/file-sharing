const fs = require("fs")
const path = require("path")

const scanFolder = (folder, filesLog) => {
  let lastInterval

  if (filesLog) {
    clearInterval(lastInterval)
    lastInterval = setInterval(() => {
      filesLog.forEach((file) => {
        if (file.isAlive) {
          const filepath = path.join(folder, file.name)

          fs.stat(filepath, function (err, stat) {
            const now = new Date().getTime()
            const endTime = file.timeToDlete

            if (err) {
              // In case of error stop
              clearInterval(lastInterval)
              return console.error(err)
            }

            if (now > endTime) {
              console.log("DEL: ", filepath)
              return fs.unlink(filepath, function (err) {
                if (err) return console.error(err)
                file.isAlive = false
              })
            }
          })
        }
      })
    }, 1000)
  }
}

module.exports = {
  scanFolder,
}
