declare module "SIL" {
    import { encrypt, decrypt } from "SILCryption";
    import { SIL } from "SIL_Core";

    interface SIL_RunningClass {
        _getWorkerScriptPath(): string;
        newThread(method: VoidFunction, name: string, params: Array<any>): SIL;
    }

    const ProjectName: string;
    var SILX: SIL_RunningClass;

    export default SILX;
}