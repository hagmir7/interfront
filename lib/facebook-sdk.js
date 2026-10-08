export const loadFacebookSDK = () => {
    return new Promise((resolve) => {
        // Already loaded
        if (window.FB) {
            resolve(window.FB);
            return;
        }

        window.fbAsyncInit = () => {
            window.FB.init({
                appId   : process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '1510069987370843',
                cookie  : true,
                xfbml   : true,
                version : 'v21.0',
            });
            resolve(window.FB);
        };

        // Inject the SDK script
        const script    = document.createElement('script');
        script.src      = 'https://connect.facebook.net/en_US/sdk.js';
        script.async    = true;
        script.defer    = true;
        document.body.appendChild(script);
    });
};

export const getFacebookAccessToken = () => {
    return new Promise((resolve, reject) => {
        window.FB.login(
            (response) => {
                if (response.authResponse?.accessToken) {
                    resolve(response.authResponse.accessToken);
                } else {
                    reject(new Error('Facebook login was cancelled or denied.'));
                }
            },
            { scope: 'email,public_profile' },
        );
    });
};