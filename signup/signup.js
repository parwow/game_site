// ================================
// Supabase 설정
// ================================
const SUPABASE_URL = "https://enmuxtbyxrwvuxequyww.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Kl8ix4ETTWsr3V0GEuRuRA_w89er502";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

// ================================
// 요소
// ================================
const email = document.getElementById("email");
const nickname = document.getElementById("nickname");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const emailError = document.getElementById("emailError");
const nicknameError = document.getElementById("nicknameError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");

const result = document.getElementById("result");

// ================================
// 이메일 검사
// ================================
function validEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

email.addEventListener("input", () => {

    if (email.value === "") {
        emailError.textContent = "";
        return;
    }

    if (!validEmail(email.value)) {
        emailError.textContent = "올바른 이메일 형식이 아닙니다.";
    } else {
        emailError.textContent = "";
    }

});

// ================================
// 닉네임 검사
// ================================
nickname.addEventListener("input", () => {

    if (nickname.value.length < 2) {
        nicknameError.textContent = "닉네임은 2자 이상 입력해주세요.";
    } else {
        nicknameError.textContent = "";
    }

});

// ================================
// 비밀번호 검사
// ================================
password.addEventListener("input", () => {

    if (password.value.length < 8) {
        passwordError.textContent = "비밀번호는 8자 이상이어야 합니다.";
    } else {
        passwordError.textContent = "";
    }

});

// ================================
// 비밀번호 확인
// ================================
confirmPassword.addEventListener("input", () => {

    if (password.value !== confirmPassword.value) {
        confirmError.textContent = "비밀번호가 일치하지 않습니다.";
    } else {
        confirmError.textContent = "";
    }

});

// ================================
// 보기 / 숨기기
// ================================
function toggle(id, buttonId) {

    const input = document.getElementById(id);
    const icon = document.querySelector(`#${buttonId} i`);

    if (input.type === "password") {

        input.type = "text";
        icon.className = "bi bi-eye-slash";

    } else {

        input.type = "password";
        icon.className = "bi bi-eye";

    }

}

document.getElementById("togglePassword")
.addEventListener("click", () => {
    toggle("password", "togglePassword");
});

document.getElementById("toggleConfirmPassword")
.addEventListener("click", () => {
    toggle("confirmPassword", "toggleConfirmPassword");
});

// ================================
// 회원가입
// ================================
async function signup() {

    result.innerHTML = "";

    if (!validEmail(email.value)) {
        email.focus();
        return;
    }

    if (nickname.value.length < 2) {
        nickname.focus();
        return;
    }

    if (password.value.length < 8) {
        password.focus();
        return;
    }

    if (password.value !== confirmPassword.value) {
        confirmPassword.focus();
        return;
    }

    const { data, error } = await supabase.auth.signUp({

        email: email.value,
        password: password.value,

        options: {

            data: {
                nickname: nickname.value
            }

        }

    });

    if (error) {

        if (
            error.message.includes("already") ||
            error.message.includes("registered")
        ) {

            result.innerHTML =
                `<div class="text-danger">
                이미 가입된 이메일입니다.
                </div>`;

        } else {

            result.innerHTML =
                `<div class="text-danger">
                ${error.message}
                </div>`;

        }

        return;
    }

    result.innerHTML =
        `<div class="text-success">
        ✅ 회원가입이 완료되었습니다.<br>
        이메일을 확인하여 인증을 완료해주세요.
        </div>`;

}

// ================================
// 버튼
// ================================
document
.getElementById("signupBtn")
.addEventListener("click", signup);

// ================================
// Enter
// ================================
document.addEventListener("keydown", function(e){

    if(e.key==="Enter"){
        signup();
    }

});

// ================================
// Discord 로그인
// ================================
document
.getElementById("discordLogin")
.addEventListener("click", async () => {

    await supabase.auth.signInWithOAuth({

        provider: "discord",

        options: {

            redirectTo: "https://game2gether.pages.dev"

        }

    });

});