const copyButton = document.getElementById("copy");
const labelLength = document.getElementById("rangeValue");
const inputLength = document.getElementById("length");

// Copy Button
function copyPassword() {
    const password = document.getElementById("password");
    navigator.clipboard.writeText(password.textContent);
}

copyButton.addEventListener("click", copyPassword);

// functionality for input range
function updateLength(){
    return labelLength.textContent = inputLength.value;
}

inputLength.addEventListener("mousemove", updateLength);
inputLength.addEventListener("change", updateLength);
inputLength.addEventListener("touchmove", updateLength);

// functionality to change tracks
const leftTrack = document.querySelector(".leftTrack");
const rightTrack = document.querySelector(".rightTrack");

function updateSlider() {
    return leftTrack.style.width = `${inputLength.value * 5}%`;
}

inputLength.addEventListener("mousemove", updateSlider);
inputLength.addEventListener("change", updateSlider);
inputLength.addEventListener("touchmove", updateSlider);

// functionality to assess password strength
const inputs = document.querySelectorAll(".includeCheckbox");
const strengthText = document.getElementById("strengthText");
const lines = [line1, line2, line3, line4];

line1 = document.getElementById("line1");
line2 = document.getElementById("line2");
line3 = document.getElementById("line3");
line4 = document.getElementById("line4");

function changeStrength(){
    let count = 0;
    
    inputs.forEach(input => {
        if(input.checked == true){
            count++;
        }
    })

    if(count == 0 || inputLength.value == 0){
        strengthText.textContent = "";
        lines.forEach(line => {
            line.classList.remove("weak", "medium", "strong", "tooWeak")
        });
    } else if (count == 1 || inputLength.value < 4){
        strengthText.textContent = "too weak!";
        line1.classList.add("tooWeak");
        lines.forEach(line =>{
            line.classList.remove("weak", "medium", "strong")
        });
    } else if (count == 2 || inputLength.value < 6){
        strengthText.textContent = "weak";
        line1.classList.add("weak");
        line2.classList.add("weak");
        lines.forEach(line => {
            line.classList.remove("medium", "strong", "tooWeak")
        });
    } else if (count == 3 || inputLength.value < 10){
        strengthText.textContent = "medium";
        line1.classList.add("medium");
        line2.classList.add("medium");
        line3.classList.add("medium");
        lines.forEach(line => {
            line.classList.remove("weak", "strong", "tooWeak")
        });
    } else{
        strengthText.textContent = "strong";
        line1.classList.add("strong");
        line2.classList.add("strong");
        line3.classList.add("strong");
        line4.classList.add("strong");
        lines.forEach(line =>{
            line.classList.remove("weak", "medium", "tooWeak")
        });
    }
}

inputs.forEach(input => input.addEventListener("click", changeStrength));
inputLength.addEventListener("mousemove", changeStrength);
inputLength.addEventListener("change", changeStrength);

// Define constants to reference HTML elements
const generator = document.getElementById("generate_btn");
const password = document.getElementById("password");

// functionality to generate password
function generate(){

    // Define variables to store the user's selected preferences for password complexity
    const uppercase = document.getElementById("uppercase").checked;
    const lowercase = document.getElementById("lowercase").checked;
    const numbers = document.getElementById("numbers").checked;
    const symbols = document.getElementById("symbols").checked;

    // Define corresponding sets of characters to be used in the password generation process
    const uppercaseSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseSet = "abcdefghijklmnopqrstuvwxyz";
    const numbersSet = "0123456789";
    const symbolsSet = ".?!*+@#$€÷×~";

    // Check whether the user has entered a password length or selected any complexity options
    if(inputLength.value == 0 || (!uppercase && !lowercase && !numbers && !symbols)){
        // If not, display default password
        password.textContent = "P4$5W0rD!";
        password.style.color = "#817d92";
        return;
    }

    // If the user has selected at least one complexity option, generate the password
    // Create an empty array to store the desired character set
    let charSet = [];

    // Call the `generateCharSet` function to change the character set depending on the user's selected complexity options
    generateCharSet(uppercase, uppercaseSet, charSet);
    generateCharSet(lowercase, lowercaseSet, charSet);
    generateCharSet(numbers, numbersSet, charSet);
    generateCharSet(symbols, symbolsSet, charSet);

    // Generate the result by selecting random characters from the character set and concatenating them together
    let result = [];
    for(let i = inputLength.value; i > 0; i--){
        result.push(charSet[Math.floor(Math.random() * charSet.length)]);
    }

    // Check whether the generated password contains at least one character from each selected complexity option
    checkIfContains(uppercase, uppercaseSet, result);
    checkIfContains(lowercase, lowercaseSet, result);
    checkIfContains(numbers, numbersSet, result);
    checkIfContains(symbols, symbolsSet, result);

    // Display the generated password
    password.textContent = result.join("");
    password.style.color = "#E6E5EA";
}

// function to check if it contains what it should
function checkIfContains(what, whatSet, arr){
    if(what){
        let arrayIncludesThis = false;
        for(let char of arr){
            if(whatSet.includes(char)){
                arrayIncludesThis = true;
            }
        }
         // If the generated password does not contain at least one character from the selected complexity option, add one to the password
        if(lowercase && !arrayIncludesThis){
            arr[Math.floor(Math.random() * arr.length)] = whatSet[Math.floor(Math.random() * whatSet.length)];
        }
    }
}

//function to change charset depending on how many checkboxes are checked
function generateCharSet(IsChecked, wantedSet, desiredResult){
    if(IsChecked){
        for(let i of wantedSet){
            desiredResult.push(i);
        }
    }
}

// Add event listeners to the "Generate" button and Enter keypress
generator.addEventListener("click", generate);
window.addEventListener("keypress", (e) => {
    if(e.key == "Enter"){
        generate();
    }
})

