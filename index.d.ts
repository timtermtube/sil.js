declare module "siljs" {
    import { SILSupport } from "SIL_Support"
    import { SIL } from "SIL_Core"

    interface Wrapper {
        THREADS: Array<SIL>;
        newThread(func: Function, name: string, params: Array<any>, return_callback: Function): SIL
    }

    const THREADS: Array<SIL>;
    const __: Wrapper

    export default __;
}