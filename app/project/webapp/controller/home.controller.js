sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function(Controller, MessageBox) {
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
            var oView = this.getView();

            var name = this.byId("nameInput").getValue();
            var mobile = this.byId("mobilenumber").getValue();
            var email = this.byId("regEmailInput").getValue();
            var password = this.byId("regPasswordInput").getValue();
            var confirmPassword = this.byId("confirmpass").getValue();
            var termsChecked = this.byId("terms").getSelected();

            var errorMessage = "";

            var mobileRegex = /^[0-9]{10}$/; 
            var emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; 
            var passwordRegex = /^.{8,}$/; 
        
            
        
            if (!mobileRegex.test(mobile)) {
                errorMessage += "Mobile number must be 10 digits.\n";
            }
            
            if (!emailRegex.test(email)) {
                errorMessage += "Email must be in the format 'abc@gmail.com'.\n";
            }
        
            if (!passwordRegex.test(password)) {
                errorMessage += "Password must be at least 8 characters.\n";
            }
        
            if (password !== confirmPassword) {
                errorMessage += "Passwords do not match.\n";
            }
        
            if (!termsChecked) {
                errorMessage += "You must agree to the Terms & Conditions.\n";
            }

            if(!name || !mobile || !email || !password || !confirmPassword || !termsChecked ){
                errorMessage += "All fields are required.\n";
            }
        
            if (errorMessage) {
                sap.m.MessageBox.error(errorMessage);
            } else {
                sap.m.MessageToast.show("Registration successful! Now Login");
                this.getView().byId("registerDialog").close();
            }
        },

        onCancelRegister: function() {
            this.getView().byId("registerDialog").close();
        }
    });
});
