import { SILSupport } from "./src/SILSupport.js"
import { SIL } from "./src/SIL.js"

const THREADS = [];
const __ = {};

if (SILSupport()) {
    __.THREADS = THREADS;
    __.newThread = (func, name="WorkingAnt", params=[], return_callback=()=>{}) => {
        if (typeof func == "function") {
            const T = new SIL(func, name, params, THREADS.length, return_callback);
            THREADS.push(T);
            return T;
        }
        else {
            console.error("[SIL] [newThread] It requires a function to create a thread.");
        }
    };
}

export default __;