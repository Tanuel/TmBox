class TmBox {
    constructor(message = '') {
        this.message = message;
        this.title;
        this.specialContent;
        this.onDisplayCallback;
        this.domElement;
        this.buttons = new Array();
    }
    setMessage(message) {
        this.message = message;
    }
    setTitle(title){
        this.title = title;
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

    display() {
        var _this = this;
        if(this.domElement){
            this.destroy();
        }
        let htmlWrapper = document.createElement("div");
        htmlWrapper.className = "tmBox-outer";
        let box = document.createElement("div");
        box.className = "tmBox";
        
        htmlWrapper.appendChild(box);
        
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


        let buttonsObj = document.createElement("div");
        buttonsObj.className = "tmBox-buttons";
        this.buttons.forEach(function (btn) {
            var btnStr = '<button' + (btn.className != '' ? ' class="' + btn.className + '"' : '') + '>' + btn.text + '</button>';
            let btnObj = document.createElement("button");
            btnObj.className = btn.className !== '' ? ' class="' + btn.className + '"' : '';
            btnObj.innerText = btn.text;
            btnObj.addEventListener('click', function () {
                if (typeof btn.callback === "function") {
                    btn.callback();
                }
                _this.destroy();
            });
            buttonsObj.appendChild(btnObj);
        });
        box.appendChild(buttonsObj);

        this.domElement = htmlWrapper;
        document.body.appendChild(this.domElement);
        this.repositionBox();
        this.repositionBox();
        if (typeof this.onDisplayCallback === "function") {
            this.onDisplayCallback();
        }
        return;
    }
}