import { ethers } from "ethers";
import { dangerToast, successToast } from "./toasts";


export function initCheck(){
    document.getElementById("perform_check").addEventListener("click", async function(){
        const search = document.getElementById("check_certificate").value
        if (search != ''){
            console.log("performing Check")
            performCheck(search)
        } else {
            dangerToast("Provide Search String")
        }
    })
}

async function performCheck(searchHash){
    const api = "AATAA11Z9142QGU3N9T9I8899N1Y1ZZ6XF"
    let provider = new ethers.providers.EtherscanProvider("rinkeby", api);
    try {
        const blockData = await provider.getTransaction(searchHash)
        const data = window.parseInputData(blockData.data)
        if (data){
            successToast("Document exists")
            handleCheckSuccess(data)
        }
    } catch (e){
        console.log(e)
        dangerToast("This code cannot be verified")
    }
    // window.parseInputData(item.data)
}

function handleCheckSuccess(data){
    const issuerId = data.inputs[0]
    const link = data.inputs[1]
    sendToDatabase(issuerId, link)
}

function sendToDatabase(issuerId, link){
    var form = document.createElement("form");
    var element1 = document.createElement("input"); 
    var element2 = document.createElement("input");
    var element3 = document.createElement("input");  

    form.method = "POST";
    // form.action = "login.php";   

    element1.value=issuerId;
    element1.name="issuerId";
    form.appendChild(element1);  

    
    element2.value=link;
    element2.name="link";
    form.appendChild(element2);

    const csrf = document.querySelector("input[name='csrfmiddlewaretoken']").value

    element3.value=csrf
    element3.name="csrfmiddlewaretoken"
    form.appendChild(element3)

    document.body.appendChild(form);

    form.submit();
    
}


