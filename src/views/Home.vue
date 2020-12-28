<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-button
        :disabled="state.accessToken !== null"
        @click="doFacebookLogin"
        >FACEBOOK LOGIN</ion-button
      >
      <ion-button
        :disabled="state.accessToken === null"
        @click="doFacebookLogout"
        >FACEBOOK LOGOUT</ion-button
      >
      <div>
        <pre>{{ state }}</pre>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton
} from "@ionic/vue";
import { defineComponent, ref, onMounted } from "vue";
import facebookLoginService from "../facebook-login";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton
  },
  setup() {
    const {
      facebookLogin,
      facebookLogout,
      state
    } = facebookLoginService();

    const doFacebookLogin = async () => {
      try {
        const response = await facebookLogin();
        console.log(response);
        return true;
      } catch (e) {
        alert("Error " + e.message);
      }
    };

    const doFacebookLogout = async () => {
      try {
        const response = await facebookLogout();
        console.log(response);
        return true;
      } catch (e) {
        alert("Error " + e.message);
      }
    };


    return {
      doFacebookLogin,
      doFacebookLogout,
      state
    };
  }
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>