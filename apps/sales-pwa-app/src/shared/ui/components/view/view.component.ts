import { LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import {
  BeforeEnterObserver,
  PreventAndRedirectCommands,
  Router,
  RouterLocation,
} from '@vaadin/router';
import { ApplicationPath, ApplicationRoute } from '../../../../app/router/lib/router.routes';
import { RouterUtils } from '../../../../app/router/lib/router.utils';
import { IAVXClientUser } from '@project-x/model';
import { Maybe } from '../../../types';

export class ApplicationView extends LitElement implements BeforeEnterObserver {
  onBeforeEnter(location: RouterLocation, commands: PreventAndRedirectCommands, router: Router) {
    this.location = location;

    const navigatedFromRoute = router.location.route as ApplicationRoute;
    const currentRoute = location.route as ApplicationRoute;
    console.log({ navigatedFromRoute, currentRoute });
    this.user = this.getInitialUser();

    const isPrivateRoute = RouterUtils.isPrivateRoute(currentRoute);

    if (isPrivateRoute) {
      // TODO: this handlers will be moved to auth service
      if (currentRoute.authorizedRoles && !currentRoute.authorizedRoles.includes(this.user.role)) {
        alert('You cannot access this route');
        return commands.prevent();
      }
    }
  }

  @state() location: RouterLocation | null = null;
  @state() user: Maybe<IAVXClientUser> = null;

  connectedCallback(): void {
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  getInitialUser(): IAVXClientUser {
    // TODO: mock implementation
    return {
      id: '123',
      role: 'user',
      email: 'hello@gmail.com',
      name: 'John Doe',
    };
  }

  public navigateTo(
    route: ApplicationPath | { pathname: ApplicationPath; search?: string; hash?: string },
  ) {
    Router.go(route);
  }
}
