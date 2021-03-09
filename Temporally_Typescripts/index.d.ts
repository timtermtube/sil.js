declare module "SIL" {
    import { encrypt, decrypt } from "SILCryption";
    import { SIL } from "SIL_Core";

    interface SILInterface {
        _getWorkerScriptPath(): string;
        newThread(method: Function, name: string, params: Array<any>): SIL
    }

    const SILJS: SILInterface 
}