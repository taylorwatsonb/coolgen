let colorBTN = document.getElementById('generateColorBtn')
let colorDIV = document.getElementById('zodiac-container')
let titlesArray = []
let bDayForm = document.getElementById("bday")

const hexvalues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

// function to create a hex code 
let randomColor = () => {
    let hex = "#";
    //iteratoring through each element to generate 6 digit hex code
    for (let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(hexvalues.length * Math.random());
        let randomValue = hexvalues[randomIndex];
        hex = hex + randomValue;
    }
    return hex;
}
let randomColorBtn = document.getElementById('generateColorBtn');
randomColorBtn.onclick = () => {
    document.body.style.backgroundColor = randomColor();

};

colorBTN.addEventListener("click", (event) => {
        colorDIV.innerText = ""
            // making a fetch request to local host & then making a request to json
        fetch("https://www.horoscopes-and-astrology.com/json")
            .then(res => res.json())
            .then(horoObj => {
                titlesArray = horoObj.titles
                    // titles = horoObj.titles
                    // horoObj.titles.forEach((title) => {
                    //     console.log(title)
                    //     let titleH2 = document.createElement('h2')
                    //     titleH2.innerText = title
                    //     colorDIV.append(titleH2)

                let titleList = titlesArray[Math.floor(Math.random() * titlesArray.length)]
                let titleH2 = document.createElement('h2')
                titleH2.innerText = titleList
                colorDIV.append(titleH2)
            })

    })
    // })