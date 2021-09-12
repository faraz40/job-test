import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private actRoute: ActivatedRoute,
    public contactSvc: ContactsService
  ) {}
  private subs = new SubSink();

  ngOnInit(): void {
    this.subs.add(
      this.actRoute.queryParams.subscribe((params) => {
        if (params && params['id']) {
          this.subs.add(
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
                } else {
                  console.log(response);
                  this.contactSvc.contactDetails['details'] = response;
                }
              })
          );
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
