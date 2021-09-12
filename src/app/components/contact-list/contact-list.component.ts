import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  constructor(public contactSvc: ContactsService, private router: Router) {}
  contactsList = [];
  ngOnInit(): void {
    this.getContacts();
  }
  getContacts(): void {
    this.contactSvc.getContactsList().subscribe((response) => {
      if (!response) {
        console.log('Something went wrong !');
        return;
      }
      if (response['error']) {
        console.log(response['error']);
        return;
      } else {
        this.contactsList = response;
        console.log(this.contactsList);
      }
    });
  }
  viewContactDetails(item: any): void {
    this.router.navigate([], {
      queryParams: { id: item['id'] },
      queryParamsHandling: 'merge',
    });
    this.contactSvc.contactDetails['image_url'] = item['image_url'];
    this.contactSvc.contactDetails['firstName'] = item['firstName'];
    this.contactSvc.contactDetails['lastName'] = item['lastName'];
    this.contactSvc.contactDetails['profession'] = item['profession'];
  }
  ngOnDestroy(): void {}
}
