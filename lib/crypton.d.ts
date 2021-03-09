declare module "crypton" {
    function encrypt(string: string): Array<Number>;
    
    function decrypt(array: Array<Number>): string;

    export {encrypt, decrypt};
}