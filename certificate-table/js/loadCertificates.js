import { ethers, Wallet } from 'ethers';



export async function loadCertificatesForWallet(walletId){
    const api = "AATAA11Z9142QGU3N9T9I8899N1Y1ZZ6XF"
    let provider = new ethers.providers.EtherscanProvider("rinkeby", api);
    let history = await provider.getHistory(walletId);
    console.log(history)
    return history
  }