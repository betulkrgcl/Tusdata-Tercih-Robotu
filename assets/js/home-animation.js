document.addEventListener("DOMContentLoaded", () => {
    const robot = document.querySelector('.home__robot');
    setTimeout(() => {
        robot.classList.add('home__robot--animate');
        const items = document.querySelectorAll('.home__options');
        items.forEach(data => {
            data.classList.add('home__options--show');
        });

    }, 500);

});