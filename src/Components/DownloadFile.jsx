import axios from "axios";
import { showErrorToast } from "./Toast";

const DownloadFile = async (filePath) => {
    const download_url = `http://192.168.0.112:8080/file/download?path=${encodeURIComponent(filePath)}`;
    await axios.get(
        download_url,
        {timeout:20000},
        {Headers:{
            'Content-Type': 'application/octet-stream',
        }}
        ).then(
        async (response)=>{
            if(response.status===200){
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href =url;
                link.setAttribute("download",filePath);
                document.body.appendChild(link);
                link.click();
            }
        }
    )
    .catch((e)=>{
        if(e.response){
            showErrorToast(`${e.response.data}`);
            console.error('Error while Download File!',e.response.data);
        }else{
          showErrorToast('Server Unreachable!');
        }
    });
}

export default DownloadFile;