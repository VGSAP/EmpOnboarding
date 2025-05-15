sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("project.controller.employee", {
        
        onNext: function () {
            var oModel = this.getView().getModel("onboarding");
            
            // Set the model to the view
            var personalData = {
                firstName: this.byId("firstname").getValue(),
                lastName: this.byId("lastname").getValue(),
                dob: this.byId("dobPicker").getDateValue(), // Get Date Object
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
        
            var emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Ensure email is Gmail format
            var phoneRegex = /^[0-9]{10}$/; // Ensure phone number is exactly 10 digits
            var today = new Date();
            var errorMessage = "";

            // Ensure DOB is properly formatted
            if (personalData.dob) {
                personalData.dob = personalData.dob.toISOString().split("T")[0]; // Convert to "YYYY-MM-DD"
            }

            // Check mandatory fields
            Object.keys(personalData).forEach(function (key) {
                if (!personalData[key]) {
                    errorMessage += `${key} is required.\n`;
                }
            });

            // Date of birth validation (must be before today)
            if (personalData.dob >= today.toISOString().split("T")[0]) {
                errorMessage += "Date of Birth must be before today.\n";
            }

            // Email validation
            if (!emailRegex.test(personalData.email)) {
                errorMessage += "Email must be in the format 'abc@gmail.com'.\n";
            }

            // Phone validation
            if (!phoneRegex.test(personalData.phone)) {
                errorMessage += "Phone number must be exactly 10 digits.\n";
            }

            if (errorMessage) {
                MessageBox.error(errorMessage); // Display validation errors
            } else {
                // Corrected: Store personalData in model
                oModel.setProperty("/personalDetails", personalData);
                console.log(this.getView().getModel("onboarding"));

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("education");
            }
        }
    });
});
