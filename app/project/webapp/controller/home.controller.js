sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller){
    "use strict";

    return Controller.extend("project.controller.home", {
        onLogin: function () {
            var email = this.getView().byId("emailInput").getValue();
            var password = this.getView().byId("passwordInput").getValue();

            if (!email || !password) {
                sap.m.MessageToast.show("Please enter valid credentials!");
                return;
            }

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("employee");
        },

        onOpenRegisterDialog: function () {
            var oView = this.getView();
            if (!this.oRegisterDialog) {
                this.oRegisterDialog = oView.byId("registerDialog");
            }
            this.oRegisterDialog.open();
        },
        onRegister: function () {
            // Retrieve UI5 Model
            var oModel = this.getOwnerComponent().getModel("ODataModel");
        
            // Get Input Values
            var name = this.getView().byId("nameInput").getValue();
            var email = this.getView().byId("regEmailInput").getValue();
            var password = this.getView().byId("regPasswordInput").getValue();
            var mobile = this.getView().byId("mobilenumber").getValue();
            var confirmPassword = this.getView().byId("confirmpass").getValue();
            var termsAccepted = this.getView().byId("terms").getSelected(); // Checkbox validation
        
            // Client-Side Validation
            if (!name || !email || !password || !mobile || !confirmPassword || !termsAccepted) {
                sap.m.MessageToast.show("All fields are required!");
                return;
            }
        
            if (password !== confirmPassword) {
                sap.m.MessageToast.show("Passwords do not match!");
                return;
            }
        
            if (!email.match(/^\S+@\S+\.\S+$/)) {
                sap.m.MessageToast.show("Invalid email format!");
                return;
            }
        
            if (!mobile.match(/^[0-9]{10}$/)) {
                sap.m.MessageToast.show("Invalid mobile number!");
                return;
            }
        
    
        
            // Close the Registration Dialog (if applicable)
            this.getView().byId("registerDialog").close();
        }
        
    })

        
});
