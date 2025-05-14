sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("project.controller.education", {
        onNext: function () {
            function isEmpty(value) {
                return !value || value.trim() === "";
            }

            var highestQualification = this.byId("highestQualification").getSelectedKey();
            var branch = this.byId("Branch").getSelectedKey();
            var collegeName = this.byId("collegeName").getValue();
            var percentage = this.byId("percentage").getValue();

            var highSchoolStream = this.byId("highSchoolStream").getSelectedKey();
            var highSchoolName = this.byId("highSchool").getValue();
            var highSchoolPercentage = this.byId("highSchoolPercentage").getValue();

            var schoolName = this.byId("school").getValue();
            var schoolPercentage = this.byId("schoolPercentage").getValue();

            var percentageRegex = /^(100|[1-9]?[0-9])$/;
            var errorMessage = "";

            // Mandatory field validation
            if (
                isEmpty(highestQualification) || isEmpty(branch) || isEmpty(collegeName) || isEmpty(percentage) ||
                isEmpty(highSchoolStream) || isEmpty(highSchoolName) || isEmpty(highSchoolPercentage) ||
                isEmpty(schoolName) || isEmpty(schoolPercentage)
            ) {
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

            if (!errorMessage == "") {
                MessageBox.error(errorMessage);
            } else {
                MessageToast.show("Education details validated successfully!");
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("document");
            }
        },
        onPrevious: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("employee");
        }        
    });
});
