document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelector('.login__robot__character').classList.add('login__robot__character--show', 'login__robot__character--animation')
    }, 500);
});



/*---------------------password----------------------*/

function togglePassword() {
    var element = document.getElementById("password");
    element.type = element.type == "password" ? "text" : "password";
}


function passwordToggle(element, icon) {
    icon.addEventListener('click', () => {
        element.type = element.type == "password" ? "text" : "password"
        icon.className = icon.className == "icofont-eye-alt password-eye" ? "icofont-eye-open password-eye" : "icofont-eye-alt password-eye"

    });

}


passwordToggle(document.querySelector(".password1"), document.querySelector("#eye1"));
passwordToggle(document.querySelector(".password2"), document.querySelector("#eye2"));
