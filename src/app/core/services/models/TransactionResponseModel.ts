export class TransactionResponseModel {
  clicksSent: [
    {
      timestamp: string;
      page: string
    }
  ];
  clicksRecieved: [
    {
      timestamp: string;
      page: string
    }
  ];
  withdraws: [
    {
      id: string;
      createdOn: string;
      status: number;
      usdAmount: number;
      NanrAmount: number;
    }
  ];
}
