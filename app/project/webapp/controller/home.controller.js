sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("project.controller.home", {
        onLogin: function () {
            var email = this.getView().byId("emailInput").getValue();
            var password = this.getView().byId("passwordInput").getValue();

            // Validation checks
            if (!email || !password) {
                sap.m.MessageToast.show("Please enter valid credentials!");
                return;
            }

            $.ajax({
                url: window.location.origin + "/odata/v4/onboarding/Users?$filter=email eq '" + email + "'",
                type: "GET",
                contentType: "application/json",
                success: function (data) {
                    if (data.value && data.value.length > 0) {
                        var storedPassword = data.value[0].password;
                        var userRole = data.value[0].role;

                        // Validate password (consider hashing instead of plain comparison)
                        if (storedPassword === password) {
                            console.log("yes")

                            if (userRole === "User") {
                                sap.ui.core.UIComponent.getRouterFor(this).navTo("employee");
                            } else if (userRole === "HR") {
                                sap.ui.core.UIComponent.getRouterFor(this).navTo("hr");
                            } else {
                                sap.m.MessageBox.warning("Unknown role: " + userRole);
                            }

                        } else {
                            sap.m.MessageBox.error("Incorrect password. Please try again.");
                        }
                    } else {
                        sap.m.MessageBox.error("User not found. Please check your email.");
                    }
                }.bind(this),
                error: function (xhr) {
                    var errorMessage = "Unexpected error occurred.";
                    try {
                        var responseJSON = JSON.parse(xhr.responseText);
                        errorMessage = responseJSON.error?.message || errorMessage;
                    } catch (err) {
                        console.error("Error parsing JSON response:", err);
                    }
                    sap.m.MessageBox.error(errorMessage);
                }
            });
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
            var mobilenumber = this.byId("mobilenumber").getValue();
            var email = this.byId("regEmailInput").getValue();
            var password = this.byId("regPasswordInput").getValue();
            var confirmPassword = this.byId("confirmpass").getValue();
            var termsChecked = this.byId("terms").getSelected();

            var mobileRegex = /^[0-9]{10}$/;
            var emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
            var passwordRegex = /^.{8,}$/;



            if (!mobileRegex.test(mobilenumber)) {
                MessageToast.show("Mobile number must be 10 digits.\n");
            }

            if (!emailRegex.test(email)) {
                MessageToast.show("Email must be in the format 'abc@gmail.com'.\n");
            }

            if (!passwordRegex.test(password)) {
                MessageToast.show("Password must be at least 8 characters.\n");
            }

            if (password !== confirmPassword) {
                MessageToast.show("Passwords do not match.\n");
            }

            if (!termsChecked) {
                MessageToast.show("You must agree to the Terms & Conditions.\n");
            }

            if (!name || !mobilenumber || !email || !password || !confirmPassword || !termsChecked) {
                MessageToast.show("All fields are required.\n");
            }

            else {
                var oData = {
                    id: new Date().getTime().toString(),
                    name: name,
                    email: email,
                    mobilenumber: mobilenumber,
                    password: password,
                    role: "User"
                };
                console.log(oData);
                $.ajax({
                    url: window.location.origin + "/odata/v4/onboarding/Users",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(oData),
                    success: function () {
                        MessageToast.show("Registration successful!");
                        this.getView().byId("registerDialog").close();

                    }.bind(this),
                    error: function (xhr) {
                        console.log("Raw error response:", xhr.responseText);
                    }
                });
            }
        },

        onCancelRegister: function () {
            this.getView().byId("registerDialog").close();
        }
    });
});
