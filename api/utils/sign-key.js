import crypto from "crypto";

function decodeBase64(base64String) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(base64String, "base64").toString("utf-8");
  }
}

export function signWithKey(stringToSign, key, passphrase) {
  const privateKey = {
    key: decodeBase64(key),
    passphrase: passphrase,
  };

  // Create a sign object and specify the SHA-256 algorithm
  const sign = crypto.createSign("SHA256");
  sign.update(stringToSign);
  // Sign the hash with the private key and output in Base64 format
  const signature = sign.sign(privateKey, "base64");
  return signature;
}

export function verifySign(signature, stringifiedSchema, publicKey){

  const menssage = stringifiedSchema;

  // Firma digital en base64
  const signBase64 = signature; // La firma digital en base64 que recibiste

  // Clave pública en formato PEM
  const publicKeyPEM = decodeBase64(publicKey); // Ruta al archivo .crt de la clave pública

  // Decodificar la firma de base64 a Buffer
  const bufferSign = Buffer.from(signBase64, 'base64');

  // Crear un objeto verifier con la clave pública
  const verifier = crypto.createVerify('SHA256');
  verifier.update(menssage);

  // Verificar la firma
  const result = verifier.verify(publicKeyPEM, bufferSign);
  console.log('RESULT!!!!!')
  console.log(result)
  return result;
}
