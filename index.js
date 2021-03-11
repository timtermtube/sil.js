import { SILSupport } from "./src/SILSupport"
import { SIL } from "./src/SIL"

const THREADS = [];
const __ = {};

if (SILSupport()) {
    __.THREADS = THREADS;
    __.newThread = (func, name="WorkingAnt", params=[]) => {
        if (typeof func == "function") {
            const T = new SIL(func, name, params, THREADS.length);
            THREADS.push(T);
            return T;
        }
        else {
            console.error("[SIL] [newThread] It requires a function to create a thread.");
        }
    };
}

export default __;