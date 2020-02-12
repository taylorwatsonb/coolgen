// button id
let colorBTN = document.getElementById('generateColorBtn')
    //zodiac div
let colorDIV = document.getElementById('zodiac-container')
let titlesArray = []
    // bdayform getelementbyid 
let bDayForm = document.getElementById("bday")
    // info div
const infoUser = document.getElementById("info")

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

 fetch("http://localhost:3000/reviews")
 .then(res => res.json())
 .then(resObj => {
     resObj.forEach(review => createReview(review))
 })



colorBTN.addEventListener("click", (event) => {
        event.preventDefault()
        document.body.style.backgroundColor = randomColor();
        // clears out the div, so we dont have multiple zodiac signs returned 
        colorDIV.innerText = ""
            // making a get request using fetch [fetch is a function]
            // gives a promise and then a response
        fetch("https://www.horoscopes-and-astrology.com/json")
            // turns it into a json object 
            .then(res => res.json())
            //access the json object
            .then(horoObj => {
                let titlesArray = horoObj.titles
                let titleList = titlesArray[Math.floor(Math.random() * titlesArray.length)]
                let titleH2 = document.createElement('h2')
                titleH2.innerText = titleList
                colorDIV.append(titleH2)
            })

    })
    // })
    //event listener for birthday form
bDayForm.addEventListener('submit', event => {
        // debugger
        //preventdefault prevents the page from reloading 
        //
        event.preventDefault()
            //event.target creates the whole form
        let userName = event.target.firstElementChild.value
        let birthMonth = event.target.children[1].value
        let birthDay = event.target.children[2].value
            // fetch to POST name / birthday
        fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    //sending a json object and second line only accepts json
                    "content-type": "application/json",
                    "accept": "application/json"

                },
                //turns json obj into string , things travel through the internet as strings
                body: JSON.stringify({
                    //the values of the input in the form
                    name: userName,
                    birthday: birthMonth
                })
            })
            //turning it into a json obj
            .then(r => r.json())

        .then((userObj) => {
            // create a elements , set the attribute
            infoUser.innerHTML = `<li>${userObj.name}</li>`
            console.log(userObj);
            //pass userObj into renderForm function
            renderForm(userObj)
        })
    })
    // callback functions to access the previous
    // show a form for a specific user
function renderForm(user) {
    let form = document.createElement('form')
        //assigning a form to innerhtml
    form.innerHTML = `
    <label>Leave a Review</label>
    <input type='text' id='review'>
    <input type='submit'>
    `

    infoUser.append(form)
        // adding an event listener to the form
    form.addEventListener('submit', (event) => {
        event.preventDefault()
            //making a POST request to the backend to add a review
        fetch("http://localhost:3000/reviews", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({
                    body: event.target.review.value,
                    user_id: user.id
                })
            })
            .then(r => r.json())
            .then(review => createReview(review))
    })
}
// end render form func here

function createReview(review) {
    console.log(review);
    // returns review object
    let reviewLi = document.createElement('li')
    reviewLi.innerText = `${review.user.name} says ${review.body}`

    let updateBtn = document.createElement('button')
    let deleteBtn = document.createElement('button')
    deleteBtn.innerText = "Delete Button"
        //classNames are to identify css elements 
    updateBtn.className = "update-button"
    updateBtn.innerText = "Update Review"
    reviewLi.append(updateBtn, deleteBtn)
    infoUser.append(reviewLi)

    

    //event listener for the updateBtn
    deleteBtn.addEventListener('click', (event) => {
       
        event.preventDefault()
        console.log(event)
        fetch(`http://localhost:3000/reviews/${review.id}`, {
                method: 'DELETE'

            })
            // do not need below
            .then(res => res.json())
            .then((emptyObj) => {
                // info user holds all of the buttons for update delete
                reviewLi.remove()

            })
    })


    updateBtn.addEventListener('click', (event) => {

       
        let updateForm = document.createElement('form')
        let bodyInput = document.createElement('input')
            // differentiates the inputs by name
        bodyInput.name = "body"
        let submitInput = document.createElement('input')
            // button for the submit 
        submitInput.type = "submit"

        // a form needs to have inputs


        updateForm.append(bodyInput, submitInput)


        infoUser.append(updateForm)

        let infodivLi = infoUser.querySelector('li')

        updateForm.addEventListener('submit', (event) => {
            event.preventDefault()
                // PATCH request - update the review
            fetch(`http://localhost:3000/reviews/${review.id}`, {
                    method: 'PATCH',
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({
                        body: event.target.body.value
                    })

                })
                // debugger
                .then(res => res.json())
                .then(infodivLi.innerHTML = event.target.body.value)

        })
    })
}