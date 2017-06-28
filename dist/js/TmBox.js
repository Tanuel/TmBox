/*! TmBox v0.1.0
 *(C) Daniel Schuster <tanuel.mategi@gmail.com> 2017
 * */
;(function (window,document) {
	"use strict;"
/* 
 not implemented in the main tmBox.js
 */


var TmBoxConfig = {
    buttonConfirm:{
        label: "Confirm",
        //the class tmBox-confirm will automatically be added
        class: ""
    },
    buttonConfirm:{
        label: "Cancel",
        //the class tmBox-cancel will automatically be added
        class: ""
    },
    input:{
        class: "tmBox-input",
        placeholder: ""
    }
}
class TmBox {
    constructor(options = '') {
        if(typeof options === 'object'){
            this.message = options.message;
            this.title = options.title;
            this.specialContent = options.special;
            this.onDisplayCallback = options.onDisplay;
        }else if(typeof options === 'string'){
            this.message = options;
            this.title;
            this.specialContent;
            this.onDisplayCallback;
        }
        
        this.domElement;
        this.buttons = new Array();
    }
    set message(message) {
        this._message = message;
    }
    get message(){
        return this._message;
    }
    set title(title){
        this._title = title;
    }
    get title(){
        return this._title;
    }
    onDisplay(callback) {
        this.onDisplayCallback = callback;
    }

    addButton(text, className = '', callback = undefined) {
        var btn = {text: text, className: className, callback: callback};
        this.buttons.push(btn);
    }
    repositionBox() {
        let box = this.domElement.firstChild;
        box.style.top = (this.domElement.offsetHeight / 2 - box.offsetHeight / 2)+"px";
        box.style.left = (this.domElement.offsetWidth / 2 - box.offsetWidth / 2)+"px";
    }
    destroy() {
        this.domElement.parentNode.removeChild(this.domElement);
    }
    
    _repositionByGlobalEvent(){
        if(this.domElement){
            this.repositionBox();
        }
    }
    
    _destroyByEvent(btnCallback,event) {
        if (typeof btnCallback === "function") {
            if(btnCallback() === false){
                return;
            }
        }
        this.destroy();
    }
    
    display() {
        if(this.domElement){
            this.destroy();
        }
        let htmlWrapper = document.createElement("div");
        htmlWrapper.className = "tmBox-outer";
        let box = document.createElement("div");
        box.className = "tmBox";
        
        //create title
        if (this.title) {
            let titleElement = document.createElement("div");
            titleElement.className = "tmBox-title";
            titleElement.innerHTML = this.title;
            box.appendChild(titleElement);
        }
        //create Message
        let msg = document.createElement("div");
        msg.className = "tmBox-message";
        msg.innerHTML = this.message;
        box.appendChild(msg);

        //create Special
        if (typeof this.specialContent !== "undefined") {
            let special = document.createElement('div');
            special.className = "tmBox-special";
            if(typeof this.specialContent === 'string'){
                special.innerHTML = this.specialContent;
            }else{
                special.appendChild(this.specialContent);
            }
            box.appendChild(special);
        }


        let buttonsObj = this._createButtonContainer(this.buttons);
        box.appendChild(buttonsObj);

        
        htmlWrapper.appendChild(box);
        this.domElement = htmlWrapper;
        document.body.appendChild(this.domElement);
        this.repositionBox();
        this.repositionBox();
        if (typeof this.onDisplayCallback === "function") {
            this.onDisplayCallback();
        }
        window.addEventListener("resize",this._repositionByGlobalEvent.bind(this));
        return;
    }
    
    /**
     * 
     * @param {Array} buttons
     * @returns {HTMLDivElement}
     */
    _createButtonContainer(buttons){
        let buttonsObj = document.createElement("div");
        buttonsObj.className = "tmBox-buttons";
        for (let btn of buttons){
            buttonsObj.appendChild(this._createButton(btn));
        }
        return buttonsObj;
    }
    
    /**
     * 
     * @param {Array} btn
     * Array with button information
     * @returns {HTMLDivElement}
     */
    _createButton(btn){
        let buttonObj = document.createElement("button");
        buttonObj.className = btn.className !== '' ? ' class="' + btn.className + '"' : '';
        buttonObj.innerText = btn.text;
        buttonObj.addEventListener('click', this._destroyByEvent.bind(this,btn.callback));
        return buttonObj;
    }
}
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
        /*super.addButton(buttonLabel, buttonClass, function () {
            if (typeof _this._confirmCallback === 'function') {
                _this._confirmCallback();
            }
        });*/
    }

    addButton() {
        throw "Invalid call";
    }

    set onConfirm(callback) {
        this._confirmCallback = callback;
    }
}
window.TmBoxAlert = TmBoxAlert;

/**
 * tmBoxConfirm
 * Display a Box where the user has the option to confirm or cancel an operation
 */
class TmBoxConfirm extends TmBox {
    constructor(messageOrOptions, confirmCallback = undefined) {
        super();
        var options;
        if (typeof messageOrOptions === "string") {
            this.message = messageOrOptions;
            this._options = options = {};
            this._confirmCallback = confirmCallback;
        } else if (typeof messageOrOptions === "object") {
            this.message = messageOrOptions.message;
            this._options = options = messageOrOptions;
        }
        if(typeof options.title === "string"){
            this.title = options.title;
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
class TmBoxPrompt extends TmBox {
    constructor(messageOrOptions, confirmCallback = undefined) {
        super();
        var options;
        if (typeof messageOrOptions === "string") {
            this.message = messageOrOptions;
            this._options = options = {};
            this._confirmCallback = confirmCallback;
        } else if (typeof messageOrOptions === "object") {
            this.message = messageOrOptions.message;
            this._options = options = messageOrOptions;
        }
        if(typeof options.title === "string"){
            this.title = options.title;
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
            let key = e.which || e.keyCode;
            if (key === 13) {
                //confirm if the user presses enter
                _this.domElement.find('.tmBox-confirm').click();
            //keycode 27 = escape
            } else if (key === 27) {
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
})(window,document);