document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("showConfirmBox").addEventListener("click", function () {
        var box = new TmBoxConfirm({
            title: "TmBoxConfirm",
            message: "This is a TmBoxConfirm",
            onConfirm: function () {
                (new TmBoxAlert("confirmed")).display();
            },
            onCancel: function () {
                (new TmBoxAlert("canceled")).display();
            },
            buttonConfirm: {
                class: "customConfirmClass",
                label: "Confirm Label"
            },
            buttonCancel: {
                class: "customCancelClass",
                label: "Cancel Label"
            }
        });
        box.display();
    });
    document.getElementById("showAlertBox").addEventListener("click", function () {
        var box = new TmBoxAlert({
            title: "TmBoxAlert",
            message: "Dies ist ein TmBoxAlert",
            onConfirm: function () {
                console.log("alert confirmed");
            },
            button: {
                class: "customClass",
                label: "Custom Label"
            }
        });
        box.display();
    });
    document.getElementById("showInputBox").addEventListener("click", function () {
        var box = new TmBoxPrompt({
            title: "TmBoxPrompt",
            message: "This is a TmBoxPrompt",
            input: {
                value: "Default value",
                placeholder: "Placeholder",
                class: "customInputClass",
                type: "text"
            },
            onConfirm: function (value) {
                (new TmBoxAlert("Confirmed with value " + value)).display();
            },
            onCancel: function (value) {
                (new TmBoxAlert("Canceled with value " + value)).display();
            },
            buttonConfirm: {
                class: "customConfirmClass",
                label: "Confirm Label"
            },
            buttonCancel: {
                class: "customCancelClass",
                label: "Cancel Label"
            }
        });
        box.display();
    });

});

