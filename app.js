const express = require("express");
const dotenv = require("dotenv");
dotenv.config({web:'./.env'});
const database = require("./db/connectiontDb");
const route = require("./routes/web")
const cookieParser = require("cookie-parser")
const cloudinary=require("cloudinary").v2


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLINT_NAME,
    api_key:process.env.CLOUDINARY_CLINT_API,
    api_secret:process.env.CLOUDINARY_CLINT_SECRET,
  });


const app = express();

const cors = require("cors");
app.use(cors(
    {
      origin: "https://pninfosyss.netlify.app",
      credentials:true,
    }
  ));

  const fileupload = require("express-fileupload");
//file upload
app.use(fileupload({ useTempFiles: true }));

// Connect to database
database();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api",route)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});