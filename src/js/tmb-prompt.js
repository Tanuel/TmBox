class TmBoxPrompt extends TmBox {
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
            this.setTitle(options.title);
        }
       
        let _this = this;
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
                var inputContent = _this.specialContent.value;
                _this._confirmCallback(inputContent);
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
                var inputContent = _this.specialContent.value;
                _this._cancelCallback(inputContent);
            }
        });

        this.onDisplay(function () {
            _this.specialContent.focus();
        });
        
        let spec = document.createElement("input");
        spec.className = "tmBox-input";
        
        if(options.input){
            if(options.input.class)
                spec.classList.add(options.input.class);
            if(options.input.placeholder)
                spec.placeholder = options.input.placeholder;
            if(options.input.value)
                spec.value = options.input.value;
            if(options.input.type)
                spec.type =options.input.type;
        }
        spec.addEventListener("keydown",function (e) {
            //keycode 13 = enter
            if (e.which === 13) {
                //confirm if the user presses enter
                _this.domElement.find('.tmBox-confirm').click();
            //keycode 27 = escape
            } else if (e.which === 27) {
                //cancel if the user presses escape
                _this.domElement.find('.tmBox-cancel').click();
            }
        });
        this.specialContent = spec;
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
window.TmBoxPrompt = TmBoxPrompt;