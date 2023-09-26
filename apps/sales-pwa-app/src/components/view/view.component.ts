import { LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import {
  BeforeEnterObserver,
  PreventAndRedirectCommands,
  Router,
  RouterLocation,
} from '@vaadin/router';
import { ApplicationPath, ApplicationRoute } from '../../router/router.routes';
import { RouterUtils } from '../../router/router.utils';
import { IUser } from '@project-x/model';
import { Maybe } from '../../shared/types';

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
  @state() user: Maybe<IUser> = null;

  connectedCallback(): void {
    super.connectedCallback();
    console.log({ user: this.user });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  getInitialUser(): IUser {
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
