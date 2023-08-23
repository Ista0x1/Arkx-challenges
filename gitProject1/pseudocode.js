//Exercise 1
function sum(num1,num2) {
   let sum = num1 + num2; 
    return sum;
}

// Exercise 2
// first we will create a function that takes the 3 numbers and return average
function average(num1 , num2, num3) {
    // then we calculate the average of 3 numbers and store it in variable average
    let average = (num1 +num2 +num3)/3;
    //and here we return the average
    return average;   
}
//exercise 3
// first we create the function that will take the number
function evenOrodd(number) {
    //here we use the if statement to check if number is even 
    if (number % 2 ===0) { 
        return 'number is even';
    }
    else {
        return "number is odd";
    }
} 
//Exercise 4
function max(num1, num2 , num3) {
    if (num1 > num2 & num1 > num3) {
        return num1 +'is maximum';
    }
    else if (num2 > num1 & num2 > num3)
    {
        return num2+'is maximum';
    }
    else {
        return num3+'maximum';
    }
}
// Exercise 5
function factorial(number) {
    for (let i = number-1; i >0; i--) {
         number =number * i; 
   }
 console.log(number);
}
factorial(5);

//exercise 6
function vote(age) {
    if( age >=18) {
        alert('you are eligible');
    }
    else {
        alert("You aren't eligible");
    }
}
// exercise 7
function counter(sentence) {
    let list1 = sentence.split(' ');
    const length=list1.length ; 
    return length;
}
// exercise 8
function calculatesum(numbers) {
    let sum =0;
    numbers.forEach(number => {
        if(number >0){
            sum += number;
        }
        
    });
    return sum;
}
// exercise 9
function sort(numbers) {
    let smallestNum = numbers[0];
    let smallestPos = 1;
    
    // Use another loop to find the smallest number and its position
    for (let i = 1; i < 7; i++) {
        if (numbers[i] < smallestNum) {
            smallestNum = numbers[i];
            smallestPos = i + 1; // we add 1 because array indices start at 0 but we count positions from 1
        }
        console.log(smallestNum, smallestPos);
    }
}
// Exercise 10
function occurrences(numbers , N) {
    var occurencesOfN = 0 ;
    for (var j in numbers ) {
        if ((numbers [j]) == N ){
            occurencesOfN +=1;

        }}
        console.log(occurencesOfN);
}
// Exercise 11
function splitearr(T) {
    var T1 =[];
    var T2 = [];
    for (let i = 0; i < T.length; i++) {
        if (T[i]% 2 ===0) {
            T1.push(T[i])
        } else {
            T2.push(T[i])
        }
    }
    console.log(T1);
    console.log(T2)
}
//Exercise 12
function multiple(n = 8) {
    var list = [];
    for (let i = 0; i <= 10; i++) {
        list.push(8*i);
        
    }
    console.log(list);
}
//Exercise 13
// Read the total price excluding tax
let priceExcludingTax = 300;

// Initialize the discounted price as the price excluding tax
let discountedPrice = priceExcludingTax;

// Apply the discount if the price excluding tax is more than 200 DH
if (priceExcludingTax > 200) {
  discountedPrice = priceExcludingTax * 0.85;  // 85% of the price, i.e., price after a 15% reduction
}

// Calculate the VAT
let vat = discountedPrice * 0.20;  // 20% of the discounted price

// Calculate the total amount including tax
let totalAmount = discountedPrice + vat;

// Print the total amount including tax
console.log("The total amount including tax is: ", totalAmount);

//Exercise 14
function product(M, N) {
    if(M<0 || N<0 ){
        return "Negative";
    }
    if (M>0 && N >0){
        return "Positive";
    }
    else {
        return "null";
    }
}