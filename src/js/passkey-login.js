const { startAuthentication } = SimpleWebAuthnBrowser;

async function passkeyLogin() {
    const loginOptions = await fetch("/login/public-key/create-options", {
        method: "POST",
    });

    if (!loginOptions.ok) {
        throw new Error("Failed to get login options");
    }

    const options = await loginOptions.json();

    let authResp;
    try {
        authResp = await startAuthentication(options);
    }
    catch (e) {
        console.error(e);
        return;
    }

    const loginResponse = await fetch("/login/public-key", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify({ ...authResp, tp: navigator.maxTouchPoints > 0 })
    });

    if (!loginResponse.ok) {
        throw new Error("Failed to login");
    }

    const loginResult = await loginResponse.json();
    window.location.href = loginResult.next;
}
