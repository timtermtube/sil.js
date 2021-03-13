/* Sil = Thread */
import { ThreadWorker } from "./ThreadWorker.js";
import { encrypt, decrypt } from "./SilCrypt.js"

class SIL {
    constructor(func, name="WorkingAnt", params=[], number=0, returnCB=()=>{}) {
        const BLOB = new Blob([ThreadWorker(func, params, number)], {
            type: "application/javascript"
        });
        this.__TEMPURL = URL.createObjectURL(BLOB);
        this.__WORKER = new Worker(this.__TEMPURL);
        this.__RETURNCALLBACK = returnCB;
        this.__WORKER.onmessage = (ms) => {
            const DATA = JSON.parse(decrypt(ms.data));
            if (DATA["method"] == "selfkill") {
                this.killThis();
            }
            else if (DATA["method"] == "send") {
                if (typeof this.sendAndBack == "function") {
                    this.sendAndBack(data);
                }
            }
            else if (DATA["method"] == "beReturned") {
                if (typeof this.__RETURNCALLBACK == "function") {
                    this.__RETURNCALLBACK(DATA);
                }
            }
        }
        this.name = name;
        this.number = number;
        this.sendAndBack = null;
        this.onreturned = null;
    }
    killThis() {
        this.__WORKER.terminate();
    }
}

export { SIL };