sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller){
    "use strict";
    return Controller.extend("project.controller.education", {
        onNext : function() {
            var highestQualification = this.byId("highestQualification").getSelectedKey();
            var branch = this.byId("Branch").getSelectedKey();
            var collegeName = this.byId("collegeName").getValue();
            var percentage = this.byId("percentage").getValue();
            
            var highSchoolStream = this.byId("highSchoolStream").getSelectedKey();
            var highSchoolName = this.byId("highSchool").getValue();
            var highSchoolPercentage = this.byId("highSchoolPercentage").getValue();
            
            var schoolName = this.byId("school").getValue();
            var schoolPercentage = this.byId("schoolPercentage").getValue();

            var percentageRegex = /^(100|[1-9]?[0-9])$/; // Ensures a valid percentage between 0-100

            var errorMessage = "";

            // Mandatory field validation
            if (!highestQualification || !branch || !collegeName || !percentage ||
                !highSchoolStream || !highSchoolName || !highSchoolPercentage ||
                !schoolName || !schoolPercentage) {
                errorMessage += "All fields marked with * are required.\n";
            }

             // Percentage validation
            if (!percentageRegex.test(percentage)) {
                errorMessage += "College Percentage must be a number between 0-100.\n";
            }
            if (!percentageRegex.test(highSchoolPercentage)) {
                errorMessage += "High School Percentage must be a number between 0-100.\n";
            }
            if (!percentageRegex.test(schoolPercentage)) {
                errorMessage += "School Percentage must be a number between 0-100.\n";
            }

            if (errorMessage) {
                sap.m.MessageBox.error(errorMessage); // Displays validation errors
            } else {
                sap.m.MessageToast.show("Education details validated successfully!");
                // Proceed to next step
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("document");
            }
            
        }
    
    }
    )}
)