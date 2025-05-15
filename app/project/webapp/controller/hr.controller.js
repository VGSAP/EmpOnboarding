sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("project.controller.hr", {
      onInit: function () {
          this._router = sap.ui.core.UIComponent.getRouterFor(this);
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
