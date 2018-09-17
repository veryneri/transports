import {
  animate,
  keyframes,
  query,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const AlertViewAnimations = {
  alertViewSlideInSlideOut: trigger(
    'alertViewSlideInSlideOut',
    [
      transition(
        '* => *',
        [
          query(
            ':enter',
            style({ opacity: 0 }),
            { optional: true }
          ),
          query(
            ':enter',
            animate(
              '0.6s ease-in',
              keyframes(
                [
                  style(
                    {
                      opacity: 0,
                      transform: 'translateY(-75%)',
                      offset: 0
                    }
                  ),
                  style(
                    {
                      opacity: 0.5,
                      transform: 'translateY(35px)',
                      offset: 0.5
                    }
                  ),
                  style(
                    {
                      opacity: 1,
                      transform: 'translateY(0)',
                      offset: 1
                    }
                  )
                ]
              )
            ),
            { optional: true }
          ),
          query(
            ':leave',
            animate(
              '0.6s ease-in',
              keyframes(
                [
                  style(
                    {
                      opacity: 1,
                      transform: 'translateY(0)',
                      offset: 0
                    }
                  ),
                  style(
                    {
                      opacity: 0.5,
                      transform: 'translateY(35px)',
                      offset: 0.5
                    }
                  ),
                  style(
                    {
                      opacity: 0,
                      transform: 'translateY(-75%)',
                      offset: 1
                    }
                  )
                ]
              )
            ),
            { optional: true }
          )
        ]
      ),
    ]
  ),
  animeTrigger: trigger(
    'animeTrigger',
    [
      transition(
        ':enter',
        style({ transform: 'translateY(0)' })
      ),
      transition(
        '* => *',
        [
          animate(
            700,
            keyframes(
              [
                style({opacity: 0, transform: 'translateY(-100%)', offset: 0}),
                style({opacity: 1, transform: 'translateY(25px)',  offset: 0.3}),
                style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
              ]
            )
          )
        ]
      )
    ]
  ),
  flyInOut: trigger(
    'flyInOut',
    [
      state(
        'in',
        style({ transform: 'translateY(0)' })
      ),
      transition(
        'void => *',
        [
          style({transform: 'translateY(-100%)'}),
          animate(100)
        ]
      ),
      transition(
        '* => void',
        [
          animate(100, style({transform: 'translateY(100%)'}))
        ]
      )
    ]
  )
};
