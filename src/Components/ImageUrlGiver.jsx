const ImageUrlGiver = (filePath) =>{
    if(filePath){
        const correctedFilePath = filePath.replace(/\\/g, '/');
        const api_key = process.env.REACT_APP_API_KEY;
        return `${api_key}/${correctedFilePath}`;
    }    
}

export default ImageUrlGiver;