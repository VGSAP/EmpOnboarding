sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("project.controller.employee", {
        
        onNext: function () {
            var oModel = this.getView().getModel("onboarding");
        
            var personalData = {
                firstName: this.byId("firstname").getValue(),
                lastName: this.byId("lastname").getValue(),
                dob: this.byId("dobPicker").getDateValue(),
                email: this.byId("email").getValue(),
                phone: this.byId("phoneInput").getValue(),
                gender: this.byId("GenderComboBox").getSelectedKey(),
                nationality: this.byId("nationalityComboBox").getSelectedKey(),
                address: this.byId("Address").getValue(),
                city: this.byId("City").getValue(),
                state: this.byId("State").getValue(),
                country: this.byId("Country").getValue(),
                zipCode: this.byId("ZipCode").getValue()
            };
        
            // If any field is empty, show a single error message
            var anyFieldEmpty = Object.values(personalData).some(value => !value);
            if (anyFieldEmpty) {
                MessageBox.error("All fields are required.");
                return;
            }
        
            var emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
            var phoneRegex = /^[0-9]{10}$/;
            var today = new Date();
        
            // Format and validate DOB
            personalData.dob = personalData.dob.toISOString().split("T")[0];
            if (personalData.dob >= today.toISOString().split("T")[0]) {
                MessageBox.error("Date of Birth must be before today.");
                return;
            }
        
            // Email format validation
            if (!emailRegex.test(personalData.email)) {
                MessageBox.error("Email must be in the format 'abc@gmail.com'.");
                return;
            }
        
            // Phone format validation
            if (!phoneRegex.test(personalData.phone)) {
                MessageBox.error("Phone number must be exactly 10 digits.");
                return;
            }
        
            // Save to model and navigate
            oModel.setProperty("/personalDetails", personalData);
            console.log(this.getView().getModel("onboarding"));
        
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("education");
        }
        
        
    });
});
