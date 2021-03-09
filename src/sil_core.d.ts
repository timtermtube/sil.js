declare module "SIL_Core" {
    class SIL {
        constructor(scriptsrc: string, working: VoidFunction, name: string, params: Array<any>)

        kill(): never
    }

    export { SIL };
}