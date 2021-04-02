import {
    animation, trigger, animateChild, group,
    transition, animate, style, query, state
  } from '@angular/animations';

  export const genericAnimations = [	    
    trigger('fadeInOut', [
        transition('void => *', [
          style({ opacity: 0 }), //style only for transition transition (after transiton it removes)
          animate(1000, style({ opacity: 1 })) // the new state of the transition(after transiton it removes)
        ]),
        transition('* => void', [
          animate(600, style({ opacity: 0 })) // the new state of the transition(after transiton it removes)
        ])
      ])
]