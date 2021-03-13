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
    self.beReturned = (data) => {
        self.postMessage(encrypt(`{"method": "beReturned", "threadCode": ${self.__Tnumber}, "data": ${String(data)}}`));
    };
    self.onmessage = (ev) => {
        let data = self.JSON.parse(decrypt(ev.data));
    };
}

function ThreadWorker(func, params=[], tNumber=0) {
    const these = {};

    if (typeof func == "function") {
        these.__BASERUNNER__ = `(${twFunctions.toString()})(); self.__Tnumber=${tNumber};`
        these.__FUNCTION__ = `function __RUN__(arrayParameters=[]) { 
            const RD = (${func.toString()})(...${params}); 
            if (RD) {
                self.beReturned(self.JSON.stringify(RD));
                self.selfKill();
            }
        }; 
        __RUN__(); `
        these.configSetters = `const JSON = self.JSON;`
        these.result = `${these.configSetters} ${these.__BASERUNNER__}\n${these.__FUNCTION__}`
    }
    else {
        return these.result;
    }
    return these.result;
}

export {
    ThreadWorker
};