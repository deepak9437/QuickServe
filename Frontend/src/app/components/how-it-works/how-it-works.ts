import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.scss'
})
export class HowItWorks {
  steps = [
    { num: '01', icon: '🔍', title: 'Search & Browse', desc: 'Tell us what service you need and your location. Browse verified professionals instantly.' },
    { num: '02', icon: '💬', title: 'Compare & Connect', desc: 'View profiles, ratings, and reviews. Message providers directly to discuss your requirements.' },
    { num: '03', icon: '📅', title: 'Book & Confirm', desc: 'Schedule at your convenience. Get instant confirmation and reminders before the appointment.' },
    { num: '04', icon: '⭐', title: 'Done & Review', desc: 'Job completed to your satisfaction. Pay securely and leave a review to help the community.' },
  ];
}
