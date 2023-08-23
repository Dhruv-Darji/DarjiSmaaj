const ImageUrlGiver = (filePath) =>{
    if(filePath){
        const correctedFilePath = filePath.replace(/\\/g, '/');
        return `http://192.168.0.112:8080/${correctedFilePath}`;
    }    
}

export default ImageUrlGiver;