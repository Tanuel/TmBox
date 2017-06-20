/**
 * tmBoxAlert
 * Display a simple box to confirm. Optimal for alert messages
 */

class TmBoxAlert extends TmBox {
    constructor(messageOrOptions, confirmCallback = undefined) {
        super();
        var options;
        if (typeof messageOrOptions === "string") {
            this.setMessage(messageOrOptions);
            this._options = options = {};
            this._confirmCallback = confirmCallback;
        } else if (typeof messageOrOptions === "object") {
            this.setMessage(messageOrOptions.message);
            this._options = options = messageOrOptions;
        }
       
        if(typeof options.title === "string"){
            this.setTitle(options.title)
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
        super.addButton(buttonLabel, buttonClass, function () {
            if (typeof _this._confirmCallback === 'function') {
                _this._confirmCallback();
            }
        });
    }

    addButton() {
        throw "Invalid call";
    }

    onConfirm(callback) {
        this._confirmCallback = callback;
    }
}
window.TmBoxAlert = TmBoxAlert;
