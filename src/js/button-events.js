if (window.PublicKeyCredential === undefined) {
    $("#passkey-button").addClass("opacity-60 dark:opacity-30 cursor-default pointer-events-none").removeClass("cursor-pointer");
}

$("#passkey-button").on("click", async e => {
    await passkeyLogin();
});

$("#discord-login-button").on("click", async e => {
    window.location.href = `https://auth.cominatyou.com/login/discord?tp=${navigator.maxTouchPoints > 0}`;
});
