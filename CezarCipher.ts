// Note: please restart the page if syntax highlighting works bad.

interface IEncrypter {
    caracteres: Array<string>;
    key: number;
    encript: (plainText: string) => string;
    decipher: (cipherText: string) => string;
  }
  
  class Encrypter implements IEncrypter {
    public caracteres: string[] = []
  
    public key: number;
  
    constructor(key: number) {
      this.key = key;
      let caracteresTemp: string[] = []
      for (let i = 32; i < 127; i++) {
        caracteresTemp.push(String.fromCharCode(i));
      }
      this.caracteres = caracteresTemp
    }
    public replaceAll(text: string, find: string, replace: string) {
      while (text.toString().indexOf(find) != -1)
        text = text.toString().replace(find, replace);
      return text;
    }
    public encript(plainText: string) {
      let caracteres = [...plainText]
      let newCaracteres: string[] = []
  
      for (var i = 0; i < caracteres.length; i++) {
        newCaracteres.push(this.caracteres[this.caracteres.indexOf(plainText.charAt(i)) + this.key])
      }
      let cipherText = newCaracteres.toString()
  
      return this.replaceAll(cipherText, ',', '')
    }
  
    public decipher(cipherText: string) {
  
      let caracteres = [...cipherText]
      let newCaracteres: string[] = []
  
      for (var i = 0; i < caracteres.length; i++) {
        newCaracteres.push(this.caracteres[this.caracteres.indexOf(cipherText.charAt(i)) - this.key])
      }
      let plainText = newCaracteres.toString()
  
      return this.replaceAll(plainText, ',', '')
    }
  };
  let characters = [];
  
  
  let encrypter = new Encrypter(4);
  
  console.log('texto cifrado', encrypter.encript('texto'))
  
  let textoCifrado = encrypter.encript('texto')
  console.log('texto decifrado', encrypter.decipher(textoCifrado))
  
  console.log('texto decifrado', encrypter.key)
  