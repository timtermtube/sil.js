/* Sil = Thread */

declare module "SIL_Core" {
    import { ThreadWorker } from "SIL_ThreadWorker";
    import { encrypt, decrypt } from "SIL_Cryption";

    interface __SIL {
        __TEMPURL: string;
        __WORKER: Worker;
        name: string,
        number: number,
        sendAndBack: VoidFunction,
        __RETURNCALLBACK: VoidFunction
    }

    class SIL implements __SIL {
        public __WORKER: Worker;
        public name: string;
        public number: number;
        public __TEMPURL: string;
        public sendAndBack: VoidFunction;
        public __RETURNCALLBACK: VoidFunction;

        constructor(func: VoidFunction, name: string, params: Array<any>, number: number, returnCB: VoidFunction);

        killThis(): never
    }

    export {
        SIL
    };
}