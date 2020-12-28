import { inject, ref } from "vue";
import {
  FacebookLoginResponse,
  FacebookLoginPlugin,
} from "@capacitor-community/facebook-login";

export default () => {
  const state = ref<any>({
    accessToken: null,
  });
  const FBLoginPlugin = inject("FACEBOOK_LOGIN_PLUGIN") as FacebookLoginPlugin;

  const facebookLogin = async () => {
    const response = await FBLoginPlugin.getCurrentAccessToken();
    console.log("isFacebookLoggedIn response " + response);
    state.value.accessToken = response?.accessToken;
    if (response) return state.value.accessToken;

    const FACEBOOK_PERMISSIONS = [
      "email",
      "user_birthday",
      "user_photos",
      "user_gender",
    ];

    const result = (await FBLoginPlugin.login({
      permissions: FACEBOOK_PERMISSIONS,
    })) as FacebookLoginResponse;

    if (result.accessToken) {
      // Login successful.
      console.log(`Facebook access token is ${result.accessToken.token}`);
      state.value.accessToken = result.accessToken;
      return result.accessToken;
    } else {
      // Cancelled by user.
      return null;
    }
  };

  const facebookLogout = async () => {
    await FBLoginPlugin.logout();
    state.value = {
      accessToken: null,
    };
    return true;
  };

  const isFacebookLoggedIn = async () => {
    console.log("started isFacebookLoggedIn");
    const response = await FBLoginPlugin.getCurrentAccessToken();
    console.log("isFacebookLoggedIn response " + response);
    state.value.accessToken = response?.accessToken;
    return response?.accessToken ? true : false;
  };

  return {
    state,
    facebookLogin,
    facebookLogout,
    isFacebookLoggedIn,
  };
};
