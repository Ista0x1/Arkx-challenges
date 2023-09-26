function isEvenOrOdd(num) {
    if (num % 2 === 0) {
        return "Even";
    } else {
        return "Odd";
    }
}

function main() {
    const number = parseInt(prompt("Enter a number: "), 10);

    if (isNaN(number)) {
        alert("Please enter a valid number.");
    } else {
        alert(`The number ${number} is ${isEvenOrOdd(number)}`);
    }
}

main();
// 2
function CHECK(number) {
    if(number > 0){
        if(number % 7 ===0 ){
            
        }
    }
}