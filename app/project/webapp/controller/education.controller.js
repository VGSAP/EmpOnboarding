sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("project.controller.education", {
        onNext: function () {
            var educationData = {  // Define the object before using it
                highestQualification: this.byId("highestQualification").getSelectedKey(),
                branch: this.byId("Branch").getSelectedKey(),
                collegeName: this.byId("collegeName").getValue(),
                percentage: this.byId("percentage").getValue(),
                highSchoolStream: this.byId("highSchoolStream").getSelectedKey(),
                highSchool: this.byId("highSchool").getValue(),
                highSchoolPercentage: this.byId("highSchoolPercentage").getValue(),
                school: this.byId("school").getValue(),
                schoolPercentage: this.byId("schoolPercentage").getValue()
            };
            var anyFieldEmpty = Object.values(educationData).some(value => !value);
            if (anyFieldEmpty) {
                MessageBox.error("All fields are required.");
                return;
            }
            var oModel = this.getView().getModel("onboarding");
            if (!oModel) {
                MessageBox.error("Model 'onboarding' is not found!");
                return;
            }
            else{
                oModel.setProperty("/educationDetails", educationData);
        
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
