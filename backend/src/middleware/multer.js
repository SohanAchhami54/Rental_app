// const multer=require('multer');
// //multer to add the image file in the request.

// //"Hey Multer, store the uploaded image temporarily in the disk (file system)."

// //A user uploads an image ➝ Multer grabs it ➝ puts it temporarily on disk ➝ attaches it to req.file ➝ now you can read it in the controller.
// exports.upload=multer({storage:multer.diskStorage({})});
// //tells multer to store files on disk temporarily.
//  import multer from 'multer';

// const upload = multer({ storage: multer.diskStorage({}) });

// export { upload };  


import multer from 'multer' //multer saves the image to disk.
const storage=multer.diskStorage({ 
    filename:function(req,file,callback){
        //callback function provided by multer.
        callback(null,file.originalname)
    }   
})

const upload=multer({storage})
export {upload}



