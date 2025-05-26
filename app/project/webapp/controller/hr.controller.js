sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("project.controller.hr", {
      onInit: function () {
          this._router = sap.ui.core.UIComponent.getRouterFor(this);

          $.ajax({
            url: "/odata/v4/onboarding/Stats",
            method: "GET",
            success: function (data) {
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData({ stats: data.value[0] || data });
                oView.setModel(oModel);
            },
            error: function (err) {
                sap.m.MessageToast.show("Failed to load statistics.");
                console.error(err);
            }
        });
        
      },

      onNavTohome: function () {
          this._router.navTo("home");
      },
      

      onNavToEmployee: function () {
          this._router.navTo("employee");
      },

      onNavToVerify: function () {
          this._router.navTo("verify");
      }
  });
});
