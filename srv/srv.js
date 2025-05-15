const cds = require('@sap/cds');
const {User,EmployeeDetails} = cds.entities('emp.onboard');

module.exports = async (srv) => {
    srv.on('CREATE', 'Users', async (req) => {
        const tx = cds.transaction(req);
         try {
            const res = await tx.run(INSERT.into(User).entries(req.data));
            return res;
        } catch (err) {
        console.error('Error during CREATE:', err);
        req.error(500, 'Failed to insert user details');
     }
    });
    srv.on('CREATE', 'EmployeeDetails', async (req) => {
        const tx = cds.transaction(req);
        try {
            const res = await tx.run(INSERT.into(EmployeeDetails).entries(req.data));
            return res;
        } catch (err) {
            console.error('Error during employee data insertion:', err);
            req.error(500, 'Failed to store employee details');
        }
    });
}