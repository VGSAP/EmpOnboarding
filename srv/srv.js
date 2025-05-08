const cds = require('@sap/cds');

module.exports = async function (srv) {
    
    // Validating Employee entity before creating
    srv.before('CREATE', 'Employee', async (req) => {
        const { FullName, Email, PhoneNumber, CollegeName, Degree, Department, PassingYear, Percentage, DateOfJoining, Status, Document } = req.data;

        // Validate mandatory fields
        if (!FullName || !Email || !PhoneNumber || !CollegeName || !Degree || !PassingYear || !Percentage || !DateOfJoining || !Document) {
            req.error(400, 'All fields are required.');
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            req.error(400, 'Invalid email format.');
        }

        // Validate phone number format (Only digits, length check)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(PhoneNumber)) {
            req.error(400, 'Phone number must be 10 digits.');
        }

        // Validate passing year (Cannot be future)
        const currentYear = new Date().getFullYear();
        if (PassingYear > currentYear) {
            req.error(400, 'Passing Year cannot be in the future.');
        }

        // Validate percentage range
        if (Percentage < 0 || Percentage > 100) {
            req.error(400, 'Percentage must be between 0 and 100.');
        }

        // Validate Date of Joining (Cannot be before Passing Year)
        if (new Date(DateOfJoining).getFullYear() < PassingYear) {
            req.error(400, 'Date of Joining must be after Passing Year.');
        }

        // Validate Status value (Must match allowed enums)
        const allowedStatus = ['Submitted', 'Verified', 'Approved', 'Rejected'];
        if (!allowedStatus.includes(Status)) {
            req.error(400, `Status must be one of: ${allowedStatus.join(', ')}`);
        }
    });

    // Validation for HR verification
    srv.before('CREATE', 'HRVerification', async (req) => {
        const { EmployeeID, VerifiedByHR, HRComments, VerifiedDate } = req.data;
    
        // Ensure Employee exists
        const employee = await SELECT.one.from('Employee').where({ ID: EmployeeID });
        if (!employee) {
            req.error(400, 'Employee does not exist.');
        }

        

        // Correct VerifiedDate check
        const currentYear = new Date().getFullYear();
        if (new Date(VerifiedDate).getFullYear() > currentYear) {
            req.error(400, 'Verified Year cannot be in the future.');
        }
    });

    // Validation for manager approval
    srv.before('CREATE', 'ManagerApproval', async (req) => {
        const { EmployeeID, ApprovedByManager, DecisionDate } = req.data;

        // Ensure Employee exists
        const employee = await SELECT.one.from('Employee').where({ ID: EmployeeID });
        if (!employee) {
            req.error(400, 'Employee does not exist.');
        }
        // Correct DecisionDate check
        if (new Date(DecisionDate).getFullYear() > currentYear) {
            req.error(400, 'Decision Year cannot be in the future.');
        }
    });

};
