import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { Services } from '../../components/services/services';
import { Providers } from '../../components/providers/providers';
import { HowItWorks } from '../../components/how-it-works/how-it-works';
import { Testimonials } from '../../components/testimonials/testimonials';

@Component({
  selector: 'app-home',
  imports: [Hero, Services, Providers, HowItWorks, Testimonials],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {}
