sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("project.controller.document", {
        onsubmit: function () {
            var requiredDocs = {
                "Degree Certificate": this.byId("degreeDocument").getValue(),
                "High School Certificate": this.byId("highSchoolDocument").getValue(),
                "School Certificate": this.byId("schoolDocument").getValue(),
                "Aadhar Card": this.byId("AadharDocument").getValue(),
                "Resume": this.byId("Resume").getValue()
            };
        
            // var missingDocs = [];
            // Object.keys(requiredDocs).forEach(function (doc) {
            //     if (!requiredDocs[doc]) {
            //         missingDocs.push(doc);
            //     }
            // });
        
            // if (missingDocs.length > 0) {
            //     MessageBox.error("Please upload the following documents:\n" + missingDocs.join("\n"));
            //     return; // Stop execution if documents are missing
            // }
        
            // Fetch model correctly
            var onboardingModel = this.getView().getModel("onboarding");
        
            if (!onboardingModel) {
                MessageBox.error("Model 'onboarding' not found!");
                return;
            }
        
            // Merge personal and education details into a single object
            var employeeData = Object.assign(
                {}, 
                onboardingModel.getProperty("/personalDetails") || {}, // Avoid undefined errors
                onboardingModel.getProperty("/educationDetails") || {}
            );
        
            // Ensure data is not empty before saving
            if (Object.keys(employeeData).length === 0) {
                MessageBox.error("Employee details missing!");
                return;
            }
        
            $.ajax({
                url: window.location.origin + "/odata/v4/onboarding/EmployeeDetails",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(employeeData),
                success: function () {
                    MessageToast.show("Employee details saved successfully!");
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("document");
                }.bind(this),
                error: function (xhr) {
                    MessageBox.error("Failed to save employee details: " + xhr.responseText);
                }
            });
        },        
        onPrevious: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("education");
        }        
    });
});
