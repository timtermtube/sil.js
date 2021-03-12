/* Check Whether the client supports SIL */

function SILSupport() {
    const PASS = {
        Window: false,
        Worker: false,
        Blob: false,
    }
    try {
        let __TEMP = window;
        PASS.Window = true;
    }
    catch (e) {
        PASS.Window = false;
    }

    if (PASS.Window) {
        try {
            let __TEMP = window.Worker;
            PASS.Worker = true;
        }
        catch (e) {
            PASS.Worker = false;
        }
        try {
            let __TEMP = window.Blob;
            PASS.Blob = true;
        }
        catch (e) {
            PASS.Blob = false;
        }
    }
    else {
        return false;
    }

    if (PASS.Window && PASS.Worker && PASS.Blob) {
        return true;
    }
    else {
        return false;
    }
}

export {
    SILSupport
};