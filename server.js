const express = require("express");
const connectDb = require("./Config/dbConnection");
const multer = require("multer")
const path = require("path");
const errorHandler = require("./Middleware/errorHandler");

const cors = require("cors"); 

const app = express();

const dotenv = require("dotenv");
dotenv.config();

let uploadedFilePath = null;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage})

connectDb(); 

const port = process.env.PORT || 5000;

var hbs=require('hbs');
hbs.registerPartials(__dirname+'/views/partials',function(err){});
app.set('view engine','hbs');

app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Working");
});

app.get("/home", (req, res) => {
    res.render("home", {
        username: "perkyPearl",
        posts: "Welcome to My First Post",
        avatar: uploadedFilePath
    });
});

app.get("/allusers",(req,res)=>{
    const users=[

    ];
    res.render("allusers",{
       users:users
    });
});

app.post("/profile", upload.single("avatar"), (req, res, next) => {
    uploadedFilePath = `/uploads/${req.file.filename}`; 
    res.redirect("/home");
});

app.use("/api/",require("./Routes/userRoutes"));
// app.use("/api/doctor",require("./Routes/"));

app.listen(port,()=> {
    console.log(`Server is running on port http://localhost:${port}`);
});