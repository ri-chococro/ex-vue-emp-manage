<template>
  <div class="loginAdmin">
    <div class="row login-page">
      <div class="col s12 z-depth-6 card-panel">
        <div class="error">{{ this.errorMessage }}}</div>
        <form class="login-form">
          <div class="row"></div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">mail_outline</i>
              <input
                class="validate"
                id="mailAddress"
                type="email"
                v-model="mailAddress"
              />
              <label for="mailAddress" data-error="wrong" data-success="right"
                >メールアドレス</label
              >
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">lock_outline</i>
              <input id="password" type="password" v-model="password" />
              <label for="password">パスワード</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <button
                class="btn btn-register waves-effect waves-light col s12"
                v-on:click="loginAdmin"
                type="button"
              >
                ログイン
              </button>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6 m6 l6">
              <p class="margin medium-small">
                <router-link to="/registerAdmin"
                  >管理者登録はこちら</router-link
                >
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class LoginAdmin extends Vue {
  //ログイン時のエラーメッセージ
  private errorMessage = "";
  //メールアドレス
  private mailAddress = "";
  //パスワード
  private password = "";

  async loginAdmin(): Promise<void> {
    const response = await axios.post(
      "http://54.202.162.233:8080/ex-emp-api/login",
      {
        mailAddress: this.mailAddress,
        password: this.password,
      }
    );
    console.log("response:" + JSON.stringify(response));
    if (response.data.status === "success") {
      this["$router"].push("/employeeList");
    } else if (response.data.status === "error") {
      this.errorMessage =
        "ログインに失敗しました(" + response.data.message + ")";
    }
  }
}
</script>

<style scoped>
.login-page {
  width: 600px;
}
</style>
