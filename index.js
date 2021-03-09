const { encrypt, decrypt } = require("./src/crypt_sil");
const { SIL } = require("./src/sil_core");

const ProjectName = "SILX"

(function() {
    let wd;

    try {
        const ___ = window;
        wd = true;
    }
    catch (e) {
        wd = false;
    }
    
    if (!wd) {
        // Worker Client
        self.__Worker = true;
        self.send = (data) => {
            self.postMessage(encrypt(`{"method": "send", "threadCode": ${self.__Tnumber}, "data": ${String(data)}}`));
        }
        self.selfkill = (data) => {
            self.postMessage(encrypt(`{"method": "selfkill", "threadCode": ${self.__Tnumber}}`))
        }
        self.onmessage = (ev) => {
            let data = JSON.parse(decrypt(ev.data));
            self.__Tnumber = data["threadCode"];
            let Parameters = "";
    
            if (data["method"] == "do") {
                for (var i=0; i<data["params"].length; i++) {
                    let v = data["params"][i];
                    if (i == data["params"].length-1) {
                        Parameters += v;
                    }
                    else {
                        Parameters += v+", ";
                    }
                }
                const F = new Function(`const x = ${data["function"]}; return x(${Parameters});`);
                F();
            }
        };
    }
    else {
        try {
            const WorkerScript = document.currentScript.src;
            const Threads = [];
    
            const __ = {
                _getWorkerScriptPath: function() {
                    return WorkerScript;
                },
    
                newThread: function(method, name="WorkingAnt", params=[]) {
                    if (typeof method == "function") {
                        // Working
                        const T = new SIL(this._getWorkerScriptPath(), method, name, params);
                        Threads.push(T);
                        return T;
                    }
                    else {
                        console.error("The 'method' parameter requires a function.")
                    }
                }
            }
    
            window[ProjectName] = __;
            console.warn(`[${ProjectName}] [Warning] The Window API is not working in the Thread Functions. For Instead of it, Change as window -> self.`)
        }
        catch (e) {
            // Loading Error
            const _ERRCASE = !Worker;
            if (_ERRCASE) {
                console.error(`This browser doesn't support ${ProjectName}.`);
            }
        }
    }
})();