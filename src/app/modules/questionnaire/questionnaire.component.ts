import {Component, OnInit} from '@angular/core';
import {FieldModel} from '../../models/field.model';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {FieldServiceService} from '../../services/field-service.service';
import {RxUnsubscribe} from '../../classes/rx-unsubscribe';
import {FormBuilder, FormArray, Validators, FormGroup, ValidatorFn} from '@angular/forms';
import {ResponseServiceService} from '../../services/response-service.service';
import {ResponseModel} from '../../models/response.model';
import {ResponseEntryModel} from '../../models/responseEntry.model';
import {requireCheckboxesToBeCheckedValidator} from "./checkboxValidator";

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent extends RxUnsubscribe implements OnInit {
  // @ts-ignore
  fields: FieldModel[] = [];
  // @ts-ignore
  id: number;
  // @ts-ignore
  questionnaireFromGroup = this.formBuilder.group({
    aliases: this.formBuilder.array([])
  });

  constructor(private route: ActivatedRoute,
              private fieldService: FieldServiceService,
              private formBuilder: FormBuilder,
              private responseService: ResponseServiceService,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    const id1 = this.route.snapshot.paramMap.get('id');
    // @ts-ignore
    this.id = +id1;
    this.loadFields(this.id);
  }

  get aliases() {
    return this.questionnaireFromGroup.get('aliases') as FormArray;
  }

  loadFields(customerId: number): void {
    this.fieldService.getFields(customerId)
      .pipe(
        takeUntil((this.destroy$))
      )
      .subscribe(
        (fieldsArray: FieldModel[]) => {
          fieldsArray.forEach((value) => {
            if (value.active) {
              this.fields.push(value);
              if (value.fieldType === 'CHECKBOX') {
                let myGroup = this.formBuilder.group({});
                for (let option of value.options) {
                  myGroup.addControl(option.optionValue, this.formBuilder.control(''));
                }
                this.aliases.push(myGroup);
                myGroup.setValidators(requireCheckboxesToBeCheckedValidator());
              } else if (value.fieldType === 'RADIO_BUTTON') {
                let myGroup = this.formBuilder.group({
                  'model': value.options[0].optionValue
                });
                this.aliases.push(myGroup);
              } else if (value.required) {
                this.aliases.push(this.formBuilder.control('', Validators.required));
              } else {
                this.aliases.push(this.formBuilder.control(''));
              }
            }
          });
        }
      );
  }

  public onSubmit(): void {
    const answer = this.aliases.value;
    console.log(answer);
    let myResponseEntries: ResponseEntryModel[] = [];
    this.fields.forEach((value, index) => {
      if (value.fieldType === 'CHECKBOX') {
        let myAnswer: String = '';
        for (let option of value.options) {
          if (answer[index][option.optionValue]) {
            myAnswer = myAnswer.concat(' ', option.optionValue.toString());
          }
        }
        // @ts-ignore
        let responseEntry: ResponseEntryModel = {id: 0, fieldId: value.id, responseEntryValue: myAnswer};
        myResponseEntries.push(responseEntry);
      } else if (value.fieldType === 'DATE') {
        let myAnswer: String = '';
        myAnswer = myAnswer.concat(answer[index].year, '-', answer[index].month, '-', answer[index].day);
        // @ts-ignore
        let responseEntry: ResponseEntryModel = {id: 0, fieldId: value.id, responseEntryValue: myAnswer};
        myResponseEntries.push(responseEntry);
      } else if (value.fieldType === 'RADIO_BUTTON') {
        let val1 = answer[index].model;
        // @ts-ignore
        let responseEntry: ResponseEntryModel = {id: 0, fieldId: value.id, responseEntryValue: val1};
        myResponseEntries.push(responseEntry);
      } else {
        let responseEntry: ResponseEntryModel = {id: 0, fieldId: value.id, responseEntryValue: answer[index]};
        myResponseEntries.push(responseEntry);
      }
    });
    const response: ResponseModel = {id: 0, customerId: this.id, responseEntries: myResponseEntries};
    this.responseService.saveField(response).subscribe((response) => {
      this.router.navigate(['/profile/successSaved']);
      console.log('success');
      console.log(response);
    });
  }
}
