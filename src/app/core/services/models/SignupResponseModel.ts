import { SessionModel } from './SessionModel';

export class SignupResponseModel {
  success: boolean;
  errors: {
    email: string;
    username: string;
  };
  session: SessionModel;
}
