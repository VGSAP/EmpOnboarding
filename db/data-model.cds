namespace emp.onboard;


entity Employee {
    key ID            : UUID;
        FullName      : String;
        Email         : String;
        PhoneNumber   : String;
        CollegeName   : String;
        Degree        : String;
        Department    : String;
        PassingYear   : Integer;
        Percentage    : Integer;
        DateOfJoining : Date;
        Status        : String enum { Submitted; Verified; Approved; Rejected };
        Document      : String;
        SubmittedDate : Date;
        Address       : String;
}


entity HRVerification {
    key ID             : UUID;
        EmployeeID      : Association to Employee;
        VerifiedByHR    : String;
        HRComments      : String;
        VerifiedDate    : Date;
}

entity Manager {
    key ID             : UUID;
        EmployeeID      : Association to Employee;
        ApprovedByManager : String;
        DecisionDate : Date;
       
}



