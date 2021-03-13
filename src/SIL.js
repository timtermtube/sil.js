/* Sil = Thread */
import { ThreadWorker } from "./ThreadWorker";
import { encrypt, decrypt } from "./SilCrypt"

class SIL {
    constructor(func, name="WorkingAnt", params=[], number=0) {
        const BLOB = new Blob([ThreadWorker(func, params)], {
            type: "application/javascript"
        });
        this.__TEMPURL = URL.createObjectURL(BLOB);
        this.__WORKER = new Worker(this.__TEMPURL);
        this.name = name;
        this.number = number;
        this.sendAndBack = null;
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
        }
    }
    killThis() {
        this.__WORKER.terminate();
    }
}

export { SIL };