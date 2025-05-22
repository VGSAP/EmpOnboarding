sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("project.controller.verify", {
        onInit: function () {
            var oModel = new JSONModel({
                pendingDocuments: [
                    { employeeName: "John Doe", documentType: "Passport", submissionDate: "2025-05-15" },
                    { employeeName: "Jane Smith", documentType: "Degree Certificate", submissionDate: "2025-05-12" }
                ],
                employees: [
                    { name: "John Doe", department: "HR", email: "john.doe@example.com", phone: "+91 9876543210", status: "Pending" },
                    { name: "Jane Smith", department: "Finance", email: "jane.smith@example.com", phone: "+91 9876543201", status: "Verified" }
                ]
            });

            this.getView().setModel(oModel);
        },
        onNavTohome: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("home");
        },
        

        onApprove: function () {
            sap.m.MessageToast.show("Document approved!");
        },

        onReject: function () {
            sap.m.MessageToast.show("Document rejected!");
        },
        onApprove: function (oEvent) {
            var oModel = this.getView().getModel();
            var aPendingDocs = oModel.getProperty("/pendingDocuments");
            var aVerifiedDocs = oModel.getProperty("/verifiedDocuments") || [];
            var aEmployees = oModel.getProperty("/employees");
        
            // Get selected document details
            var oItem = oEvent.getSource().getParent().getParent();
            var oContext = oItem.getBindingContext();
            var oApprovedDoc = oContext.getObject();
        
            // Remove from pending list
            var aUpdatedDocs = aPendingDocs.filter(doc => doc.employeeName !== oApprovedDoc.employeeName);
            oModel.setProperty("/pendingDocuments", aUpdatedDocs);
        
            // Add to verified list
            aVerifiedDocs.push(oApprovedDoc);
            oModel.setProperty("/verifiedDocuments", aVerifiedDocs);
        
            // Update employee status
            aEmployees.forEach(emp => {
                if (emp.name === oApprovedDoc.employeeName) {
                    emp.status = "Verified";
                }
            });
            oModel.setProperty("/employees", aEmployees);
        
            sap.m.MessageToast.show("Document verified!");
        },
        
        onReject: function (oEvent) {
            var oModel = this.getView().getModel();
            var aPendingDocs = oModel.getProperty("/pendingDocuments");
            var aRejectedDocs = oModel.getProperty("/rejectedDocuments") || [];
            var aEmployees = oModel.getProperty("/employees");
        
            // Get selected document details
            var oItem = oEvent.getSource().getParent().getParent();
            var oContext = oItem.getBindingContext();
            var oRejectedDoc = oContext.getObject();
        
            // Remove from pending list
            var aUpdatedDocs = aPendingDocs.filter(doc => doc.employeeName !== oRejectedDoc.employeeName);
            oModel.setProperty("/pendingDocuments", aUpdatedDocs);
        
            // Add to rejected list
            aRejectedDocs.push(oRejectedDoc);
            oModel.setProperty("/rejectedDocuments", aRejectedDocs);
        
            // Update employee status
            aEmployees.forEach(emp => {
                if (emp.name === oRejectedDoc.employeeName) {
                    emp.status = "Rejected";
                }
            });
            oModel.setProperty("/employees", aEmployees);
        
            sap.m.MessageToast.show("Document rejected.");
        }
        
        
        
        
    });
});
