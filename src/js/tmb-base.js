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
        let btn = {text: text, className: className, callback: callback};
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
        if (typeof btnCallback === "function" && btnCallback(event) === false) {
                return;
        }
        this.destroy();
    }
    
    display() {
        if(this.domElement){
            this.destroy();
        }
        const create = document.createElement.bind(document),
              htmlWrapper = create("div"),
              box = create("div"),
              msg = create("div");
        htmlWrapper.className = "tmBox-outer";
        
        box.className = "tmBox";
        
        //create title
        if (this.title) {
            let titleElement = create("div");
            titleElement.className = "tmBox-title";
            titleElement.innerHTML = this.title;
            box.appendChild(titleElement);
        }
        //create Message
        msg.className = "tmBox-message";
        msg.innerHTML = this.message;
        box.appendChild(msg);

        //create Special
        if (this.specialContent) {
            let special = create('div');
            special.className = "tmBox-special";
            if(typeof this.specialContent === 'string'){
                special.innerHTML = this.specialContent;
            }else{
                special.appendChild(this.specialContent);
            }
            box.appendChild(special);
        }


        const buttonsObj = this._createButtonContainer(this.buttons);
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