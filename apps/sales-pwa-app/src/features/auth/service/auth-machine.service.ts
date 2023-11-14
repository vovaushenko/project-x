import { Maybe } from '@project-x/common';
import {
  IRegistrUserOnClientDto,
  ISalesSignInApiResponse,
  ISalesSignInDto,
} from '@project-x/model';
import { AVXError } from '@project-x/web-lib';
import { createMachine, interpret } from 'xstate';
import { AuthApiService } from './auth-api.service';

export type AuthContext = {
  accessToken: string;
  refreshToken: string;
  error: Maybe<AVXError>;
};

export type AuthEvents =
  | {
      type: 'SIGN_IN';
      payload: ISalesSignInDto;
    }
  | { type: 'SIGN_UP'; payload: IRegistrUserOnClientDto }
  | { type: 'SIGN_OUT' }
  | { type: 'SET_TOKENS'; payload: ISalesSignInApiResponse }
  | { type: 'SET_ERROR'; payload: AVXError };

export const intialAuthContext: AuthContext = {
  accessToken: '',
  refreshToken: '',
  error: null,
};

const authApiService = new AuthApiService();

export const authMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgBsB7KGCAeQFcAXAYgGUBJAcQDkB9d7gG0ADAF1EoAA4VYuRrgr4JIAB6IAjAE4AbCQCsAZgDserQCY9wvZs3qDAGhABPRGbMAOEme0X1wzWbq2kZGBmYAvuGOaFh4hKSU1JAMLBw8vACqAAoi4kgg0rLyispqCFq6hibmlta2Ds4aBsL6xpYhmlZ6pkaR0Rg4BMQkslD47PhsXHy0GQAqucqFcgpK+WUVrdUBtTZ2ji7lRpokACzCF-4GetrqQWanfSAxg-EjuGMZklPpswtiSxkKxK6w0Oi2ph2Vj2DUO7nUJGClmEPgeNnOmkiURA+AoEDgyhecWIgKKq1KiAAtNoDlTtE8iUMElQaClScC1qAyqczLSEAEzncLAYdJo9KEdAyBsTSKNxpyCkDigqygYDKcztp3EZ3IZNO4DYY+eptSR1EYzJp1eozEY7lLYkz3p9JOzlRSEGqNactTq9QbdbDEO4TqdTjrbMIDcIjKdNI8sUA */
    predictableActionArguments: true,
    schema: {
      context: {} as AuthContext,
      events: {} as AuthEvents,
    },
    context: intialAuthContext,
    initial: 'unaunthenticated',
    states: {
      unaunthenticated: {
        on: {
          SIGN_IN: 'signingIn',
          SIGN_UP: 'signingUp',
        },
      },
      signingIn: {
        invoke: {
          src: 'performSignIn',
          onDone: {
            target: 'authenticated',
          },
          onError: {
            target: 'unaunthenticated',
          },
        },
      },
      signingUp: {
        invoke: {
          src: 'performSignUp',
          onDone: {
            target: 'signedUp',
          },
          onError: {
            target: 'unaunthenticated',
            actions: ['SET_ERROR'],
          },
        },
      },
      signedUp: {
        on: {
          SIGN_IN: 'signingIn',
        },
      },
      authenticated: {
        on: {
          SIGN_OUT: 'signingOut',
        },
      },
      signingOut: {
        invoke: {
          src: 'performSignOut',
          onDone: {
            target: 'unaunthenticated',
          },
          onError: {
            target: 'unaunthenticated',
            actions: [],
          },
        },
      },
    },
  },
  {
    actions: {
      SET_TOKENS: (context, event: any) => {
        debugger;
        context.accessToken = event.data?.accessToken;
        context.refreshToken = event.data?.refreshToken;
      },
      SET_ERROR: (context, event) => {
        if (event.type === 'SET_ERROR') {
          context.error = event.payload;
        }
      },
    },
    services: {
      performSignIn: async (context, event) => {
        debugger;
        if (event.type === 'SIGN_IN') {
          const signInResult = await authApiService.signIn(event.payload);

          if (!signInResult.success) {
            context.error = signInResult.error;
            throw signInResult.error;
          }

          context.accessToken = signInResult.value.accessToken;
          context.refreshToken = signInResult.value.refreshToken;
        }
      },
      performSignUp: async () => {},
      performSignOut: async () => {},
    },
  },
);

export const authMachineService = interpret(authMachine);
