import { Component, OnInit } from '@angular/core';
import {CustomerModel} from '../../../../models/customer.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  customer: CustomerModel;
  constructor(private router: Router) {
    this.customer = JSON.parse(localStorage.getItem('customer_info') as string);
    console.log(this.customer);
  }

  ngOnInit(): void {
  }

  logOut(): void {
    localStorage.clear();
    window.location.reload();
  }
}
