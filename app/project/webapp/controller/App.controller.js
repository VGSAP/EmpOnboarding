sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function(Controller) {
  "use strict";

  return Controller.extend("project.controller.Home", {
      onEmployeeLogin: function() {
          this.getOwnerComponent().getRouter().navTo("EmployeeLogin");
      }
  });
});

