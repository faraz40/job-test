import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  constructor(
    private actRoute: ActivatedRoute,
    public contactSvc: ContactsService
  ) {}
  ngOnInit(): void {
    this.actRoute.queryParams.subscribe((params) => {
      if (params && params['id']) {
        this.contactSvc.sel_contact_id = params['id'];
        this.contactSvc
          .getContactDetails(params['id'])
          .subscribe((response) => {
            if (!response) {
              console.log('Something went wrong !');
              return;
            }
            if (response['error']) {
              console.log(response['error']);
              return;
            }
            if (response) {
              console.log(response);
              this.contactSvc.contactDetails['details'] = response;
            }
          });
      }
    });
  }
}
