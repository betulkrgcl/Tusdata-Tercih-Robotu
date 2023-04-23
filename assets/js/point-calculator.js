let totalMainQuestion = 40;
let totalClinicQuestion = 80;

const mainCorrectInput = document.querySelector('#txtMainCorrect');
const mainFalseInput = document.querySelector('#txtMainFalse');
const clinicCorrectInput = document.querySelector('#txtClinicCorrect');
const clinicFalseInput = document.querySelector('#txtClinicFalse');

function getPoint() {

    let mainCorrect = mainCorrectInput.value;
    console.log(mainCorrect);
    let mainFalse = mainFalseInput.value;
    let clinicCorrect = clinicCorrectInput.value;
    let clinicFalse = clinicFalseInput.value;


    let totalMainNet = parseInt(mainCorrect) - (parseInt(mainFalse) / 4);
    let totalClinicNet = parseInt(clinicCorrect) - (parseInt(clinicFalse) / 4);

    const mNet = document.querySelector('#mNet');
    const cNet = document.querySelector('#cNet');


    mNet.textContent = totalMainNet;
    cNet.textContent = totalClinicNet;

    calculatePoint(totalMainNet, totalClinicNet)

    // calculatePoint(mainCorrectInput.value, mainFalseInput.value, clinicCorrectInput.value, clinicFalseInput.value);
}

function calculatePoint(tMainNet, tClinicNet) {
    const tScore = document.querySelector('#tScore');
    const totalPoint = tMainNet * 0.15 + tClinicNet * 0.85;
    tScore.textContent = totalPoint.toFixed(3);
    document.querySelector('#showDetails').style.display = 'flex';
}

inputControl(mainCorrectInput, totalMainQuestion, mainFalseInput);
inputControl(clinicCorrectInput, totalClinicQuestion, clinicFalseInput);

function inputControl(input, totalQuestion, falseInput) {
    input.addEventListener('input', (e) => {
        let total = totalQuestion - Number(falseInput.value);

        if (Number(e.target.value) > totalQuestion) {
            e.target.value = totalQuestion;

        }
        if (Number(e.target.value) > total) {
            e.target.value = total;
        }
    });

    falseInput.addEventListener('input', (e) => {
        let total = totalQuestion - Number(input.value);
        if (Number(e.target.value) > total) {
            e.target.value = total;
        }
    });
}


