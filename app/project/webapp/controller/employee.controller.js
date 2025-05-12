sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("your.namespace.controller.employee", {
        onInit: function () {
            // Initialize a JSON model to store form data
            var oData = {
                name: "",
                dob: "",
                email: "",
                phone: "",
                qualification: "",
                branch: "",
                cgpa: "",
                files: []
            };
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "employee");
        },

        onSubmit: function () {
            var oView = this.getView();
            var oModel = oView.getModel("employee");
            var oData = oModel.getData();

            // Simple validation
            if (!oData.name || !oData.email || !oData.phone || !oData.qualification) {
                MessageToast.show("Please fill in all required fields!");
                return;
            }

            // Log data for debugging
            console.log("Employee Data Submitted:", oData);

            // Simulating a backend call
            MessageToast.show("Form submitted successfully!");
        },

        onFileUpload: function (oEvent) {
            var oUploader = oEvent.getSource();
            var aFiles = oUploader.getSelectedFiles();

            if (aFiles.length === 0) {
                MessageToast.show("Please select a file to upload.");
                return;
            }

            var oModel = this.getView().getModel("employee");
            oModel.setProperty("/files", aFiles);
            MessageToast.show("Files uploaded successfully!");
        }
    });
});
