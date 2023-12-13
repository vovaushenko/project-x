import { createMachine, interpret } from 'xstate';

export type TTrafficLight = 'red' | 'yellow' | 'green' | null;

export type TrafficLightContext = {
  light: TTrafficLight;
  isActive: boolean;
  authToken: string;
  user: { name: string; age: number } | null;
};

export type TrafficLightEvents =
  | { type: 'CHANGE_LIGHT' }
  | { type: 'CHANGE_LIGHT_TO'; payload: TTrafficLight }
  | { type: 'CHANGE_LIGHT_TO_RED' }
  | { type: 'ACTIVATE' }
  | { type: 'DEACTIVATE' }
  | { type: 'FOO' };

export const trafficLightMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlwgBswBiAQQGEAVASQDVbGBRAbQAYBdRKAAOAe1i4ALrlH4hIAB6IAjAGZlJVQA4A7AFZe6gCwAmXnq1aANCACeiPct4lzANhOu9ATmVnleowBfQJs0LDxCUixpADcaABFOBhZ2Lj5BJBAxCWlZeSUEZVcvEldXXh8vV0synWVrO0R9EiMdVS9LMzqdVyCQkDCcAmISaNw46noACVoAOQBxTgB9ABlmeanGdPlsqRk5TIKTKs19Xl5lHWOvEzbXG3sEIy8dEj09d08fPwDg0IwhpFRphYmASAAnSCTGYLZZrDZbAQ7cR7PKHRBGYotar6co9XiY+6NBCqHSvdwGZT+KrKF46Pr-cLDKIg8Zg2xgCgUUQAd2hc0Wq3Wm22mV2uQOoAK9NU2JMjnl5RMl2UD0Q8te2n0yt4lip7z+AwBERGYziJCgkLA+H5sKFCNFIhREvyTSMssx8t8H14yrqapJZNK8ou1NctLJfX6+FEEDg8kGJqIyJy+1dCAAtETHhnfCQ-Bcbu6tOHtMpDYnmWRKGAU6jJYoMSYAyWSF5WkW9KpVJ8qhXjVWzbWxc60+iECYjFpTgYLlcvDc7gHfCY3qSp1ovB86h9+0ygUOIZA6y7x9pnLrvcdux0dA1Hh5V2UCcccaZlXvAabWeaOVzeSeY5SogNwaO8nzFLwrjdtBAakiUWj1GSASGF43ZFJ+SbAqCFpWg24pAY2CC9K8Hxei+yqePeiCkpqSH6EYqHoa4wTBEAA */
    predictableActionArguments: true,
    schema: {
      context: {} as TrafficLightContext,
      events: {} as TrafficLightEvents,
    },
    initial: 'idle',
    context: {
      light: null,
      authToken: '',
      isActive: false,
      user: null,
    },
    states: {
      idle: {
        on: {
          ACTIVATE: 'active',
        },
      },
      active: {
        initial: 'red',
        entry: ['SET_INITIAL_LIGHT_TO_RED'],
        on: {
          DEACTIVATE: 'idle',
        },
        states: {
          red: {
            on: {
              CHANGE_LIGHT: 'green',
            },
          },
          yellow: {
            on: {
              CHANGE_LIGHT: 'red',
            },
          },
          green: {
            on: {
              CHANGE_LIGHT: 'yellow',
            },
          },
        },
      },
    },
  },
  {
    actions: {
      SET_INITIAL_LIGHT_TO_RED: (context) => {
        context.light = 'red';
      },
    },
  },
);

export const trafficLightService = interpret(trafficLightMachine);
