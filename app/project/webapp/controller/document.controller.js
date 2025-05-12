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

            var missingDocs = [];
            Object.keys(requiredDocs).forEach(function (doc) {
                if (!requiredDocs[doc]) {
                    missingDocs.push(doc);
                }
            });

            if (missingDocs.length > 0) {
                MessageBox.error("Please upload the following documents:\n" + missingDocs.join("\n"));
            } else {
                MessageToast.show("Registered successfully!");
                // Proceed to next step
            }
        }
    });
});
