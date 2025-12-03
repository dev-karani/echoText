import multer from "multer"
import path from "path"

//temporary storage -  local file system
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads/")
    },
    filename:(req,res,file,cb) =>{
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext)
    }
})

//optional filter. (ony alllow pdf and text now)
const fileFilter = (req, file, cb)=>{
    const allowed = ['application/pdf', 'text/plain'];
    if (allowed.includes(file.mimetype)){
        cb(null, true);
    } else{
        cb(newError("Unsupported file type"), false);
    }
}

//final middleware setup
const uploadMiddleware = multer({
    storage, fileFilter
});

export default uploadMiddleware



