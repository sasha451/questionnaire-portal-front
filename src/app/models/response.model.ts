export interface ResponseModel {
  id: number;
  customerId: number;
  responseEntries: {id: number; fieldId: number; responseEntryValue: string}[];
}
