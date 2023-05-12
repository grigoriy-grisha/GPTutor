class AESCipher {
  async decodeMessage(encodedMessage: string) {
    const aesKey = new TextEncoder().encode(process.env.REACT_APP_SECRET_KEY);

    const [iv, encrypted] = encodedMessage
      .split(":")
      .map((str) => Uint8Array.from(atob(str), (char) => char.charCodeAt(0)));

    const aesKeyCrypto = await window.crypto.subtle.importKey(
      "raw",
      aesKey,
      { name: "AES-CBC" },
      false,
      ["decrypt"]
    );

    const decryptedMessage = await window.crypto.subtle.decrypt(
      { name: "AES-CBC", iv: iv },
      aesKeyCrypto,
      encrypted
    );

    return new TextDecoder().decode(decryptedMessage);
  }
}

export const aesCipher = new AESCipher();
