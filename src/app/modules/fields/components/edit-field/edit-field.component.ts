import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FieldServiceService} from "../../../../services/field-service.service";
import {Router} from "@angular/router";
import {OptionModel} from "../../../../models/option.model";
import {FieldModel} from "../../../../models/field.model";

@Component({
  selector: 'app-edit-field',
  templateUrl: './edit-field.component.html',
  styleUrls: ['./edit-field.component.css']
})
export class EditFieldComponent implements OnInit {

  // @ts-ignore
  editFieldFormGroup: FormGroup;
  checked = true;
  // @ts-ignore
  fieldModel: FieldModel;
  oldOptions: OptionModel[] = [];
  constructor(public modal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private fieldService: FieldServiceService,
              private router: Router) { }

  ngOnInit(): void {
    let myOptions: String = '';
    let optionsLength = this.fieldModel.options.length;
    this.fieldModel.options.forEach(option => this.oldOptions.push(option));
    this.fieldModel.options.forEach((option, index) => {
      if (index === optionsLength - 1) {
        myOptions = myOptions.concat(option.optionValue);
      } else {
        myOptions = myOptions.concat(option.optionValue, '\n');
      }
    });
    this.editFieldFormGroup = this.formBuilder.group({
      label: this.formBuilder.control(this.fieldModel.label, Validators.required),
      type: this.formBuilder.control(this.fieldModel.fieldType, Validators.required),
      options: this.formBuilder.control(myOptions, Validators.required),
      required: this.formBuilder.control(this.fieldModel.required, Validators.required),
      isActive: this.formBuilder.control(this.fieldModel.active, Validators.required)
    });
  }

  isDisabled(): boolean {
    if (this.editFieldFormGroup.get('type')) {
      // @ts-ignore
      const value = this.editFieldFormGroup.get('type').value;
      if ((value === 'SINGLE_LINE_TEXT') || (value === 'MULTILINE_TEXT') || (value === 'DATE')) {
        this.editFieldFormGroup.controls[`options`].disable();
        return true;
      }
    }
    this.editFieldFormGroup.controls[`options`].enable();
    return false;
  }

  onSubmit(): void {
    const customerId1 = JSON.parse(localStorage.getItem('customer_info') as string).id;
    const answer = this.editFieldFormGroup.value;
    let myOptions: OptionModel[] = [];
    if (answer.options !== undefined) {
      const optionsSplit = answer.options.split('\n');
        for (let o of optionsSplit) {
          let isPushed = false;
          // @ts-ignore
          this.oldOptions.forEach(oldOption => {
            if (oldOption.optionValue === o) {
              myOptions.push(oldOption);
              isPushed = true;
            }
          });
          if (!isPushed) {
            myOptions.push({id: 0, optionValue: o});
          }
        }
    } else {
      myOptions = [];
    }
    console.log(myOptions);
    let realRequired: boolean;
    let realIsActive: boolean;
    if (answer.required === undefined) {
      realRequired = true;
    } else {
      realRequired = answer.required;
    }
    if (answer.isActive === undefined) {
      realIsActive = true;
    } else {
      realIsActive = answer.isActive;
    }
    // @ts-ignore
    const field: FieldModel = {id: this.fieldModel.id, label: answer.label, fieldType: answer.type, active: realIsActive, required: realRequired, customerId: customerId1, options: myOptions};
    this.fieldService.updateField(field).subscribe(() => {
      this.modal.close('Yes');
      return;
    });
  }

  getRequiredError(elemName: string): string {
    // @ts-ignore
    return  this.editFieldFormGroup.get(elemName).hasError('required') ? 'You must enter a value' : '';
  };
}
