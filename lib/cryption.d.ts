declare module "cryption" {
    function encrypt(string: string): Array<Number>;
    
    function decrypt(array: Array<Number>): string;

    export default {encrypt, decrypt};
}