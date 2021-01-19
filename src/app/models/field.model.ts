export interface FieldModel {
  id: number;
  label: string;
  fieldType: string;
  required: boolean;
  active: boolean;
  customerId: number;
  options: {id: number; optionValue: string}[];
}
