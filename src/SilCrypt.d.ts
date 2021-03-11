/* Silcrypt */

declare module "SIL_Cryption" {
    function encrypt(string: string): Array<number>;

    function decrypt(array: Array<number>): string;

    export {
        encrypt,
        decrypt
    };
}