
// ================================
// Supabase 설정
// ================================
const SUPABASE_URL = "https://enmuxtbyxrwvuxequyww.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Kl8ix4ETTWsr3V0GEuRuRA_w89er502";

const sb = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

// ================================
// DOM 로딩 이후 실행
// ================================
document.addEventListener("DOMContentLoaded", () => {

    // ================================
    // 요소
    // ================================
    const email = document.getElementById("email");
    const nickname = document.getElementById("nickname");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    const result = document.getElementById("result");
    const signupBtn = document.getElementById("signupBtn");
    const discordLogin = document.getElementById("discordLogin");

    const togglePassword = document.getElementById("togglePassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

    // ================================
    // 안전 체크 함수
    // ================================
    const showError = (msg) => {
        result.innerHTML = `<div class="text-danger">${msg}</div>`;
    };

    const showSuccess = (msg) => {
        result.innerHTML = `<div class="text-success">${msg}</div>`;
    };

    // ================================
    // 비밀번호 토글
    // ================================
    if (togglePassword) {
        togglePassword.addEventListener("click", () => {

            const icon = togglePassword.querySelector("i");

            password.type = password.type === "password" ? "text" : "password";

            icon.className =
                password.type === "password"
                    ? "bi bi-eye"
                    : "bi bi-eye-slash";
        });
    }

    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener("click", () => {

            const icon = toggleConfirmPassword.querySelector("i");

            confirmPassword.type =
                confirmPassword.type === "password" ? "text" : "password";

            icon.className =
                confirmPassword.type === "password"
                    ? "bi bi-eye"
                    : "bi bi-eye-slash";
        });
    }

    // ================================
    // 회원가입
    // ================================
    async function signup() {

        result.innerHTML = "";

        // 기본 검증
        if (!email.value || !password.value || !nickname.value) {
            showError("모든 값을 입력해주세요.");
            return;
        }

        if (password.value !== confirmPassword.value) {
            showError("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (password.value.length < 6) {
            showError("비밀번호는 최소 6자 이상이어야 합니다.");
            return;
        }

        // Supabase 회원가입
        const { data, error } = await sb.auth.signUp({
            email: email.value,
            password: password.value
        });

        // 🔥 에러 출력 (핵심)
        if (error) {
            console.log("SIGNUP ERROR:", error);
            showError(error.message);
            return;
        }

        console.log("SIGNUP SUCCESS:", data);

        showSuccess("회원가입 성공! 이메일을 확인하세요 (설정에 따라 인증 필요)");

        // 자동 이동 (원하면 제거 가능)
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    }

    // ================================
    // 버튼 이벤트
    // ================================
    if (signupBtn) {
        signupBtn.addEventListener("click", signup);
    }

    // Enter 키 가입
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") signup();
    });

    // ================================
    // Discord 로그인
    // ================================
    if (discordLogin) {

        discordLogin.addEventListener("click", async () => {

            const { error } = await sb.auth.signInWithOAuth({
                provider: "discord",
                options: {
                    redirectTo: "https://game2gether.pages.dev"
                }
            });

            if (error) {
                console.log(error);
                showError("Discord 로그인 실패");
            }

        });

    }

});