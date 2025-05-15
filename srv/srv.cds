using { emp.onboard as emp } from '../db/data-model';

service OnboardingService {
    entity Users as projection on emp.User;
    entity EmployeeDetails as projection on emp.EmployeeDetails;

}