namespace emp.onboard;

entity User {
    key id: String;
    name: String;
    email: String;
    password: String;
    mobilenumber : String;
    role : String;
    
}

entity EmployeeDetails {
    key ID          : UUID;
    firstName       : String(50);
    lastName        : String(50);
    dob             : Date;
    email           : String(100);
    phone           : String(10);
    gender          : String(10);
    nationality     : String(50);
    address         : String(200);
    city           : String(50);
    state          : String(50);
    country        : String(50);
    zipCode        : String(10);
    highestQualification : String(50);
    branch              : String(50);
    collegeName         : String(150);
    percentage          : Decimal(5,2);
    highSchoolStream    : String(50);
    highSchool         : String(100);
    highSchoolPercentage : Decimal(5,2);
    school              : String(100);
    schoolPercentage    : Decimal(5,2);
    status              :String;
    

}


