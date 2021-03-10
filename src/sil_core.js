class SIL {
    constructor(scriptsrc, working, name="WorkingAnt", params=[]) {
        this.__worker = new Worker(scriptsrc);
        this.name = name;
        this.number = Threads.length;
        this.sendAndBack = null;
        this.__worker.onmessage = (ms) => {
            let data = JSON.parse(decrypt(ms.data));
            
            if (data["method"] == "selfkill") {
                this.kill();
            }
            else if (data["method"] == "send") {
                if (typeof this.sendAndBack == "function") {
                    this.sendAndBack(data)
                }
            }
        }

        let _FUNC = String(working);
        let newFunction = "";
        for (var i=0; i<_FUNC.length; i++) {
            let v = _FUNC[i];
            if (v == `"`) {
                newFunction += '\\"';
            }
            else {
                newFunction += v;
            }
        }
        console.log(_FUNC)
        console.log(newFunction)
        this.__worker.postMessage(encrypt(` {"method": "do", "threadCode": ${this.number}, "function": "${newFunction}", "params": ${JSON.stringify(params)}}`));
    }
    kill() {
        this.__worker.terminate();
    }
}

export { SIL };