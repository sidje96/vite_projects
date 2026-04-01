import express from "express"
import multer from "multer"
import path from "path"
import cors from "cors"

const app = express()
app.use(cors())

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, unique + ext)
  }
})

const upload = multer({ storage })

app.post("/upload", upload.single("file"), (req, res) => {
  const fileUrl = `/uploads/${req.file.filename}`
  res.json({ url: fileUrl })
})


app.use("/uploads", express.static("uploads"))

app.listen(4000, () => console.log("Upload server running on port 4000"))