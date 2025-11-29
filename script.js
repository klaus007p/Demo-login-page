// ------------------------------
// PASSWORD STRENGTH METER
// ------------------------------
const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");

passwordInput.addEventListener("input", () => {
    const pwd = passwordInput.value;
    let strength = 0;

    if (pwd.length > 5) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;

    switch (strength) {
        case 0:
            strengthBar.style.width = "0%";
            strengthBar.style.background = "red";
            break;
        case 1:
            strengthBar.style.width = "25%";
            strengthBar.style.background = "red";
            break;
        case 2:
            strengthBar.style.width = "50%";
            strengthBar.style.background = "orange";
            break;
        case 3:
            strengthBar.style.width = "75%";
            strengthBar.style.background = "yellow";
            break;
        case 4:
            strengthBar.style.width = "100%";
            strengthBar.style.background = "lime";
            break;
    }
});


// ------------------------------
// SLIDER CAPTCHA
// ------------------------------
const thumb = document.getElementById("sliderThumb");
const captchaText = document.getElementById("captchaText");
const track = document.querySelector(".track");
const loginBtn = document.getElementById("loginBtn");

let isDragging = false;

thumb.addEventListener("mousedown", () => {
    isDragging = true;
    thumb.style.transition = "0s";
    track.style.transition = "0s";
});

document.addEventListener("mouseup", () => {
    if (isDragging) {
        resetSlider();
    }
    isDragging = false;
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const slider = document.querySelector(".slider-captcha");
    const rect = slider.getBoundingClientRect();
    let x = e.clientX - rect.left;

    if (x < 0) x = 0;
    if (x > rect.width - 52) x = rect.width - 52;

    thumb.style.left = x + "px";
    track.style.width = x + 52 + "px";

    // If slider is fully complete
    if (x >= rect.width - 60) {
        captchaSuccess();
    }
});

// Reset slider if not completed
function resetSlider() {
    thumb.style.left = "0px";
    track.style.width = "0px";
    thumb.style.transition = "0.3s";
    track.style.transition = "0.3s";
}

// When captcha is successful
function captchaSuccess() {
    isDragging = false;
    captchaText.innerText = "Verified ✔";
    captchaText.style.color = "lime";
    track.style.background = "rgba(0,255,0,0.4)";
    thumb.style.background = "lime";
    thumb.style.color = "#fff";

    loginBtn.disabled = false;

    // Prevent slider from resetting
    thumb.style.pointerEvents = "none";
}



// ------------------------------
// FORGOT PASSWORD MODAL
// ------------------------------
const modal = document.getElementById("modal");
const forgotBtn = document.getElementById("forgotBtn");
const closeModal = document.getElementById("closeModal");

forgotBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});


// ------------------------------
// LOGIN BUTTON ACTION
// ------------------------------
loginBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = passwordInput.value.trim();

    if (username === "" || password === "") {
        alert("Please enter username and password");
        return;
    }

    // Redirect to dashboard
    window.location.href = "dashboard.html";
});


// ------------------------------
// SEND RESET LINK
// ------------------------------
document.getElementById("sendReset").addEventListener("click", () => {
    const email = document.getElementById("resetEmail").value;

    if (!email.includes("@")) {
        alert("Please enter a valid email address");
        return;
    }

    alert("A password reset link has been sent!");
    modal.style.display = "none";
});
window.location.href = "dashboard.html";
