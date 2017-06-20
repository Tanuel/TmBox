/**
 * tmBoxConfirm
 * Display a Box where the user has the option to confirm or cancel an operation
 */
class TmBoxConfirm extends TmBox {
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
        
        if(typeof options.onCancel === "function"){
            this._cancelCallback = options.onCancel;
        }
        
        var buttonConfirmLabel = "Ok";
        var buttonConfirmClass = "tmBox-confirm";
        if(typeof options.buttonConfirm === "object"){
            if(typeof options.buttonConfirm.label === "string"){
                buttonConfirmLabel = options.buttonConfirm.label;
            }
            if(typeof options.buttonConfirm.class === "string"){
                buttonConfirmClass += " "+options.buttonConfirm.class;
            }
        }
        super.addButton(buttonConfirmLabel, buttonConfirmClass, function () {
            if (typeof _this._confirmCallback === 'function') {
                _this._confirmCallback();
            }
        });
        
        var buttonCancelLabel = "Cancel";
        var buttonCancelClass = "tmBox-cancel";
        if(typeof options.buttonCancel === "object"){
            if(typeof options.buttonCancel.label === "string"){
                buttonCancelLabel = options.buttonCancel.label;
            }
            if(typeof options.buttonCancel.class === "string"){
                buttonCancelClass += " "+options.buttonCancel.class;
            }
        }
        super.addButton(buttonCancelLabel, buttonCancelClass, function () {
            if (typeof _this._cancelCallback === 'function') {
                _this._cancelCallback();
            }
        });
    }

    addButton() {
        throw "Invalid call";
    }

    onConfirm(callback) {
        this._confirmCallback = callback;
    }
    onCancel(callback) {
        this._cancelCallback = callback;
    }
}
window.TmBoxConfirm = TmBoxConfirm;