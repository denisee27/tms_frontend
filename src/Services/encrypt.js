import { AES, enc } from 'crypto-ts';
import { environment } from '../environtments/environtment';

export const EncryptService = {
    encrypt(stringToEncrypt) {
        return AES.encrypt(stringToEncrypt, environment.appKey).toString();
    },
    decrypt(stringToDecrypt) {
        try {
            const decrypted = AES.decrypt(stringToDecrypt, environment.appKey).toString(enc.Utf8);
            return decrypted;
        } catch (e) {
            return null;
        }
    }
};
