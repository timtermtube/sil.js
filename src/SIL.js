/* Sil = Thread */
import { ThreadWorker } from "./ThreadWorker";
import { encrypt, decrypt } from "./SilCrypt"

class SIL {
    constructor(func, name="WorkingAnt", params=[], number=0) {
        const BLOB = new Blob([`${ThreadWorker.toString()}()`], {
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
        const _FUNC = func.toString();
        const newFunction = "";
        for (var i=0; i<_FUNC.length; i++) {
            let v = _FUNC[i];
            if (v == `"`) {
                newFunction += '\\"';
            }
            else {
                newFunction += v;
            }
        }
        this.__WORKER.postMessage(
            encrypt(`{
                "method": "do", 
                "threadCode": ${this.number}, 
                "function": "${newFunction}", 
                "params": ${JSON.stringify(params)}
            }`));
    }
    killThis() {
        this.__WORKER.terminate();
    }
}

export { SIL };