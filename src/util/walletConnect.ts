import { clusterApiUrl, Connection, NonceAccount, PublicKey } from "@solana/web3.js";
import Wallet from "@project-serum/sol-wallet-adapter";


export let walletConnect = async () => {
    const network = clusterApiUrl('devnet');
    const connection = new Connection(network);
    const providerUrl = 'https://www.sollet.io';
    const wallet = new Wallet(providerUrl, network);
    interface WalletInfo {
        walletConnection: string,
        walletPublicKey: null | string
    }
    var walletStatus:WalletInfo = {
        walletConnection:"Disconnected",
        walletPublicKey: null

    }
    wallet.on('connect', publicKey => {
        walletStatus.walletConnection = "Connected";
        walletStatus.walletPublicKey = publicKey.toBase58();
        console.log('Connected to ' + walletStatus.walletPublicKey);
        return walletStatus
    });
    wallet.on('disconnect', () => console.log('Disconnected'));
    await wallet.connect();

    return walletStatus;
}