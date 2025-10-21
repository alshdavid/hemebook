import { Component } from "@angular/core";
import { AuthClient } from "../../services/auth";

@Component({
  selector: "pbk-view-home",
  template: /*html*/ ``,
  styleUrl: "./home.component.css",
})
export class ViewHomeComponent {
  #auth_client = new AuthClient();
  status: string = "checking auth...";

  ngOnInit() {
    this.#auth_client.onAuthAction(async (status, state) => {
      console.warn(status, state);
      if (!this.#auth_client.getStatus()) {
        return;
      }

      const details = this.#auth_client.getDetails();
      if (!details) {
        this.status = 'logged out'
        return;
      }
      this.status = "logged in as " + details.email;
    });
  }

  login() {
    this.#auth_client.navigateToLogin({ hello: "world" });
  }

  logout() {
    this.#auth_client.navigateToLogout();
  }

  refresh() {
    this.#auth_client.refreshAuth();
  }

  async validate() {
    const resp = await this.#auth_client.validate();
    console.log(resp);
  }
}
