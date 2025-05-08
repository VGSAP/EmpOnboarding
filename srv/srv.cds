using { emp.onboard as emp } from '../db/data-model';

service OnboardingService {
    entity Employee as projection on emp.Employee;
    entity HRVerification as projection on emp.HRVerification;
    entity Manager as projection on emp.Manager;

}