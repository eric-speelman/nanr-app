import { SessionModel } from './SessionModel';

export class SignupResponseModel {
  success: boolean;
  errors: {
    email: string;
    username: string;
    referrer: string;
  };
  session: SessionModel;
}
