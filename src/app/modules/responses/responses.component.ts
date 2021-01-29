import { Component, OnInit } from '@angular/core';
import {ResponseModel} from '../../models/response.model';
import {ResponseServiceService} from '../../services/response-service.service';
import {RxUnsubscribe} from '../../classes/rx-unsubscribe';
import {takeUntil} from 'rxjs/operators';
import {FieldModel} from '../../models/field.model';
import {FieldServiceService} from '../../services/field-service.service';
import {ResponseEntryModel} from '../../models/responseEntry.model';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent extends RxUnsubscribe implements OnInit {
  // @ts-ignore
  responses: ResponseModel[];
  // @ts-ignore
  slicedResponses: ResponseModel[];
  // @ts-ignore
  fields: FieldModel[];
  // @ts-ignore
  customerId: number;
  greetings: ResponseModel[] = [];
  showConversation: boolean = false;
  ws: any;
  // @ts-ignore
  name: string;
  // @ts-ignore
  disabled: boolean;
  page = 1;
  pageSize = 4;
  constructor(private responseService: ResponseServiceService,
              private fieldService: FieldServiceService) {
    super();
  }

  ngOnInit(): void {
    this.customerId = JSON.parse(localStorage.getItem('customer_info') as string).id;
    this.loadResponses(this.customerId);
    this.loadFields(this.customerId);
    this.connect();
  }

  connect() {
    let socket = new WebSocket("ws://localhost:8085/greeting");
    this.ws = Stomp.over(socket);
    let that = this;
    // @ts-ignore
    this.ws.connect({}, function(frame) {

      // @ts-ignore
      that.ws.subscribe("/errors", function(message) {
        alert("Error " + message.body);
      });
      // @ts-ignore
      that.ws.subscribe("/topic/reply", function(message) {
        that.showGreeting(message.body);
      });
      that.disabled = true;
      // @ts-ignore
    }, function(error) {
      alert("STOMP error " + error);
    });
  }

  disconnect() {
    if (this.ws != null) {
      this.ws.ws.close();
    }
    this.setConnected(false);
    console.log("Disconnected");
  }

  sendName() {
    let data = JSON.stringify({
      'name' : this.name
    })
    this.ws.send("/app/message", {}, data);
  }

  // @ts-ignore
  showGreeting(message) {
    this.responses.push(message);
    this.loadResponses(this.customerId);
  }

  // @ts-ignore
  setConnected(connected) {
    this.disabled = connected;
    this.showConversation = connected;
    this.greetings = [];
  }

  answerWillBe(fieldId: number, responseEntries: ResponseEntryModel[]): boolean {
    let length = responseEntries.length;
    let returnValue = false;
    responseEntries.forEach((responseEntry, index) => {
      if (responseEntry.fieldId === fieldId) {
        returnValue = true;
      }
    });
    return returnValue;
  }

  getAnswer(fieldId: number, responseEntries: ResponseEntryModel[]): string {
    let length = responseEntries.length;
    let returnValue = '';
    responseEntries.forEach((responseEntry, index) => {
      if (responseEntry.fieldId === fieldId) {
        returnValue = responseEntry.responseEntryValue
      }
    });
    return returnValue;
  }


  loadResponses(customerId: number): void {
    this.responseService.getResponses(customerId)
      .pipe(
        takeUntil((this.destroy$))
      )
      .subscribe(
        (responseArray: ResponseModel[]) => {
          this.responses = responseArray;
          this.refreshResponses();
        }
      );
  }

  refreshResponses() {
    this.slicedResponses =  this.responses
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  loadFields(customerId: number): void {
    this.fieldService.getFields(customerId)
      .pipe(
        takeUntil((this.destroy$))
      )
      .subscribe(
        (fieldsArray: FieldModel[]) => {
          this.fields = fieldsArray;
        }
      );
  }
}
