/* ThreadWorker */

function twFunctions() {
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

    self.__Worker = true;
    self.send = (data) => {
        self.postMessage(encrypt(`{"method": "send", "threadCode": ${self.__Tnumber}, "data": ${String(data)}}`));
    };
    self.selfKill = (data) => {
        self.postMessage(encrypt(`{"method": "selfkill", "threadCode": ${self.__Tnumber}}`))
    };
    self.onmessage = (ev) => {
        let data = JSON.parse(decrypt(ev.data));
    };
}

function ThreadWorker(func, params=[]) {
    const these = {};

    if (typeof func == "function") {
        these.__BASERUNNER__ = `(${twFunctions.toString()})();`
        these.__FUNCTION__ = `function __RUN__(arrayParameters=[]) { return (${func.toString()})(${params.toString()}); } `
        these.result = `${these.__BASERUNNER__}${these.__FUNCTION__}`
    }
    else {
        return these;
    }
}

export {
    ThreadWorker
};