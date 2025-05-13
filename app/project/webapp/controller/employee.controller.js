sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("project.controller.employee", {
        onNext: function () {
            var firstName = this.byId("firstname").getValue();
            var lastName = this.byId("lastname").getValue();
            var dob = this.byId("dobPicker").getDateValue();
            var email = this.byId("email").getValue();
            var phone = this.byId("phoneInput").getValue();
            var gender = this.byId("GenderComboBox").getSelectedKey();
            var nationality = this.byId("nationalityComboBox").getSelectedKey();
            var houseNo = this.byId("Houseno").getValue();
            var street = this.byId("Street").getValue();
            var city = this.byId("City").getValue();
            var state = this.byId("State").getValue();
            var country = this.byId("Country").getValue();
            var zipCode = this.byId("ZipCode").getValue();
        
            var emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Ensure email is Gmail format
            var phoneRegex = /^[0-9]{10}$/; // Ensure phone number is exactly 10 digits
            var today = new Date();
        
            var errorMessage = "";
        
            // Check mandatory fields
            if (!firstName || !lastName || !dob || !email || !phone || !gender || !nationality || !houseNo || !street || !city || !state || !country || !zipCode) {
                errorMessage += "All fields marked with * must be filled.\n";
            }
        
            // Date of birth validation (must be before today)
            if (dob >= today) {
                errorMessage += "Date of Birth must be before today.\n";
            }
        
            // Email validation
            if (!emailRegex.test(email)) {
                errorMessage += "Email must be in the format 'abc@gmail.com'.\n";
            }
        
            // Phone validation
            if (!phoneRegex.test(phone)) {
                errorMessage += "Phone number must be exactly 10 digits.\n";
            }
        
            if (errorMessage) {
                MessageBox.error(errorMessage); // Display validation errors
            } else {
                MessageToast.show("Validation successful!");
                // Proceed to next step or submit form
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("education");
            }
        }
        
    });
});
