export class SessionModel {
  id: string;
  user: {
    id: string;
    email: string;
    balance: number;
  };
}
