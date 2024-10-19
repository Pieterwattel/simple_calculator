//#region   > Variable Declarations
//#region       >> Global Variables

let operator = ""
let ans = ""

let userInput = ""

let currentElement = ""
let inputArray = []

let currentNum = ""

let isError = false
let errorCheckIteration = 0

let bracketOpenIndexArray = []

let caretPosition = 0

//#endregion
//#region       >> Node declaration / generation
//#region           >>> Containers
const contentBase = document.getElementById(`contentBase`)
    const calculatorFrame = document.getElementById(`calculatorFrame`)

        const displayFrame = document.getElementById(`displayFrame`)
            const displayTop = document.getElementById(`displayTop`)
            const displayBottom = document.getElementById(`displayBottom`)

        const btnsFrameMain = document.getElementById(`btnsFrameMain`)
            const staticBtnFrame = document.getElementById(`staticBtnFrame`)
                const btnFrameFunc = document.getElementById(`btnFrameFunc`)
                const btnFrameNum = document.getElementById(`btnFrameNum`)

            const btnFrameOperator = document.getElementById(`btnFrameOperator`)


//#endregion	
//#region           >>> Numbers
const numBtns = {}
for (let i = 9; i >= 0; i--){
    numBtns[i] = document.getElementById(`btn${i}`);
}
//#endregion
//#region           >>> Calculation Symbols

let symbolObject = [
    {
    id: 'btnAdd' ,
    sign: ['+', '➕', '˖'] ,  
    precedence: 5 , 
    category: "operator"
    },
    {
    id: 'btnSubtract' ,
    sign: ['-','−', '˗', '-', '−', '➖', '﹣', '－'],   
    precedence: 5 , 
    category : "operator"
    } ,
    {
    id: 'btnMultiply' ,
    sign: ['*','×', '⋅', '∗'],   
    precedence: 4 , 
    category: "operator"
    } ,
    {
    id: 'btnDivide' ,
    sign: ['/', '÷', '➗'],   
    precedence: 4 ,
    category: 'operator'
    } ,
    {
    id: 'bracketOpen' ,
    sign: ['(', '﹙', '（'],   
    precedence:  2,
    category: 'bracket'
    } ,
    {
    id: 'bracketClose' ,
    sign: [')', '﹚', '）'],   
    precedence:  2,
    category: 'bracket'
    } ,
    {
    id: 'pi' ,
    sign: ['π', 'Π', 'Π', 'Π', 'π', 'π', 'π', 'ϖ', 'ϖ', 'ϖ'],   
    precedence: 1,
    category: 'value'
    } ,
    {
    id: '2ndPower' ,
    sign: ['²'],   
    precedence: 3,
    category: 'operator'
    } ,
    {
    id: 'toThePower' ,
    sign: ['^', '**'],   
    precedence: 3,
    category: 'operator'
    } ,
]

symbolObject.forEach ((prop) => {
    let btn = document.createElement("button")
    btnFrameOperator.appendChild(btn)
    btn.setAttribute("id" , prop.id)
    btn.classList.add("btn")
    btn.textContent = prop.sign[0]
})


// empty symbol, for later additions
/*
    {
    id: '' ,
    sign: [''],   
    precedence:  ,
    category: ''
    } ,

//to add an operator:
- add the operator to the operatorObject + different ways that it can be written
- write a way to check for this operator in the checkSymbol() : put it before any other signs that are smaller and might actually get confused with this sign.
- make a way to write this in makeSymbolString
- add the calculation in the doCalculation function
- think about possible errors, and add these in checkForErrors()
*/


//#endregion
//#region           >>> Function Buttons

let otherBtns = [
    {
    id: 'btnEquals' ,
    sign: '=' ,  
    function: runEquals(), 
    },
    {
    id: 'btnans' ,
    sign: 'ans',  
    function: runAns(), 
    } ,
    {
    id: 'btnClear' ,
    sign: 'C',   
    function: clearDisplay(),
    } ,
    {
    id: 'btnClearEntry' ,
    sign: 'CE',   
    function: clearEntry(),
    } ,
    {
    id: 'btnBackSpace' ,
    sign: '⌫',   
    function: doBackspace(),
    } ,
    {
    id: 'btnDelete' ,
    sign: 'Del',   
    function: doDelete(),
    } ,
]

otherBtns.forEach ((prop) => {
    let btn = document.createElement("button")
    btnFrameFunc.appendChild(btn)
    btn.setAttribute("id" , prop.id)
    btn.classList.add("btn")
    btn.textContent = prop.sign
})


//#endregion
//#endregion
//#region   > Functions 
//#region       >> Utility Functions

function logId (e){
    console.log(`hi! is seems that the ${e.target.id} item was clicked`)
}

function getId (e){
    return e.target.id
}

function logNum (e){
    console.log(`hi! is seems that the ${e.target.id.replace('btn', "")} item was clicked`)
}


function makeNumber(value){
    return parseFloat(value)    
}

function alertSimplifiedArray(array){
    let result = []
    array.forEach(element => {
        if (typeof element == "object"){
            result.push(element.sign[0])
        } else {
            result.push(element)
        }
    });
    alert ("simplified array is: " + result)
}

function getFunction(e){
    switch (e.target.textContent){
        case "=": 
        runEquals()
        break;

        case "ans": 
        runAns()
        break;

        case "C": 
        clearDisplay()
        break;

        case "CE": 
        clearEntry()
        break;

        case "⌫":
        doBackspace()
        break;

        case "Del":
        doDelete()
        break;

        default: 
        alert ("Unknown function button pressed")
    }
}

function runEquals (){
    ans = ""
    isError=false
    inputArray = []
    array = makeStringArray(displayTop.value)
    alert(inputArray)
    // if there are no errors, run the rest of the function
    if (!checkForErrors(array)){
        result = calculate(array)
        ans = result.flat()
        displayAns()
        inputArray = []
        currentElement = ""
        clearEntry()
    }
}

function runAns (){
    displayTop.value += ans
    inputArray = displayTop.value
}

function clearDisplay(){
    userInput = ""
    ans = ""
    updateDisplay()
}

function clearEntry(){
    userInput = ""
    updateDisplay()
}

function doBackspace(){
    userInput = userInput.slice(0,caretPosition-1) + userInput.slice(caretPosition)
    updateDisplay()
    displayTop.setSelectionRange(caretPosition-1, caretPosition-1)
}

function doDelete(){
    userInput = userInput.slice(0,caretPosition) + userInput.slice(caretPosition+1)
    updateDisplay()
    returnCaret("")
}

function makeSymbolString (symbol){
    switch (symbol){
        case (symbolObject[0].sign[0]):
//          addition
            return " " + symbol + " "
            break;

        case (symbolObject[1].sign[0]):
//          subtraction
            return " " + symbol + " "
            break;

        case (symbolObject[2].sign[0]):
//          multiplication
            return " " + symbol + " "
            break;

        case (symbolObject[3].sign[0]):
//          division
            return " " + symbol + " "
            break;

        case (symbolObject[4].sign[0]):
//          bracketOpen
            return symbol
            break;

        case (symbolObject[5].sign[0]):
//          bracketClose
            return symbol
            break;

        default:
            console.log("operator: " + symbol + ", not added yet in operatorString()")
            return symbol
    }
    clearEntry()
}

function displayEntry(){
    displayTop.value = userInput
}

function displayAns(){
    displayBottom.textContent = ans
}

function evaluateStringSymbols (string){
    
// 3 values that can be given, to evaluate the context of a symbol
    let previousValue =- ""
    let value = ""
    let nextValue = ""
    let i = string.length
    let j = 0
    while (j < i){
        previousValue = string.charAt(j-1)
        value = string.charAt(j)
        nextValue = string.charAt(j+1)
        makeInputArray(previousValue, value, nextValue, string, j)
        j++
    }

    // small script to also add the very last value to inputArray[]
    if (numberOrSymbol(previousValue, value, nextValue, string, j) == "number" ){
        inputArray.push(currentElement)
    } else if (numberOrSymbol(previousValue, value, nextValue, string, j) == "operator" ){
        inputArray.push(string.charAt(j-1))

    }
    return inputArray
}

function numberOrSymbol (previousValue, value, nextValue, string, index) {
    let returnValue = ""

    // check if value is number, returns string "number"
    if (Number(parseFloat(value)) || value == "." || value == "0"){
//        console.log(`value "${value}" is a number`)
       returnValue = "number"
    }

    // check if value is operator, returns array [operator,  arrayIndex()
    symbolObject.forEach(element => {
        if (element.sign.includes(value)){
            returnValue = checkSymbol(previousValue, value, nextValue, string, index)
        }
    })

    //value was not a number nor known operator
    if  (returnValue == "error"){
        console.log("numberOrOperator error")
        alert ("ERROR: unknown symbol")
        isError = true
        returnValue = "error"
    }

    return returnValue
}

function makeInputArray(previousValue, value, nextValue, string, index){
    result = numberOrSymbol(previousValue, value, nextValue)
    alert (string)
    alert(index)
// check of the value if it is a number.
    if (result == "number"){
//        console.log("value is" + value)
//        console.log("currentElement is" + currentElement)        
        currentElement += value

// then check if it is an operator, using the previous and next value to evaluate that
    } else if (typeof result == "object"){
        if (currentElement != ""){
            inputArray.push(currentElement)
        }
        inputArray.push(result)
        currentElement = ""
    } else if (result == "skip"){
        
    } else if (result == "error"||typeof result == "undefined"|| result == ""){
        alert (`${value} ... is invalid. It might not be possible to use this symbol yet..
             I am vewwy sowwy (◞‸ ◟)💧`)
            isError = true

    } else {
        console.log(`value :${value} falls outside makeInputArray() if statement options`)

    }
}

function checkSymbol (previousValue, value, nextValue, array){
// the checks are order by length of the symbols, so:
//cos() is checked before (), because otherwise it might label the symbol wrongly

    switch (true){

//-- 2 VALUE LENGTH SYMBOLS --
case (symbolObject[8].sign.includes(value)):
    //          any exponent
                console.log("any exponent")
                return symbolObject[8]
                break;            
    

//-- 1 VALUE-LENGTH SYMBOLS --
        case (symbolObject[0].sign.includes(value)):
//          addition
            return symbolObject[0]
            break;

        case (symbolObject[1].sign.includes(value)):
//          subtraction
// if this the first value, expect that it is the start of a negative number
        if (previousValue === ""){
            return "number"
        }
// if the previous value was an operator, also expect that this is a negative number
        symbolObject.forEach(element => {
            if (element.sign.includes(previousValue))
                return "number"
        });

        if (nextValue == "-"){
            return symbolObject[1]
        }

// if all of those are not the case, see it as a number, and place a "+" operator in front of it
        inputArray.push(currentElement)
        inputArray.push(symbolObject[0])
        currentElement = ""
        return "number"

        case (symbolObject[2].sign.includes(value)):
//          multiplication
            return symbolObject[2]
            break;

        case (symbolObject[3].sign.includes(value)):
//          division
            return symbolObject[3]
            break;

        case (symbolObject[4].sign.includes(value)):
//          bracketOpen
            return symbolObject[4]
            break;

        case (symbolObject[5].sign.includes(value)):
//          bracketOpen
            return symbolObject[5]
            break;     
               
        case (symbolObject[6].sign.includes(value)):
//          pi
            inputArray.push(Math.PI)
            return "skip"
            break;               

        case (symbolObject[7].sign.includes(value)):
//          to the 2nd power
            return symbolObject[7]
            break;            

        case (symbolObject[9].sign.includes(value)):
//          ..
            return symbolObject[9]
            break;

        case (symbolObject[10].sign.includes(value)):
//          ..
            return symbolObject[10]
            break;

        case (symbolObject[11].sign.includes(value)):
//          ..
            return symbolObject[11]
            break;

        case (symbolObject[12].sign.includes(value)):
//          ..
            return symbolObject[12]
            break;

        case (symbolObject[13].sign.includes(value)):
//          ..
            return symbolObject[13]
            break;

        case (symbolObject[14].sign.includes(value)):
//          ..
            return symbolObject[14]
            break;

        case (symbolObject[15].sign.includes(value)):
//          ..
            return symbolObject[15]
            break;

        case (symbolObject[16].sign.includes(value)):
//          ..
            return symbolObject[16]
            break;

        case (symbolObject[17].sign.includes(value)):
//          ..
            return symbolObject[17]
            break;

        case (symbolObject[18].sign.includes(value)):
//          ..
            return symbolObject[18]
            break;

        case (symbolObject[19].sign.includes(value)):
//          ..
            return symbolObject[19]
            break;

        case (symbolObject[20].sign.includes(value)):
//          ..
            return symbolObject[20]
            break;

        default:
            isError = true
            alert("ERROR: unknown symbol")
            return "error"
    }
}

function calculateInOrder(array, i){
let operationFound = false
// find an element with following arguments: the element and the index
    array.some((element, index) => {
// if the element is an object and precedence is (i) do:
        if (typeof element == "object" && element.precedence == i){
//do a calculation, (find the operator that the object is, and
//use the values around of the array to get the answer, and splice the unneeded values.
            array = doCalculation(element, index, array)
// end the function when the calculation was done
            operationFound = true
        } 
// if no operators of this precedence were found, operationfound stays false
    })

//if a symbol was found, the array changed. so the function needs to be 
//run again with the modified array.
    if (operationFound) {
        return calculateInOrder(array,i)
//if no operation was found, that means the we have no symbols at this precedence, 
//thus we can move up one precedence value
    } else if(i < 8){
        i++
        return calculateInOrder (array, i)
    } else if (i >= 8){
        return array
    } else {
        console.log("calculateInOrder ERROR")
        return array
    }
}


function doCalculation (symbol, index, array){
    let result = ""
    let previousValue = array[index-1]
    let nextValue = array[index+1]



    switch (true){
        case (symbol == symbolObject[0]):
//          addition
                result = +previousValue + +nextValue
               
                array.splice(index-1, 3, result)
                return array

            break;

        case (symbol == symbolObject[1]):
//          subtraction
                result = +previousValue - +nextValue
                            
                array.splice(index-1, 3, result)
                return array

            break;

        case (symbol == symbolObject[2]):
//          multiplication
                result = +previousValue * +nextValue

                array.splice(index-1, 3, result)   
                return array

            break;

        case (symbol == symbolObject[3]):
//          division
                result = +previousValue / +nextValue

                array.splice(index-1, 3, result)   
                return array

            break;

        case (symbol == symbolObject[4]):
//          bracketOpen
//          saves the indexes of open brackets, to be re-used when a close bracket has been found
            bracketOpenIndexArray.push(index)
            return array
            break;

        case (symbol == symbolObject[5]):
//          bracketClose
            let bracketOpenIndex = bracketOpenIndexArray.pop()
            let bracketCloseIndex = index
            let bracketedLength = (bracketCloseIndex - bracketOpenIndex)  + 1
            let bracketedContent = array.splice(bracketOpenIndex, bracketedLength)

//removing the brackets from the content that they contain 
            bracketedContent.pop() 
            bracketedContent.shift()
            
            result = calculate(bracketedContent)
//place the result in the original array, in place of the brackets            
            array.splice(bracketOpenIndex, 0 , result)

            return array
            break;

        case (symbol == symbolObject[7]):
//          to the 2nd power
            result = +previousValue * +previousValue

            array.splice(index-1, 2, result)   
            return array
            break;

        case (symbol == symbolObject[8]):
            let acc = previousValue
            for (i = nextValue; i>0 ; i--){
                acc = acc * previousValue
            }
            result = acc
            array.splice(index-1, 3, result)   
            return array
            break;

        case (symbol == symbolObject[9]):
            result = +previousValue + +previousValue
            array.splice(index-1, 3, result)   
            return array
            break;

        case (symbol == symbolObject[10]):
//          ...
            result = +previousValue + +previousValue
            array.splice(index-1, 3, result)   
            return array
            break;

        case (symbol == symbolObject[11]):
//          ...
            result = +previousValue + +previousValue
            array.splice(index-1, 3, result)   
            return array
            break;

        case (symbol == symbolObject[12]):
//          ...
            result = +previousValue + +previousValue
            array.splice(index-1, 3, result)   
            return array
            break;

        case (symbol == symbolObject[13]):
//          ...
            result = +previousValue + +previousValue
            array.splice(index-1, 3, result)   
            return array
            break;

        case (symbol == symbolObject[14]):
//          ...
            result = +previousValue + +previousValue
            array.splice(index-1, 3, result)   
            return array
            break;

        case (symbol == symbolObject[15]):
//          ...
            result = +previousValue + +previousValue
            array.splice(index-1, 3, result)   
            return array
            break;

        case (symbol == symbolObject[16]):
//          ...
            result = +previousValue + +previousValue
            array.splice(index-1, 3, result)   
            return array
            break;

        case (symbol == symbolObject[17]):
//          ...
            result = +previousValue + +previousValue
            array.splice(index-1, 3, result)   
            return array
            break;

        case (symbol == symbolObject[18]):
//          ...
            result = +previousValue + +previousValue
            array.splice(index-1, 3, result)   
            return array
            break;

        case (symbol == symbolObject[19]):
//          ...
            result = +previousValue + +previousValue
            array.splice(index-1, 3, result)   
            return array
            break;

        default:
            console.log(`doCalculation symbol "${symbol.sign}" unknown, thus was removed. ERROR`)
            array.splice(index, 1)
            return array
    }         
}

function doubleOperators (
    prePreviousElement, 
    previousElement, 
    currentElement, 
    nextElement, 
    nextNextElement,
    index,
    array){
    switch (true){
        case (symbolObject[0].sign === currentElement.sign):
//          addition

            if (previousElement.category == "operator"){
                array.splice(index, 1)
                errorCheckIteration--
            }
            return array
            break;

        case (symbolObject[1].sign == currentElement.sign):
//          subtraction
            return array
            break;

        case (symbolObject[2].sign == currentElement.sign):
//          multiplication
            return array
            break;

        case (symbolObject[3].sign == currentElement.sign):
//          division
            return array
            break;

        default:
            return array
    }
            
}

function returnCaret (value){
    displayTop.setSelectionRange(caretPosition+value.length, caretPosition+value.length)
}

//#endregion
//#region       >> Controller Functions
function operatorPress (e) {
    userInput = displayTop.value
    newSymbol = e.target.textContent
    newInput = userInput.slice(0,caretPosition) + newSymbol + userInput.slice(caretPosition)
    userInput = newInput
    updateDisplay ();
    returnCaret(e.target.textContent)
}

function numberPress (e) {
    let newNum = e.target.id.replace('btn', "")
    newInput = userInput.slice(0,caretPosition) + newNum + userInput.slice(caretPosition)
    userInput = newInput
    updateDisplay ();
    returnCaret(newNum)
}

function functionPress (e) {
    getFunction(e)
}


function updateDisplay (){
//    updateNum()
//    addSpaces()
    displayEntry()
    displayAns()
}


function makeStringArray(string){
    let result
    result = string.replace(/ /g,"")
    result = string.replace(/−/g,"-")
    return evaluateStringSymbols(result)
}

function calculate(array){
    return calculateInOrder(array, 1)
}


function checkForErrors (array) {
/* 
if there is an error found that will not be solved, isError will be true
this will stop the rest of calculation
*/ 

    if (isError){
        return true
    }

    let j = array.length -1
    for (let i = 0 ; i <= j ; i++){
        errorCheckIteration = i
        let prePreviousElement = array[i-2]
        let previousElement = array[i-1]
        let currentElement = array[i]
        let nextElement = array[i+1]
        let nextNextElement = array[i+2]
        let index = i

        if (currentElement.category == "operator") {
            doubleOperators(
                prePreviousElement, 
                previousElement, 
                currentElement, 
                nextElement, 
                nextNextElement,
                index,
                array
            )
        }
        // if any adjustments in index number need be made,
        // they can be changed in the error checks, and implemented here
        i = errorCheckIteration
    }

    isError = unEqualBracketAmount(array)
    
    return isError
}

function unEqualBracketAmount(array){
    let openBracketAmount = (() =>{
        return array.filter(x => x.id=="bracketOpen").length
    })(array)
    let closedBracketAmount = ((array) =>{
        return array.filter(x => x.id=="bracketClose").length
    })(array)
    if (openBracketAmount != closedBracketAmount){
        alert ("ERROR: unequal amount of brackets!")
        return true
    }
}


//#endregion
//#endregion
//#region   > Dom Generation
//#region       >> LISTENERS

btnFrameFunc.childNodes.forEach(child => {
    child.addEventListener("click", functionPress);
});

btnFrameNum.childNodes.forEach(child => {
    child.addEventListener("click", numberPress);
});

btnFrameOperator.childNodes.forEach(child => {
    child.addEventListener("click", operatorPress);
});

displayTop.addEventListener('input', function(){
    userInput = displayTop.value
})

window.addEventListener("focus", ()=>{
    displayTop.focus()
})

window.addEventListener("load", ()=>{
    displayTop.focus()
})

document.addEventListener("keydown", (e=>{
    if (e.key == "Enter"){

        e.preventDefault()
        runEquals()
    } else if (e.key.length == 1){
    }
}))

/*
displayTop.addEventListener("click", (e=>{
    caretPosition = e.target.selectionStart
    console.log(caretPosition)
}))*/

//save the last caretposition when the input goed out of focus
displayTop.addEventListener("blur", (e=>{
    caretPosition = e.target.selectionStart
    displayTop.focus()
}))

//#endregion
//#endregion

userInput = "(5+3)×(12−4)/2−7"
updateDisplay()