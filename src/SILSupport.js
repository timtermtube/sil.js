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
    catch {
        PASS.Window = false;
    }

    if (PASS.Window) {
        try {
            let __TEMP = window.Worker;
            PASS.Window = true;
        }
        catch {
            PASS.Window = false;
        }
        try {
            let __TEMP = window.Blob;
            PASS.Window = true;
        }
        catch {
            PASS.Window = false;
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