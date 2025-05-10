sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";
    return Controller.extend("project.controller.Employee", {
        onInit: function() {
            console.log("Employee Controller Initialized");
        }
    });
});