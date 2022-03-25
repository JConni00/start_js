import { makeStorageClient } from "./client";
import { dangerToast } from "./toasts";

export function initUpload(){ // here could input the id and then put into window.mintNFT
    const uploader = document.getElementById("upload")
    uploader.addEventListener('change', async function(){
    console.log("Attempting to read file")
    const selectedFile = uploader.files[0];
    const name = new Date().valueOf() + '.' + getFileExt(selectedFile);
    const renamedFile = new File([selectedFile], name, {type: selectedFile.type});

    switchOffButton();
    const cid = await upFile(renamedFile)
    switchOnButton();

    console.log(cid)
    document.getElementById("cid").value = 'https://ipfs.io/ipfs/' + cid + '/' + name;
    })



    const submitter = document.querySelector("form#fileform")
    submitter.addEventListener('submit', async function(e){
    e.preventDefault();
    console.log("Minting File")
    const cid = getCid()
    const result = await window.mintNFT(cid)
    if (result){
        Toastify({
        text: "Document was placed on blockchain",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        }).showToast();

        document.getElementById("hash_value").value = result;
        
        this.submit();


    } else {
        dangerToast("Did not work!")
    }
    })
}


async function storeFiles (files) {
    const client = makeStorageClient()
    const cid = await client.put(files)
    console.log('stored files with cid:', cid)
    return cid
  }
  
  function getFileExt(file){
    const name = file.name;
    const parts = name.split(".")
    const end = parts[parts.length - 1]
    return end;
  }
  
  async function upFile(file){
    const files = [file]
    return await storeFiles(files)
  }

function switchOffButton(){
    let btn = document.querySelector("button[type='submit']")
    btn.innerHTML = '<span class="spinner-border"></div>';
    btn.disabled = true;
  }
  
  function switchOnButton(){
    let btn = document.querySelector("button[type='submit']")
    btn.innerHTML = "Submit"
    btn.disabled = false
  }

  function getCid(){
    let cid = document.getElementById("cid")
    return cid.value;
  }
