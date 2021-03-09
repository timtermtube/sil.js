declare module "cryption" {
    export function encrypt(string: string): Array<Number>;
    
    export function decrypt(array: Array<Number>): string;
}