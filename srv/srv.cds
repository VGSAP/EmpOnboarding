using { emp.onboard as emp } from '../db/data-model';

service OnboardingService {
    entity Users as projection on emp.User;
    @cds.redirection.target : 'OnboardingService.UserDetails'
    entity UserDetails as projection on emp.User;

}