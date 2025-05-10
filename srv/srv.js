const cds = require('@sap/cds');

module.exports = async (srv) => {
    srv.before('CREATE', 'Users', async (req) => {
        const { EMAIL, PASSWORD, MOBILENUMBER } = req.data;
        
        if (!EMAIL.match(/^\S+@\S+\.\S+$/)) {
            req.error(400, "Invalid email format!");
        }
        
        if (PASSWORD.length < 8) {
            req.error(400, "Password must be at least 8 characters long!");
        }

        if (!MOBILENUMBER.match(/^[0-9]{10}$/)) {
            req.error(400, "Invalid mobile number!");
        }
    });
}