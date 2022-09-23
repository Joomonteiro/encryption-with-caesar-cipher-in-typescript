interface IEncrypter {
  alfabeto: Array<string>;
  key: number;
  encript: (plainText: string) => string;
  decipher: (cipherText: string) => string;
}

class Encrypter implements IEncrypter {
  public alfabeto: string[] = []

  public key: number;

  constructor(key: number) {
      this.key = key;
      let caracteresTemp: string[] = [];
      
      // Alfabeto de a-z A-Z ' ' , e .
      for (let i = 32; i < 127; i++) {
          if (String.fromCharCode(i).match(/[a-zA-Z]/g)) {
              caracteresTemp.push(String.fromCharCode(i));
          }
      }
      caracteresTemp.push(' ')
      caracteresTemp.push(',')
      caracteresTemp.push('.')
      this.alfabeto = caracteresTemp
  }

  public replaceAll(text: string, find: string, replace: string) {
      while (text.toString().indexOf(find) != -1)
          text = text.toString().replace(find, replace);
      return text;
  }

  public encript(plainText: string):string {

      if(!plainText.match(/^[a-zA-Z,.\s]*$/)){
          throw 'Texto inválido'
      }

      let cipherText: string = '';
      let newCaracteres: string[] = []

      let plainTextCaracteres = plainText.split('');

      for (var i = 0; i < plainTextCaracteres.length; i++) {
          let caracterNaFrase = plainText.charAt(i)
          let indiceDoCaracterNoAlfabeto = this.alfabeto.indexOf(caracterNaFrase)

          let somaIndiceEChave = indiceDoCaracterNoAlfabeto + this.key

          let moduloDaSomaComOComprimentoDoAlfabeto = somaIndiceEChave % this.alfabeto.length

          let caracterDoIndiceNoAlfabeto = this.alfabeto[moduloDaSomaComOComprimentoDoAlfabeto]

          newCaracteres.push(caracterDoIndiceNoAlfabeto)

      }

      newCaracteres.forEach(caractere => {
          cipherText += caractere
      })

      return cipherText
  }

  public decipher(cipherText: string) {
      let plainText: string = '';
      let caracteres = [...cipherText]
      let newCaracteres: string[] = []

      for (var i = 0; i < caracteres.length; i++) {

          let caracterNaFrase = cipherText.charAt(i)

          let indiceDoCaracterNoAlfabeto = this.alfabeto.indexOf(caracterNaFrase)

          let chaveMenosOIndice = indiceDoCaracterNoAlfabeto - this.key

          if (chaveMenosOIndice < 0){
              let numeroPositivo = Math.abs(chaveMenosOIndice)

              let numeroMenosComprimentoDoAlfabeto = this.alfabeto.length - numeroPositivo

              newCaracteres.push(this.alfabeto[numeroMenosComprimentoDoAlfabeto])

          } else {

              newCaracteres.push(this.alfabeto[chaveMenosOIndice])
          }

      }

      newCaracteres.forEach(caractere => {
          plainText += caractere
      })

      return plainText
  }
};

// Altere a chave aqui
let chave = 2

let encrypter = new Encrypter(chave);

// Altere o texto aqui
let plainText = 
'ola este é um teste, para testar a encriptacao com a cifra de cezar.';

console.log('chave', encrypter.key)

console.log('texto claro', plainText)

let textoCifrado = encrypter.encript(plainText)

console.log('texto cifrado', textoCifrado)

let textoDecifrado = encrypter.decipher(textoCifrado)

console.log('texto decifrado', textoDecifrado)

