export const getToken = async() => {

    // stored in the previous step
    const codeVerifier = localStorage.getItem('code_verifier');

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    const url = "https://accounts.spotify.com/api/token";

    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    }
  
    const body = await fetch(url, payload);
    const response = await body.json();
  
    localStorage.setItem('access_token', response.access_token);
    console.log(body);
    console.log(response);
  }
  