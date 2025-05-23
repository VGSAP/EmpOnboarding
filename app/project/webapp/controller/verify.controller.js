sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("project.controller.verify", {

        onInit: function () {
            const oView = this.getView();
            const oModel = new sap.ui.model.json.JSONModel();
        
            $.ajax({
                url: "/odata/v4/onboarding/EmployeeDetails",
                method: "GET",
                success: function (data) {
                    oModel.setData({ EmployeeDetails: data.value || data });
                    oView.setModel(oModel);
                },
                error: function (err) {
                    sap.m.MessageToast.show("Failed to load employee details.");
                    console.log(err)
                }
            });
        },
        

        onNavTohome: function () {
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("home");
        },

        onApprove: function (oEvent) {
            const oContext = oEvent.getSource().getBindingContext();
            oContext.setProperty("status", "Verified");

            const oModel = oContext.getModel();
            oModel.submitBatch().then(() => {
                sap.m.MessageToast.show("Document approved!");
            }).catch(() => {
                sap.m.MessageToast.show("Error approving document.");
            });
        },

        onReject: function (oEvent) {
            const oContext = oEvent.getSource().getBindingContext();
            oContext.setProperty("status", "Rejected");

            const oModel = oContext.getModel();
            oModel.submitBatch().then(() => {
                sap.m.MessageToast.show("Document rejected.");
            }).catch(() => {
                sap.m.MessageToast.show("Error rejecting document.");
            });
        },

        onFilterVerified: function () {
            this._applyStatusFilter("Verified");
        },

        onFilterRejected: function () {
            this._applyStatusFilter("Rejected");
        },

        onFilterPending: function () {
            this._applyStatusFilter("Pending");
        },

        _applyStatusFilter: function (sStatus) {
            const oList = this.byId("documentList");
            const oBinding = oList.getBinding("items");
            const oFilter = new Filter("status", FilterOperator.EQ, sStatus);
            oBinding.filter([oFilter]);
        }
    });
});
