(function() {
    const ProjectName = "Sil.js"
    function encrypt(string) {
        const array = [];

        if (typeof string == "string") {
            for (var i=0; i<string.length; i++) {
                array.push(string.charCodeAt(i)*2)
            }
        }
        return array;
    }

    function decrypt(array) {
        let string = "";

        if (typeof array == "object") {
            for (var i=0; i<array.length; i++) {
                string += String.fromCharCode(array[i]/2)
            }
        }
        return string;
    }

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
                F()
            }
        };
    }
    else {
        try {
            const WorkerScript = document.currentScript.src;
            const Threads = [];

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

            const __ = {
                _getWorkerScriptPath: function() {
                    return WorkerScript;
                },

                newThread: function(method, name="WorkingAnt", params=[]) {
                    if (typeof method == "function") {
                        // Working
                        let T = new SIL(this._getWorkerScriptPath(), method, name, params);
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