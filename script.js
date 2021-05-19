// Determines button clicked via id
const myFunction = (id) => {
    document.calc.result.value += id;
}
  
// Clears calculator input screen
const clearScreen = () => {
    document.calc.result.value="";
}
  
  // Calculates input values
const calculate = () => {
    try {
        let input = eval(document.calc.result.value);
        // console.log(input)
         return document.calc.result.value = input;
    } catch(err){
        document.calc.result.value = "Error";
    }
}