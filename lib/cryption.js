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

module.exports = {encrypt, decrypt};

