import express from "express";
import mongoose from "mongoose";
import cors from "cors"
const app = express();
import "dotenv/config";
const PORT = process.env.PORT;
const MONGOOSE_URL = process.env.MONGOOSE_URL;
import userRoute from "./routes/userRoute.js"
import blogRoute from "./routes/blogRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import fileUpload from "express-fileupload";



mongoose
  .connect(MONGOOSE_URL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });


app.use(fileUpload({useTempFiles:true}))
app.use(cors());
app.use(express());
app.use(express.json());
app.use("/user", userRoute)
app.use("/blog", blogRoute)
app.use("/category", categoryRoute)



app.get("/", (req, res) => {
  res.send("server started");
});
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
