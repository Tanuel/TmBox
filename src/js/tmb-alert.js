/**
 * tmBoxAlert
 * Display a simple box to confirm. Optimal for alert messages
 */

class TmBoxAlert extends TmBox {
    constructor(messageOrOptions, confirmCallback = undefined) {
        super(messageOrOptions);
        var options;
        if (typeof messageOrOptions === "string") {
            this._options = options = {};
            this.onConfirm = confirmCallback;
        } else if (typeof messageOrOptions === "object") {
            this._options = options = messageOrOptions;
        }
        
        var _this = this;
        if(typeof options.onConfirm === "function"){
            this._confirmCallback = options.onConfirm;
        }
       
        var buttonLabel = "Ok";
        var buttonClass = "tmBox-confirm";
        if(typeof options.button === "object"){
            if(typeof options.button.label === "string"){
                buttonLabel = options.button.label;
            }
            if(typeof options.button.class === "string"){
                buttonClass += " "+options.button.class;
            }
        }
        
        super.addButton(buttonLabel, buttonClass, this._confirmCallback.bind(this));
    }

    addButton() {
        throw "Invalid call";
    }

    set onConfirm(callback) {
        this._confirmCallback = callback;
    }
}
window.TmBoxAlert = TmBoxAlert;
