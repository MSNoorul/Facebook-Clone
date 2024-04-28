const { log } = require('console');
const crypto = require('crypto');


class NWT {  

    constructor(){
        return NWT;
    }
  
  static createToken(payload, secretKey,expiresIn) {
 
    const header = {
      alg: 'SH256',
      typ: 'NWT'
    };

    const expirationTime = Date.now() + expiresIn; 
    payload.exp = expirationTime; // Add expiration time to the payload

    const encodedHeader =  NWT.prototype.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = NWT.prototype.base64UrlEncode(JSON.stringify(payload));

    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const signature = NWT.prototype.signData(signatureInput , secretKey);

    const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;

    return jwt;
  }

  static verifyToken(token,secretKey) {

    const [encodedHeader, encodedPayload, signature] = token.split('.');
    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const expectedSignature = NWT.prototype.signData(signatureInput,secretKey);

    if (signature !== expectedSignature) {
      return false
    }

    const decodedPayload = JSON.parse(NWT.prototype.base64UrlDecode(encodedPayload));

    if (decodedPayload.exp && decodedPayload.exp < Date.now() ) {
      return false
    }

    return decodedPayload;
  }

  
  base64UrlEncode(str) {
    const base64 = Buffer.from(str).toString('base64');
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  base64UrlDecode(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    const paddingLength = 4 - (str.length % 4);
    const padding = '='.repeat(paddingLength);
    const base64 = str + padding;
    return Buffer.from(base64, 'base64').toString();
  }

  signData(data ,secretKey) {
    return  crypto.createHmac('sha256', secretKey)
    .update(data).digest('base64url')
  }

}

module.exports = NWT;