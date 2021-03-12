/* ThreadWorker */

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

const ThreadWorker = (function(){
    self.__Worker = true;
    self.send = (data) => {
        self.postMessage(encrypt(`{"method": "send", "threadCode": ${self.__Tnumber}, "data": ${String(data)}}`));
    };
    self.selfKill = (data) => {
        self.postMessage(encrypt(`{"method": "selfkill", "threadCode": ${self.__Tnumber}}`))
    };
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
            const RunnedFunc = new Function(`const x = ${data["function"]}; return x(${Parameters});`);
            RunnedFunc();
        }
    };
});

export {
    ThreadWorker
};