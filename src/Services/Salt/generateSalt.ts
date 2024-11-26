import { lib } from 'crypto-ts'

/**
 * Random salt generation.
 * @param length Salt length in bytes. Default is 8 bytes.
 * @returns Salt as a hexadecimal string.
 */
export default function generateSalt(saltRounds: number = 8): string {
    const randomBytes = lib.WordArray.random(saltRounds); 
    return randomBytes.toString(); 
}
  