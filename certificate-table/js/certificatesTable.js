import { loadCertificatesForWallet } from "./loadCertificates";
import { ethers } from 'ethers';

function getWalletId(){
    const holder = document.querySelector("span#walletId")
    return holder.innerHTML;
}

export async function loadCertificatesTable(holder="#app"){
    if (document.querySelector(holder) !== null){
        const walletId = getWalletId(); 
        console.log(walletId);
        const certificates = await loadCertificatesForWallet(walletId);
        const html = await renderCertificates(certificates);
        document.querySelector(holder).innerHTML = html;
    } else {
        console.log("Did not find div to hold table")
    }
}

async function renderCertificates(certificates){
    let s = '<table class="table">';
    s+='<thead><tr><th scope="col">#</th><th scope="col">Date</th><th>Link</th></tr></thead><tbody>'
    console.log(certificates)
    certificates.forEach((item, index) => {
        const data = window.parseInputData(item.data)
        let link = false
        if (data && data.method !== null){
            link = data.inputs[1]
        }

        console.log(link)
        console.log(data);
        var date = new Date(item.timestamp * 1000);
        date = transformDate(date)
        s += '<tr>'
        s += '<th scope="row">' + (index+1) + '</th>'
        s += '<td>' + date + '</td>'
        if (link){
            s += '<td><a href="' + link + '" target="_blank" class="btn">Ansehen</a></td>'
        } else {
            s += '<td>Fehler</td>'
        }
    })
    s+='</tbody></table>'
    return s;
}

function transformDate(date){
    var dateStr =
  ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
  ("00" + date.getDate()).slice(-2) + "/" +
  date.getFullYear() + " " +
  ("00" + date.getHours()).slice(-2) + ":" +
  ("00" + date.getMinutes()).slice(-2) + ":" +
  ("00" + date.getSeconds()).slice(-2);
console.log(dateStr);
    return dateStr;
}