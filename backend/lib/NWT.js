const crypto = require('crypto');


class NWT {  

    constructor(){
        return NWT;
    }
  
  static createToken(payload, secretKey,expiresIn) {
 
    const header = {
      alg: 'HS256',
      typ: 'NWT'
    };

    const expirationTime = Date.now() + expiresIn * 1000; // Convert expiresIn to milliseconds and calculate expiration time
    payload.exp = Math.floor(expirationTime / 1000); // Add expiration time to the payload

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
      throw new Error('Invalid signature');
    }

    const decodedPayload = JSON.parse(NWT.prototype.base64UrlDecode(encodedPayload));

    if (decodedPayload.exp && decodedPayload.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Token has expired');
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
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(data);
    const signature = hmac.digest('base64');
    return this.base64UrlEncode(signature);
  }

}

module.exports = NWT;