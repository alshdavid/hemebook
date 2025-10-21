import { Component, Inject } from "@angular/core";
import { AUTH_CLIENT_TOKEN, AuthClient } from "../../services/auth";

@Component({
  selector: "pbk-view-auth",
  template: /*html*/ `
    <p id="status">Status: <span>{{ status }}</span></p>
    <button (click)="login()">Login</button>
    <button (click)="logout()">Logout</button>
    <button (click)="refresh()">Refresh</button>
    <button (click)="validate()">Protected API</button>
    <code></code>
  `,
})
export class ViewAuthComponent {
  #authClient = new AuthClient();
  status: string = "checking auth...";

  constructor(
    @Inject(AUTH_CLIENT_TOKEN) authClient: AuthClient
  ) {
    this.#authClient = authClient
    if (!this.#authClient.getStatus()) {
      this.status = 'logged out'
    } else {
      const details = this.#authClient.getDetails();
      if (!details) {
        this.status = 'logged out'
        return;
      }
      this.status = "logged in as " + details.email;
    }
  }

  ngOnInit() {
    this.#authClient.onAuthAction(async (status, state) => {
      console.warn(status, state);
      if (!this.#authClient.getStatus()) {
        return;
      }

      const details = this.#authClient.getDetails();
      if (!details) {
        this.status = 'logged out'
        return;
      }
      this.status = "logged in as " + details.email;
    });
  }

  login() {
    this.#authClient.navigateToLogin({ hello: "world" });
  }

  logout() {
    this.#authClient.navigateToLogout();
  }

  refresh() {
    this.#authClient.refreshAuth();
  }

  async validate() {
    const resp = await this.#authClient.validate();
    console.log(resp);
  }
}
