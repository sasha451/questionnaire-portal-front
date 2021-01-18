export interface FieldModel {
  id: number;
  label: string;
  fieldType: string;
  required: string;
  active: string;
  customerId: number;
  options: {id: number; optionValue: string}[];
}
