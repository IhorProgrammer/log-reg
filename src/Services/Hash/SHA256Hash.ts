import { sha256 } from 'js-sha256';

export default function SHA256Hash( message: string ) {
    const hash = sha256.hmac.create(message).hex()
    console.log(hash);
    return hash;  

}