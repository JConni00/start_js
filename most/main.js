// import { upload, uploadFile } from './js/upload'
import { initCheck } from './js/handleCheck';
import { initUpload } from './js/upload-functions'
import './style.css'


if (document.getElementById("upload") !== null){
  console.log("INIT UPLOADER")
    initUpload();
} 
if (document.getElementById("check_certificate") !== null){
    console.log("IM HERE WORKING")
    initCheck();
}






