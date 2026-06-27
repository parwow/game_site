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
const password = document.getElementById("password");
const result = document.getElementById("result");

// ================================
// 비밀번호 보기 / 숨기기
// ================================
document.getElementById("togglePassword").addEventListener("click", () => {

    const icon = document.querySelector("#togglePassword i");

    if (password.type === "password") {

        password.type = "text";
        icon.className = "bi bi-eye-slash";

    } else {

        password.type = "password";
        icon.className = "bi bi-eye";

    }

});

// ================================
// 로그인
// ================================
async function login() {

    result.innerHTML = "";

    if (email.value.trim() === "") {

        result.innerHTML =
            `<div class="text-danger">
                이메일을 입력해주세요.
            </div>`;

        email.focus();
        return;

    }

    if (password.value === "") {

        result.innerHTML =
            `<div class="text-danger">
                비밀번호를 입력해주세요.
            </div>`;

        password.focus();
        return;

    }

    const { data, error } = await supabase.auth.signInWithPassword({

        email: email.value,
        password: password.value

    });

    if (error) {

        result.innerHTML =
            `<div class="text-danger">
                이메일 또는 비밀번호가 올바르지 않습니다.
            </div>`;

        return;

    }

    result.innerHTML =
        `<div class="text-success">
            로그인 성공!
        </div>`;

    // 1초 후 메인 페이지 이동
    setTimeout(() => {

        window.location.href = "index.html";

    }, 1000);

}

// ================================
// 로그인 버튼
// ================================
document.getElementById("loginBtn")
.addEventListener("click", login);

// ================================
// Enter 키 로그인
// ================================
document.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        login();

    }

});

// ================================
// Discord 로그인
// ================================
document.getElementById("discordLogin")
.addEventListener("click", async () => {

    const { error } = await supabase.auth.signInWithOAuth({

        provider: "discord",

        options: {

            redirectTo: "https://game2gether.pages.dev"

        }

    });

    if (error) {

        result.innerHTML =
            `<div class="text-danger">
                Discord 로그인에 실패했습니다.
            </div>`;

    }

});

// ================================
// 이미 로그인된 경우 자동 이동
// ================================
(async () => {

    const { data } = await supabase.auth.getSession();

    if (data.session) {

        window.location.href = "index.html";

    }

})();