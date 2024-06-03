import { runEngine } from "../../../framework/src/RunEngine";
import { LoginManager, AccessToken } from "react-native-fbsdk";

export class FacebookDelegate {
  facebookUserStatusChanged(userInfo: any, isRegistration: boolean): void {}
}

// Customizable Area Start
// Customizable Area End

class FacebookController {
  facebookUserInfo: any;
  delegateClass: FacebookDelegate;
  static instance = new FacebookController();
  
  // Customizable Area Start
  // Customizable Area End

  constructor() {
    this.delegateClass = new FacebookDelegate();
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // MOBILE
  handleFacebookLogin(delegateClass: any, isRegistration: boolean) {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    FacebookController.instance.delegateClass = delegateClass;

    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function(permissionsResult) {
        if (permissionsResult.isCancelled) {
          runEngine.debugLog("Login cancelled");
        } else {
          runEngine.debugLog("Login DONE");
          AccessToken.getCurrentAccessToken()
            .then((tokenResult: any) => {
              runEngine.debugLog(tokenResult);

              const { accessToken } = tokenResult;

              fetch(
                "https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=" +
                  accessToken
              )
                .then(response => response.json())
                .then(json => {
                  var userEmail = json.email;
                  var userId = json.id;

                  if (userEmail && userId) {
                    FacebookController.instance.facebookUserInfo = {
                      email: userEmail,
                      id: userId
                    };
                    FacebookController.instance.delegateClass.facebookUserStatusChanged(
                      FacebookController.instance.facebookUserInfo,
                      isRegistration
                    );
                  }
                })
                .catch(() => {
                  runEngine.debugLog("ERROR GETTING DATA FROM FACEBOOK");
                });
            })
            .catch(() => {
              runEngine.debugLog("ERROR GETTING DATA FROM FACEBOOK");
            });
        }
      },
      function(error) {
        runEngine.debugLog("Login fail with error: " + error);
      }
    );
  }
}
// Customizable Area End

const facebookController = new FacebookController();
export default facebookController;
