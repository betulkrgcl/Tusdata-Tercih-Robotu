const text = document.querySelectorAll('.robo-text-animate');
const textArray= [''];
text.forEach(item=>{
    textArray.push(item.textContent);
})
console.log(textArray);
const typed = new Typed(".text-animation", {
    strings: textArray,
    typeSpeed: 50,
    loop: false
});


document.querySelector('.close-robo-text').addEventListener('click', ()=>{
    document.querySelector('.layout__content__side__advert__robot__text').style.display='none';
})