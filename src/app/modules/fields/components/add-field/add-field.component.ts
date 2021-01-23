import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FieldModel} from '../../../../models/field.model';
import {OptionModel} from '../../../../models/option.model';
import {FieldServiceService} from '../../../../services/field-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.css']
})
export class AddFieldComponent implements OnInit {

  // @ts-ignore
  editFieldFormGroup: FormGroup;
  checked = true;
  constructor(public modal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private fieldService: FieldServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.editFieldFormGroup = this.formBuilder.group({
      label: this.formBuilder.control('', Validators.required),
      type: this.formBuilder.control('', Validators.required),
      options: this.formBuilder.control('', Validators.required),
      required: this.formBuilder.control(true, Validators.required),
      isActive: this.formBuilder.control(true, Validators.required)
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
        // @ts-ignore
        myOptions.push({id: 0, optionValue: o});
      }
    } else {
      myOptions = [];
    }
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
    const field: FieldModel = {id: 0, label: answer.label, fieldType: answer.type, active: realIsActive, required: realRequired, customerId: customerId1, options: myOptions};
    this.fieldService.saveField(field).subscribe(() => {
        this.modal.close('Yes');
        return;
      });
  }

  getRequiredError(elemName: string): string {
    // @ts-ignore
    return  this.editFieldFormGroup.get(elemName).hasError('required') ? 'You must enter a value' : '';
  };
}
