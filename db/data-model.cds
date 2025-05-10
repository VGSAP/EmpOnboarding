namespace emp.onboard;

entity User {
    key ID: Integer;
    NAME: String;
    EMAIL: String;
    PASSWORD: String;
    MOBILENUMBER : String;
    ROLE : String default 'User';
    
}


