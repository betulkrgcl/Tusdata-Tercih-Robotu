const cancel = document.querySelector(".mobile-menu__cancel");
cancel.addEventListener('click', () => {
    document.querySelector('#mobile-menu').classList.toggle("mobile-menu-show");
})

const mobileMenu = document.querySelector("#hamburger-menu");
mobileMenu.addEventListener('click', () => {
    document.querySelector('#mobile-menu').classList.toggle("mobile-menu-show");
})