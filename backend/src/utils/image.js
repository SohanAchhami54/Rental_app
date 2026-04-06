import imagekit from '../config/imagekit.js'
const imageUpload=async({file,fileName,folder})=>{
     const response = await imagekit.upload({
      file,
      fileName,
      folder
    });
    return response
}

const optimizedImage=(response)=>{
   const url= imagekit.url({
     path:response.filePath,
     transformation: [
        { width: '1280' },
        { quality: 'auto' },
        { format: 'webp' }, 
     ],
   })
   return url
}



export {imageUpload,optimizedImage}