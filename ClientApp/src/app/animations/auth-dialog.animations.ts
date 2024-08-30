import {animate, state, style, transition, trigger} from '@angular/animations';

export const slideInAnimation = trigger('slideInAnimation', [
  state('login', style({transform: 'translateX(0)'})),
  state('register', style({transform: 'translateX(-100%)'})),
  transition('login => register', [animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))]),
  transition('register => login', [animate('0.5s ease-in-out', style({transform: 'translateX(0)'}))]),
]);
