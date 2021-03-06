import {
    animation, trigger, animateChild, group,
    transition, animate, style, query
  } from '@angular/animations';
  
  export const transAnimation = animation([
    style({
      height: '{{ height }}',
      opacity: '{{ opacity }}',
      backgroundColor: '{{ backgroundColor }}'
    }),
    animate('{{ time }}')
  ]);

  var sliceToRight = [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ right: '-100%' })
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ right: '100%' }))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ right: '0%' }))
      ])
    ]),
    query(':enter', animateChild()),
  ];
  
  var sliceToLeft = [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '-100%' })
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ left: '100%' }))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%' }))
      ])
    ]),
    query(':enter', animateChild()),
  ];
  
  // Routable animations
  export const slideInAnimation =
    trigger('routeAnimations', [
      /// ABOUT *TO
      transition('HomePage => AboutPage', sliceToRight),
      /// ABOUT *BACK
      transition('AboutPage => HomePage', sliceToLeft), 
      /// INTRO PROJECT *TO
      transition('HomePage => IntroProjectPage', sliceToRight),
      transition('AboutPage => IntroProjectPage', sliceToRight),
      /// INTRO *BACK
      transition('IntroProjectPage => HomePage', sliceToLeft), 
      transition('IntroProjectPage => AboutPage', sliceToLeft), 

    ]);
  
  
  /*
  Copyright Google LLC. All Rights Reserved.
  Use of this source code is governed by an MIT-style license that
  can be found in the LICENSE file at http://angular.io/license
  */