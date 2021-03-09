declare module "crypton" {
    function encrypt(string: string): Array;
    
    function decrypt(array: Array): string;

    export {encrypt, decrypt};
}