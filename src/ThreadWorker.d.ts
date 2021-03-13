/* ThreadWorker */

declare module "SIL_ThreadWorker" {
    function ThreadWorker(func: VoidFunction, params: Array<any>, tNumber: number): string

    export {
        ThreadWorker
    };
}