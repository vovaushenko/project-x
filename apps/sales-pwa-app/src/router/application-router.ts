import { Router } from '@vaadin/router';

export class ApplicatioRouter {
  static navigate(path: string) {
    Router.go(path);
  }
}
