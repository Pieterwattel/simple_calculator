//#region   > Variable Declarations
//#region       >> Global Variables

let dragCoordinates

let operator = ""
let ans = "0"

let userInput = ""
let updateString = false
let stringRemovedAmount

let currentElement = ""
let inputArray = []

let currentNum = ""

let ranEquals = false
let isError = false
let errorMessage = ""
let errorCheckIteration = 0

let bracketOpenIndexArray = []

let caretPosition = 0

let calcIteration = 0
let calcLog = []
let nextCalcLogArray = []
let previousCalcLogArray = []
let calcLogVisible = true

let color1
let color2
let color3

let fixEqualsBtnBug = ""

const img = document.createElement("img")
let btnFrameColorChange = true

//#endregion
//#region       >> Node declaration / generation
//#region           >>> Containers
const body = document.getElementById("body")

const calcLogFrame = document.getElementById("calcLogFrame")
const calcLogHeader = document.getElementById("calcLogHeader")
const calcLogContent = document.getElementById("calcLogContent")

const answerNodes = document.getElementsByClassName("answer")
const calculationNodes = document.getElementsByClassName("calculation")

const calculatorFrame = document.getElementById(`calculatorFrame`)

const zoomButtons = document.getElementById('zoomButtons')
const nextCalcLogBtn = document.getElementById("nextCalcLogBtn")
const previousCalcLogBtn = document.getElementById("previousCalcLogBtn")


const resetColor = document.getElementById("resetColors")

const pixels = document.querySelectorAll(".pixel")

const pixel1 = document.getElementById("pixel1")
const pixel2 = document.getElementById("pixel2")
const pixel3 = document.getElementById("pixel3")

const dragBar = document.getElementById("dragBar")
const dragHandle = document.getElementById("dragHandle")
const displayFrame = document.getElementById(`displayFrame`)
const previousCalculation = document.getElementById(`previousCalculation`)
const displayTop = document.getElementById(`displayTop`)
const backMissingCharacters = document.getElementById(`backMissingCharacters`)

const displayBottom = document.getElementById(`displayBottom`)

const btnsFrameMain = document.getElementById(`btnsFrameMain`)
const staticBtnFrame = document.getElementById(`staticBtnFrame`)
const btnFrameFunc = document.getElementById(`btnFrameFunc`)
const line1 = document.getElementById(`line1`)
const line2 = document.getElementById(`line2`)
const line3 = document.getElementById(`line3`)
const line4 = document.getElementById(`line4`)

const btnFrameNum = document.getElementById(`btnFrameNum`)

const btnFrameOperator = document.getElementById(`btnFrameOperator`)


//#endregion	
//#region           >>> Numbers
const numBtns = {}
for (let i = 9; i >= 0; i--) {
    numBtns[i] = document.getElementById(`btn${i}`);
}
//#endregion
//#region           >>> Calculation Symbols

let symbolObject = [
    {
        //0
        id: 'Addition',
        sign: ['+', '➕', '˖'],
        precedence: 6,
        category: "operator",
        placement: line1,
    },
    {
        //1
        id: 'Subtraction',
        sign: ['-', '−', '˗', '-', '−', '➖', '﹣', '－'],
        precedence: 6,
        category: "operator",
        placement: line1,
    },
    {
        //2
        id: 'Multiplication',
        sign: ['*', '×', '⋅', '∗'],
        precedence: 5,
        category: "operator",
        placement: line1,
    },
    {
        //3
        id: 'Division',
        sign: ['/', '÷', '➗'],
        precedence: 5,
        category: 'operator',
        placement: line1,
    },
    {
        //4
        id: 'Bracket open',
        sign: ['(', '﹙', '（'],
        precedence: 2,
        category: 'bracket',
        multiplyWhenNumInFront: 'true',
        placement: line2,
    },
    {
        //5
        id: 'Bracket close',
        sign: [')', '﹚', '）'],
        precedence: 2,
        category: 'bracket',
        multiplyWhenNumBehind: 'true',
        placement: line2,
    },
    {
        //6
        id: 'Pi',
        sign: ['π', 'Π', 'Π', 'Π', 'π', 'π', 'π', 'ϖ', 'ϖ', 'ϖ'],
        precedence: 1,
        category: 'number',
        multiplyWhenNumInFront: 'true',
        multiplyWhenNumBehind: 'true',
        placement: line3
    },
    {
        //7
        id: '2nd power',
        sign: ['²'],
        precedence: 4,
        category: 'operator',
        placement: line2,
    },
    {
        //8
        id: 'Exponentiation',
        sign: ['^', '**'],
        precedence: 4,
        category: 'operator',
        placement: line2,
    },
    {
        //9
        id: 'Factorial',
        sign: ['!'],
        precedence: 3,
        category: 'operator',
        multiplyWhenNumBehind: 'true',
        btnTxt: "x!",
        placement: line3,
    },
    {
        //10
        id: 'Modulus divide',
        sign: ['%', 'mod'],
        precedence: 5,
        category: 'operator',
        placement: line3,
    },
    {
        //11
        id: 'Square root',
        sign: ['√',],
        precedence: 4,
        category: 'operator',
        btnTxt: "√",
        multiplyWhenNumInFront: 'true',
        placement: line2,
    },
    {
        //12
        id: 'Sine',
        sign: ['sin'],
        precedence: 3,
        category: 'trigFunction',
        btnTxt: "sin",
        multiplyWhenNumInFront: 'true',
        placement: line5,
    },
    {
        //13
        id: 'CoSine',
        sign: ['cos'],
        precedence: 3,
        category: 'trigFunction',
        btnTxt: "cos",
        multiplyWhenNumInFront: 'true',
        placement: line5,
    },
    {
        //14
        id: 'Tangent',
        sign: ['tan'],
        precedence: 3,
        category: 'trigFunction',
        btnTxt: "tan",
        multiplyWhenNumInFront: 'true',
        placement: line5,
    },
    {
        //15
        id: 'Inverse Sine',
        sign: ['asin'],
        precedence: 3,
        category: 'trigFunction',
        btnTxt: "aSin",
        multiplyWhenNumInFront: 'true',
        placement: line5,
    },
    {
        //16
        id: 'Inverse CoSine',
        sign: ['acos'],
        precedence: 3,
        category: 'trigFunction',
        btnTxt: "aCos",
        multiplyWhenNumInFront: 'true',
        placement: line5,
    },
    {
        //17
        id: 'Inverse Tangent',
        sign: ['atan'],
        precedence: 3,
        category: 'trigFunction',
        btnTxt: "aTan",
        multiplyWhenNumInFront: 'true',
        placement: line5,
    },
    {
        //18
        sign: ['ans'],
        precedence: 1,
        category: 'number',
        multiplyWhenNumInFront: 'true',
        multiplyWhenNumBehind: 'true',
    },
    {
        //19
        id: 'Nth root' ,
        sign: ['ⁿ√'],   
        precedence: 4,
        category: 'operator',
        placement: line2,
        } ,

]

symbolObject.forEach((prop) => {
    let btn = document.createElement("button")
    if (prop.placement){
    prop.placement.appendChild(btn)
    }
    btn.setAttribute("id", prop.id)
    btn.setAttribute("title", prop.id)
    btn.classList.add("btn")
    if (typeof prop.btnTxt == "undefined") {
        btn.textContent = prop.sign[0]
    } else {
        btn.textContent = prop.btnTxt
    }
    btn.addEventListener("click", () => operatorPress(Event, prop.sign[0]))
})


// empty symbol, for later additions
/*
    {
//
    id: '' ,
    sign: [''],   
    precedence:  ,
    category: '',
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
        id: 'Clear all fields',
        sign: 'C',
        function: () => clearDisplay(),
    },
    {
        id: 'Clear entry',
        sign: 'CE',
        function: () => clearEntry(),
    },
    {
        id: 'BackSpace',
        sign: '⌫',
        function: () => doBackspace(),
    },
    {
        id: 'Delete',
        sign: 'Del',
        function: () => doDelete(),
    }, {
        id: 'Previous answer',
        sign: 'ans',
        function: () => runAns(),
    },
    {
        id: 'Equals',
        sign: '=',
        function: () => runEquals(),
    },
]

otherBtns.forEach((prop) => {
    let btn = document.createElement("button")
    btnFrameFunc.appendChild(btn)
    btn.setAttribute("id", prop.id)
    btn.classList.add("btn")
    btn.textContent = prop.sign
    btn.setAttribute("title", prop.id)
})


//#endregion
//#region           >>> later variable declarations or listeners
let allBtns = document.querySelectorAll(".btn")
const equalsBtn = document.getElementById("Equals")
//#endregion
//#endregion
//#region   > Functions 
//#region       >> Utility Functions

function logId(e) {
    console.log(`hi! is seems that the ${e.target.id} item was clicked`)
}

function getId(e) {
    return e.target.id
}

function logNum(e) {
    console.log(`hi! is seems that the ${e.target.id.replace('btn', "")} item was clicked`)
}


function makeNumber(value) {
    return parseFloat(value)
}

function returnSimplifiedString(array) {

    let string = ""
    array.forEach(element => {
        if (Number(parseFloat(element))||
        element == "-") {
            string += element
        } else if (typeof element == "object") {
            string += element.sign[0]
        }
    });
    return string
}

function returnSimplifiedArray(array) {
    let result = []
    array.forEach(element => {
        if (typeof element == "object") {
            result.push(element.sign[0])
        } else {
            result.push(element)
        }
    });
    return result
}

function getFunction(e) {
    switch (e.target.textContent) {
        case "=":
            runEquals()
            fixEqualsBtnBug = displayTop.value
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
            alert("Unknown function button pressed")
    }
}

function runEquals() {
    let string
    if (displayTop.value != "") {
        isError = false
        inputArray = []
        previousElementForMultiplication = ""
        string = displayTop.value.concat(backMissingCharacters.textContent)
        array = getArrayFromString(string)
        // if there are no errors, run the rest of the function
        if (!checkForErrors(array)) {
            result = calculate(array)
            ans = ""
            ans = result.flat()
            saveCalculation(string, ans)
            displayAns()
            inputArray = []
            currentElement = ""
            ranEquals = true
        } else {
            alert(errorMessage)
        }
        errorMessage = ""
    }
}

function addToInput(string){
    userInput = displayTop.value
    newInput = userInput.slice(0, caretPosition) + string + userInput.slice(caretPosition)
    if (userInput != "") {
    returnCaret(string)
    }
    userInput = newInput
    updateDisplay();
}

function saveCalculation(string, ans){
    calcLog.push({[calcIteration]: {
            calc: string ,
            ans: ans.toString() ,
        }
    })
    displayCalcLogElement(calcLog[calcIteration][calcIteration].calc, calcLog[calcIteration][calcIteration].ans)
    calcIteration++
}

function displayCalcLogElement(calculation, answer){
        const calculationDiv = document.createElement("div")
    calculationDiv.textContent += calculation
    calculationDiv.classList.add("calculation")
    calculationDiv.classList.add("btn")
    calculationDiv.addEventListener("click", ()=> addToInput(calculationDiv.textContent))
    if (color2){
        calculationDiv.style.backgroundColor=color2
    }

    const answerDiv = document.createElement("div")
    answerDiv.textContent += answer
    answerDiv.classList.add("answer")
    answerDiv.classList.add("btn")
    answerDiv.addEventListener("click", ()=> addToInput(answerDiv.textContent))
    if (color3 && themes.colorAns){
        answerDiv.style.backgroundColor=color3
    }


    calcLogContent.prepend(answerDiv)

    calcLogContent.prepend(calculationDiv)
        answerDiv.addEventListener("mouseover", ()=>darkenOnHover(answerDiv))
        answerDiv.addEventListener("mousedown", ()=>addTempShadow(answerDiv))

        calculationDiv.addEventListener("mouseover", ()=>darkenOnHover(calculationDiv))
        calculationDiv.addEventListener("mousedown", ()=>addTempShadow(calculationDiv))

}

function runAns() {
    newInput = userInput.slice(0, caretPosition) + "ANS" + userInput.slice(caretPosition)
    userInput = newInput
    updateDisplay();
    returnCaret("ANS")
}

function clearDisplay() {
    console.log(userInput)
    userInput = ""
    ans = ""
    updateDisplay()
}

function clearEntry() {
    userInput = ""
    updateDisplay()
}

function doBackspace() {
    if(caretPosition){
        userInput = userInput.slice(0, caretPosition - 1) + userInput.slice(caretPosition)
        updateDisplay()
        displayTop.setSelectionRange(caretPosition - 1, caretPosition - 1)
    }
}

function doDelete() {
    userInput = userInput.slice(0, caretPosition) + userInput.slice(caretPosition + 1)
    updateDisplay()
    returnCaret("")
}

function displayEntry() {
    if (fixEqualsBtnBug != ""){
        userInput = fixEqualsBtnBug
    }
    displayTop.value = userInput
    fixEqualsBtnBug = ""
}

function displayAns() {
    displayBottom.textContent = ans
}

function isNumber(value) {
    if (!isNaN(value) || value === ".") {
        return true
    } else {
        return false
    }
}

function isNumberOrMinus(value) {
    if (!isNaN(value) ||
        value === "." ||
        symbolObject[1].sign.includes(value)) {
        return true
    } else {
        return false
    }
}

function isNumberIncludesAll(value) {
    if (!isNaN(value) ||
        value === "." ||
        symbolObject[1].sign.includes(value) ||
        value.category == "number") {
        return true
    } else {
        return false
    }
}

function isNumberIncludesAllButMinus(value) {
    if (value == "-"){
        return false
    }
    if (!isNaN(value) ||
        value === "." ||
        symbolObject[1].sign.includes(value) ||
        value.category == "number") {
        return true
    } else {
        return false
    }
}

function isNumberIncludesAllButMinusAndPeriod(value) {
    if (value == "-"){
        return false
    }
    if (!isNaN(value) ||
        symbolObject[1].sign.includes(value) ||
        value.category == "number") {
        return true
    } else {
        return false
    }
}

function evaluateStringSymbols(string) {

    // 3 values that can be given, to evaluate the context of a symbol
    let previousValue = ""
    let value = ""
    let nextValue = ""

    let twoSymbolValue
    let threeSymbolValue
    let fourSymbolValue
    let fiveSymbolValue
    let sixSymbolValue

    let i = string.length
    let j = 0
    loop: while (j < i) {
        if (updateString) {
            string = userInput
            i = string.length
            updateString = false
        }

        previousValue = string.charAt(j - 1)
        value = string.charAt(j)
        nextValue = string.charAt(j + 1)

        twoSymbolValue = string.slice(j, j + 2)
        threeSymbolValue = string.slice(j, j + 3)
        fourSymbolValue = string.slice(j, j + 4)
        fiveSymbolValue = string.slice(j, j + 5)
        sixSymbolValue = string.slice(j, j + 6)

        makeInputArray(previousValue, value, nextValue, string, j,
            twoSymbolValue,
            threeSymbolValue,
            fourSymbolValue,
            fiveSymbolValue,
            sixSymbolValue,
        )

        if(isError){
            break loop
        }

        j++
    }
    return inputArray
}

function numberOrObject(previousValue, value, nextValue, string, index,
    twoSymbolValue,
    threeSymbolValue,
    fourSymbolValue,
    fiveSymbolValue,
    sixSymbolValue,
) {
    if (isNumber(value)) {
        return value
    } else {
        return checkSymbol(previousValue, value, nextValue, string, index,
            twoSymbolValue,
            threeSymbolValue,
            fourSymbolValue,
            fiveSymbolValue,
            sixSymbolValue,
        )
    }

    /*
    let returnValue = ""
    // check if value is number, returns string "number"
    if (Number(parseFloat(value)) || value == "." || value == "0") {
        //        console.log(`value "${value}" is a number`)
        returnValue = "number"
    }

    let allowForEach = true

    // check if value is operator, returns array [operator,  arrayIndex()
    symbolObject.forEach(element => {
        if (allowForEach) {
            if (element.sign.includes(value) ||
                element.sign.includes(twoSymbolValue) ||
                element.sign.includes(threeSymbolValue) ||
                element.sign.includes(fourSymbolValue) ||
                element.sign.includes(fiveSymbolValue) ||
                element.sign.includes(sixSymbolValue)) {
                returnValue = checkSymbol(previousValue, value, nextValue, string, index,
                    twoSymbolValue,
                    threeSymbolValue,
                    fourSymbolValue,
                    fiveSymbolValue,
                    sixSymbolValue,
                )
                allowForEach = false
            }
        }
    })

    //value was not a number nor known operator
    if (returnValue == "error") {
        console.log("numberOrOperator error")
        alert("ERROR: unknown symbol")
        isError = true
        returnValue = "error"
    }
    return returnValue
    */
}

function makeInputArray(previousValue, value, nextValue, string, index,
    twoSymbolValue,
    threeSymbolValue,
    fourSymbolValue,
    fiveSymbolValue,
    sixSymbolValue,
) {

    result = numberOrObject(previousValue, value, nextValue, string, index,
        twoSymbolValue,
        threeSymbolValue,
        fourSymbolValue,
        fiveSymbolValue,
        sixSymbolValue,
    )

    if(isError){
        return
    }

    let lastElement = inputArray[inputArray.length - 1]

    if (isNumber(result)) {
        //then I need to check if the last array item is an object or "", 
        //and in that case, make a new element for the number.    
        if (typeof lastElement === "object" ||
            typeof lastElement === "undefined" ||
            lastElement === "-") {
            inputArray.push(result)
        } else if (isNumber(lastElement)) {
            inputArray[inputArray.length - 1] += result
        }
    }else if (result == "-"){
        inputArray.push(result)
    }else if (typeof result == "object") {
        inputArray.push(result)
    } else {
        alert("value falls outside makeInputArray options")
    }
}

function addToInputArray(item, index) {
    console.log(index)
    if (typeof index == "undefined"){
        inputArray.push(item)
    }
    inputArray.splice(index, 0, item)
}

function addNegativeNums(array, index){
    let previousElement = inputArray[index-1]
    let currentElement = inputArray[index]
    let nextElement = inputArray[index+1]

    console.log(currentElement)

    let minus = symbolObject[1]

/*
    function removeBackElement(){
        inputArray.splice(backIndex, 1)
    }
*/

    function makeNextElementNegative() {
        let newValue = nextElement * -1
        array.splice(index, 2, newValue)
        decrementIndex = true
    }

    // if this the first value expect that it is the start of a negative number
    if (typeof previousElement === "undefined") {
        makeNextElementNegative()
        return
    } else if (typeof previousElement == "object" &&
        previousElement.category != "number") {
        // if the previous value was an operator, also expect that this is a negative number
        makeNextElementNegative()
        return
    } else if (nextElement == symbolObject[1]) {
        //if the next value is also a minus, see this as an operator
        return
    } else if (isNumber(nextElement)){
        // if all of those are not the case, assume this is meant as an operator.
        // see it as a number, and place a "+" operator in front of it
        let newValue = symbolObject[0]
        array.splice(index, 0, newValue)
        decrementIndex = true
        return
    }
}

function addMultiplication(array, index) {
    // pops off the last element, to put back at the end. 
    //if multiplication is added, then this can thus be added in between the last and before last element

    frontNum = array[index]
    backNum = array[index-1]

    //first check if either values are empty, then there is nothing multiply of course.
    if (typeof frontNum == "undefined" ||
        typeof backNum == "undefined" ||
        frontNum == "" ||
        backNum == "") {
        return
    }

    // number first, object next  "3sin()" = "3*sin()"
    if (isNumberIncludesAllButMinus(backNum) && frontNum.multiplyWhenNumInFront) {
        array.splice(index, 0 , symbolObject[2])
        // object first, number next "sin()3" = "sin()*3"
    } else if (backNum.multiplyWhenNumBehind && isNumberIncludesAllButMinus(frontNum)) {
        array.splice(index, 0 , symbolObject[2])
    }


    //two brackets facing each other back to back ")(" = ")*("
    if (backNum == symbolObject[5] && frontNum == symbolObject[4]) {
        array.splice(index, 0 , symbolObject[2])
    }
}

function deleteValuesFromString(index, amount) {
    userInput = userInput.slice(0, index) + userInput.slice(index + amount)
    updateString = true
    stringRemovedAmount = amount
}

function checkSymbol(previousValue, value, nextValue, string, index,
    twoSymbolValue,
    threeSymbolValue,
    fourSymbolValue,
    fiveSymbolValue,
    sixSymbolValue,
) {
    previousElement = inputArray[inputArray.length - 1]

    // the checks are order by length of the symbols, so:
    //cos() is checked before (), because otherwise it might label the symbol wrongly
    switch (true) {
        //-- 4 VALUE LENGTH SYMBOLS --
        case (symbolObject[15].sign.includes(fourSymbolValue)):
            //          inverse sine
            deleteValuesFromString(index + 1, 3)
            return symbolObject[15]
            break;

        case (symbolObject[16].sign.includes(fourSymbolValue)):
            //          inverse coSine
            deleteValuesFromString(index + 1, 3)
            return symbolObject[16]
            break;

        case (symbolObject[17].sign.includes(fourSymbolValue)):
            //          inverse tangent
            deleteValuesFromString(index + 1, 3)
            return symbolObject[17]
            break;

        //-- 3 VALUE LENGTH SYMBOLS --
        case (symbolObject[10].sign.includes(threeSymbolValue)):
            //          remainder (modulo)
            deleteValuesFromString(index + 1, 2)
            return symbolObject[10]
            break;

        case (symbolObject[12].sign.includes(threeSymbolValue)):
            //          sine
            deleteValuesFromString(index + 1, 2)
            return symbolObject[12]
            break;

        case (symbolObject[13].sign.includes(threeSymbolValue)):
            //          cosine
            deleteValuesFromString(index + 1, 2)
            return symbolObject[13]
            break;

        case (symbolObject[14].sign.includes(threeSymbolValue)):
            //          tangent
            deleteValuesFromString(index + 1, 2)
            return symbolObject[14]
            break;

        case (symbolObject[18].sign.includes(threeSymbolValue)):
            //          ANS
            deleteValuesFromString(index + 1, 2)
            return symbolObject[18]
            break;

        //-- 2 VALUE LENGTH SYMBOLS --
        case (symbolObject[8].sign.includes(twoSymbolValue)):
            //          any exponent
            deleteValuesFromString(index + 1, 1)
            return symbolObject[8]
            break;

        case (symbolObject[19].sign.includes(twoSymbolValue)):
            //          ..
            deleteValuesFromString(index - 1, 1)
            return symbolObject[19]


        //-- 1 VALUE-LENGTH SYMBOLS --
        case (symbolObject[0].sign.includes(value)):
            //          addition
            return symbolObject[0]
            break;

        case (symbolObject[1].sign.includes(value)):
            //          subtraction
            return symbolObject[1]
            break;


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
            //          Pi
            return symbolObject[6]
            break;

        case (symbolObject[7].sign.includes(value)):
            //          to the 2nd power
            return symbolObject[7]
            break;

        case (symbolObject[8].sign.includes(value)):
            //          any exponent
            return symbolObject[8]
            break;

        case (symbolObject[9].sign.includes(value)):
            //          factorial
            return symbolObject[9]
            break;

        case (symbolObject[10].sign.includes(value)):
            //          remainder (modulo)
            return symbolObject[10]
            break;

        case (symbolObject[11].sign.includes(value)):
            //          square root
            return symbolObject[11]
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

        default:
            isError = true
            alert('SYNTAX ERROR, value "' + value + '" is unknown')
    }
}

let allNegativeNumDone = false

function calculateInOrder(array, i) {


    let l = array.length
    for (let i = 0 ; i < l; i++){
        if (array[i] == symbolObject[1]){
            addNegativeNums(array, i)

            if (decrementIndex){
                i--
                decrementIndex = false
            }
        }
    }

    let operationFound = false
    // find an element with following arguments: the element and the index
    array.some((element, index) => {
        // if the element is an object and precedence is (i) do:
        if (typeof element == "object" && element.precedence == i) {
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
        return calculateInOrder(array, i)
        //if no operation was found, that means the we have no symbols at this precedence, 
        //thus we can move up one precedence value
    } else if (i < 8) {
        i++
        return calculateInOrder(array, i)
    } else if (i >= 8) {
        return array
    } else {
        console.log("calculateInOrder ERROR")
        return array
    }
}

function makeNumbersNegative(array){
    allNegativeNumDone = true
    for (i=0; i <= array.length-1; i++){
        let currentElement = array[i]
        let nextElement = array[i+1]
        if (currentElement == "-"){
            if (isNumber(nextElement)){
                console.log(currentElement)
                array.splice(i, 1)
                array[i] = nextElement * -1
            }
        }

    }
    return (array)

}


function doCalculation(symbol, index, array) {
    let num
    let acc
    let result = ""
    let previousValue = array[index - 1]
    let nextValue = array[index + 1]


    switch (true) {
        case (symbol == symbolObject[0]):
            //          addition
            result = +previousValue + +nextValue

            array.splice(index - 1, 3, result)
            return array

            break;

        case (symbol == symbolObject[1]):
            //          subtraction
            result = +previousValue - +nextValue

            array.splice(index - 1, 3, result)
            return array

            break;

        case (symbol == symbolObject[2]):
            //          multiplication
            result = +previousValue * +nextValue

            array.splice(index - 1, 3, result)
            return array

            break;

        case (symbol == symbolObject[3]):
            //          division
            result = +previousValue / +nextValue

            array.splice(index - 1, 3, result)
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
            let bracketedLength = (bracketCloseIndex - bracketOpenIndex) + 1
            let bracketedContent = array.splice(bracketOpenIndex, bracketedLength)

            //removing the brackets from the content that they contain 
            bracketedContent.pop()
            bracketedContent.shift()

            result = calculate(bracketedContent)
            //place the result in the original array, in place of the brackets            
            array.splice(bracketOpenIndex, 0, ...result)

            console.log(array)

            return array
            break;

        case (symbol == symbolObject[6]):
            //          Pi
            result = Math.PI

            array.splice(index, 1, result)
            return array
            break;

        case (symbol == symbolObject[7]):
            //          to the 2nd power
            result = +previousValue * +previousValue

            array.splice(index - 1, 2, result)
            return array
            break;

        case (symbol == symbolObject[8]):
            //          any exponent
            result = (+previousValue) ** (+nextValue)

            array.splice(index - 1, 3, result)
            return array
            break;

        case (symbol == symbolObject[9]):
            //          factorial
            num = previousValue
            if (num == 0 || num == 1) {
                return 1
            }

            let acc = 1
            let i = 1
            while (i - 1 < num) {
                acc = acc * i
                i++
            }
            result = acc
            console.log(previousValue)
            console.log(result)
            array.splice(index - 1, 2, result)
            return array
            break;

        case (symbol == symbolObject[10]):
            //          remainder
            result = +previousValue % +nextValue
            array.splice(index - 1, 3, result)
            return array
            break;

        case (symbol == symbolObject[11]):
            //          square root
            result = Math.sqrt(nextValue)
            array.splice(index, 2, result)
            return array
            break;

        case (symbol == symbolObject[12]):
            //          sinus
            result = Math.sin(+nextValue)
            array.splice(index, 2, result)
            return array
            break;

        case (symbol == symbolObject[13]):
            //          coSine
            result = Math.cos(+nextValue)
            array.splice(index, 2, result)
            return array
            break;

        case (symbol == symbolObject[14]):
            //          tangent
            result = Math.tan(+nextValue)
            array.splice(index, 2, result)
            return array
            break;

        case (symbol == symbolObject[15]):
            //          inverse sine
            result = Math.asin(+nextValue)
            array.splice(index, 2, result)
            return array
            break;

        case (symbol == symbolObject[16]):
            //          inverse coSine
            result = Math.acos(+nextValue)
            array.splice(index, 2, result)
            return array
            break;

        case (symbol == symbolObject[17]):
            //          inverse tangent
            result = Math.atan(+nextValue)
            array.splice(index, 2, result)
            return array
            break;

        case (symbol == symbolObject[18]):
            //          ans
            result = ans

            array.splice(index, 1, result)
            return array
            break;

        case (symbol == symbolObject[19]):
            //          ...
            result = (Math.pow(nextValue,1/previousValue))
            array.splice(index - 1, 3, result)
            return array
            break;

        default:
            console.log(`doCalculation symbol "${symbol.sign}" unknown, thus was removed. ERROR`)
            array.splice(index, 1)
            return array
    }
}

function returnCaret(value) {
    setTimeout(() => {
        displayTop.setSelectionRange(caretPosition + value.length, caretPosition + value.length)
    }, 10)
}

function checkBracketsBalance(string) {
    let closedBracketAmount = 0
    let openBracketAmount = 0
    let BracketBalance

    open = string.match(/\(/g)
    if (open != null) {
        openBracketAmount = open.length
    }

    close = string.match(/\)/g)
    if (close != null) {
        closedBracketAmount = close.length
    }
    BracketBalance = (openBracketAmount - closedBracketAmount)

    return BracketBalance
}

function unEqualBracketAmount(string) {
    if (checkBracketsBalance(string) != 0) {
        isError = true
        errorMessage = "SYNTAX ERROR: unequal bracket balance"
    }
}

let moveCalculatorFrame = (e) => {
    let newLeft = leftLocationCalFr() + e.movementX
    let newTop = topLocationCalFr() + e.movementY

    newCoordinatesCalFr(newLeft, newTop)
}

//eventlistener for dragging the cursor in the dragBar
dragBar.addEventListener("mousedown", ()=>{

    document.addEventListener("mousemove", moveCalculatorFrame)

    document.addEventListener("mouseup", ()=>{
        document.removeEventListener("mousemove", moveCalculatorFrame)
    })
})

function leftLocationCalFr (){
    return calculatorFrame.getBoundingClientRect().left
}

function topLocationCalFr (){
    return calculatorFrame.getBoundingClientRect().top
}


function newCoordinatesCalFr(left, top){
    calculatorFrame.style.left= (left + "px")
    calculatorFrame.style.top= (top + "px")
    setTimeout(() => {
        if (left < 0){
            left = 0
            newCoordinatesCalFr(left, top)
        }
        if (top < 0){
            top = 0
            newCoordinatesCalFr(left, top)
        }
    }, "500")
}

function zoomout () {
    calculatorFrameZoom = calculatorFrameZoom * 0.8
    calculatorFrame.style.transform=(`scale(${calculatorFrameZoom}, ${calculatorFrameZoom})`)
}

function zoomin () {
    calculatorFrameZoom = calculatorFrameZoom * 1.2
    calculatorFrame.style.transform=(`scale(${calculatorFrameZoom}, ${calculatorFrameZoom})`)
}

function triggerColorChange (color){
    let newColor = getRandomRgbValue ()
    switch (color){
        case 1:
            color1 = newColor
            pixel1.style.backgroundColor = color1
            changeColors(color1, false, false)
        break;
        case 2:
            color2 = newColor
            pixel2.style.backgroundColor = color2
            changeColors(false, color2, false)
        break;
        case 3:
            color3 = newColor
            pixel3.style.backgroundColor = color3
            changeColors(false, false, color3)
        break;
    default:
    }
    changeColors(color1, color2, color3)
}

function RandomColors(){
    changeColors(getRandomRgbValue(), getRandomRgbValue(), getRandomRgbValue())
}

function resetColors(){
    color1 = ""
    color2 = ""
    color3 = ""
    pixel1.style.backgroundColor = ""
    pixel2.style.backgroundColor = ""
    pixel3.style.backgroundColor = ""
    changeColors(color1, color2, color3)
}

function changeColors(newColor1, newColor2, newColor3){
    switch(!0){
        case Boolean(newColor1):
            console.log("1")
            color1 = newColor1  
            document.body.style.background = color1
            document.body.style.backgroundColor = color1

        case Boolean(newColor2):
            console.log("2")
            color2 = newColor2
            Array.from(calculationNodes).forEach(node => {
                node.style.backgroundColor = color2
            });
            calcLogHeader.style.backgroundColor=color2
            if (color2){
                calcLogHeader.style.color="black"
            }
            equalsBtn.style.borderColor=color2
            allBtns.forEach(element => {
                if (element != nextCalcLogBtn &&
                element != previousCalcLogBtn){
                element.style.backgroundColor=color2
                fontWhiteIfBgDark(element)
                }
            });
            dragBar.style.backgroundColor=color2
            lightenBackground(equalsBtn)

        case Boolean(newColor3):
            console.log("3")
            color3 = newColor3   
            if (themes.colorAns){
                Array.from(answerNodes).forEach(node => {
                    node.style.backgroundColor = color3
                });
            } else {
                Array.from(answerNodes).forEach(node => {
                    node.style.backgroundColor = ""
                });
            }
            if (color1 && btnFrameColorChange){
            btnsFrameMain.style.backgroundColor=color3
            }
            nextCalcLogBtn.style.backgroundColor=color3
            fontWhiteIfBgDark(nextCalcLogBtn)
            previousCalcLogBtn.style.backgroundColor=color3
            fontWhiteIfBgDark(previousCalcLogBtn)
            themeSelection.style.backgroundColor=color3
            fontWhiteIfBgDark(themeSelection)
            resetColor.style.backgroundColor=color3
            fontWhiteIfBgDark(resetColor)
    }
}

function changeColorLogSpecific(calcLogSelectColor, AnsLog){
    color3 = calcLogSelectColor
//first value is for the color of the calcLog selection btns, second is for the ans values of the answers
    nextCalcLogBtn.style.backgroundColor=color3
    previousCalcLogBtn.style.backgroundColor=color3
    if (AnsLog == "1"){
        AnsLog = color3
        Array.from(answerNodes).forEach(node => {
            node.style.backgroundColor = color3
        });
    }

}

function getRandomRgbValue () {
    let getValue = () =>  Math.floor(Math.random() *255)
    return `rgb(${getValue()}, ${getValue()}, ${getValue()})`
}

function darkenRgb(string){
    let rgbNumbers = string.match(/\d+/g).map(Number)
    rgbNumbers = rgbNumbers.map(number => Math.max(0, number * 0.7))
    return `rgb(${rgbNumbers[0]}, ${rgbNumbers[1]}, ${rgbNumbers[2]})`
}

function brightenRgb(string){
    let rgbNumbers = string.match(/\d+/g).map(Number)
    rgbNumbers = rgbNumbers.map(number => Math.max(0, number * 1.3 + 30))
    return `rgb(${rgbNumbers[0]}, ${rgbNumbers[1]}, ${rgbNumbers[2]})`
}

function darkenOnHover (item){
    bgColor = window.getComputedStyle(item).backgroundColor;
    let newColor = darkenRgb(bgColor)
    item.style.backgroundColor = newColor
    
    item.addEventListener("mouseout", ()=>resetBackground(item, bgColor))
}

function resetBackground (item, color){
    item.style.backgroundColor = color
}

function lightenBackground (item){
    bgColor = window.getComputedStyle(item).backgroundColor;
    let newColor = brightenRgb(bgColor)
    item.style.backgroundColor = newColor
}

function fontWhiteIfBgDark(item){
    let style = window.getComputedStyle(item)
    let bgColor = style.backgroundColor;

    let num
    let acc = 0
        bgColor.match(/\d+/g).map((num) =>{
        acc = +acc + +num
    })
    if (style.color == "rgb(0, 0, 0)") {
        if (acc < 200){
            item.style.color="rgb(210, 210, 210)"
        }
    } else {
        if (acc >= 200){
            item.style.color="black"
        }
    }
}

function addTempShadow(item){
    item.style.boxShadow="inset 1px 1px 4px black"
    setTimeout(() => {
            item.style.boxShadow=""
    }, "80")
}

function newCalcLog (){
    previousCalcLogs.push(calcLog)
    calcLog = []
}

function displayNextCalcLog(){
    //make sure that the calcLog is displayed when it's currently hidden.
    if (!calcLogVisible){
        calcLogContent.classList.remove("closeAnimation")
        calcLogVisible = true
    }

    // check first if the user is creating a new calcLog
    if (nextCalcLogArray.length == 0){
        // if the current one is empty, don't allow it.
        if (calcLog.length == 0){
        return
        }
        // then, if this calcLog not empty, save the current one and empty it
        if (calcLog.length > 0){
            previousCalcLogArray.push(calcLog)
            calcLog = []
            calcLogHeader.textContent = `Calculation History ${integerToRoman(previousCalcLogArray.length+1)}`
        }
    } else{
        // if the user is not creating a new calcLog, they are navigating forward though the log history
        previousCalcLogArray.push(calcLog)    
        calcLog = nextCalcLogArray.pop()
        calcLogHeader.textContent = `Calculation History ${integerToRoman(previousCalcLogArray.length+1)}`
    }
    displayCalcLog()
}

function displayPreviousCalcLog(){
    //make sure that the calcLog is displayed when it's currently hidden.
    if (!calcLogVisible){
        calcLogContent.classList.remove("closeAnimation")
        calcLogVisible = true
    }

    // check first if the user is at the first calcLog entry:
    if (previousCalcLogArray.length == 0){
        return 
    } else {
        //if the user is not at the first calcLog, they are navigating backwards through the history.
        nextCalcLogArray.push(calcLog)
        calcLog = previousCalcLogArray.pop()
        calcLogHeader.textContent = `Calculation History ${integerToRoman(previousCalcLogArray.length+1)}`
    }
    displayCalcLog()
}



function displayCalcLog(){
    //delete calcLog html elements
    for (let i = calcLogContent.childNodes.length-1; i>=0; i--){
        calcLogContent.childNodes[i].remove()
    }

    //create calcLog html elements
    j = calcLog.length-1
    for (i = 0; i <= j; i++){
       displayCalcLogElement(calcLog[i][i].calc, calcLog[i][i].ans)
    }
    calcIteration = calcLog.length
}

function switchCalcLogVisibility() {
    if (calcLogVisible){
        calcLogContent.classList.add("closeAnimation")
        calcLogVisible = false
    } else {
        calcLogContent.classList.remove("closeAnimation")
        calcLogVisible = true
    }
}

function integerToRoman(num) {
    const romanValues = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    let roman = '';
    for (let key in romanValues) {
        while (num >= romanValues[key]) {
            roman += key;
            num -= romanValues[key];
        }
    }
    return roman;
}


//#endregion
//#region       >> Controller Functions
function operatorPress(e, newSymbol) {
    userInput = displayTop.value
    newInput = userInput.slice(0, caretPosition) + newSymbol + userInput.slice(caretPosition)
    if (userInput != "") {
        returnCaret(newSymbol)
    }
    userInput = newInput
    updateDisplay();
}

function numberPress(e) {
    let newNum = e.target.id.replace('btn', "")
    newInput = userInput.slice(0, caretPosition) + newNum + userInput.slice(caretPosition)
    userInput = newInput
    updateDisplay();
    returnCaret(newNum)
}

function functionPress(e) {
    getFunction(e)
}


function 
updateDisplay() {
    //    updateNum()
    //    addSpaces()
    displayEntry()
    displayAns()
}

let decrementIndex = false

function getArrayFromString(string) {
    let result
    result = string.toLowerCase()
    result = result.replace(/\s/g, '').toLowerCase()
    result = result.replace(/−/g, "-")
    userInput = result
    stringErrorCheck(result)
    resultArray = evaluateStringSymbols(result)

    let l = resultArray.length
    for (let i = 0 ; i < l; i++){
        if (resultArray[i] == symbolObject[1]){
            addNegativeNums(resultArray, i)

            if (decrementIndex){
                i--
                decrementIndex = false
            }
        }
    }

    resultArray.forEach((element, index) => {
        addMultiplication(resultArray, index)
    });

    //previousCalculation.textContent = returnSimplifiedArray(resultArray)

    return resultArray
}

function stringErrorCheck(string) {
    unEqualBracketAmount(string)
}

function calculate(array) {
    return calculateInOrder(array, 1)
}


function checkForErrors(array) {
    /* 
    if there is an error found that will not be solved, isError will be true
    this will stop the rest of calculation
    */

    if (isError) {
        return true
    }

    let j = array.length - 1
    for (let i = 0; i <= j; i++) {
        errorCheckIteration = i
        let prePreviousElement = array[i - 2]
        let previousElement = array[i - 1]
        let currentElement = array[i]
        let nextElement = array[i + 1]
        let nextNextElement = array[i + 2]
        let index = i

        let num

        if (typeof nextElement == "object") {
            num = nextNextElement
        } else {
            num = nextElement
        }

        if (currentElement == symbolObject[15]) {
            if (num < -1 ||
                num > 1) {
                isError = true
                errorMessage = "invalid input for aSine, number must be between -1 and 1"
            }
        } else if (currentElement == symbolObject[16]) {
            if (num < -1 ||
                num > 1) {
                isError = true
                errorMessage = "invalid input for aCos, number must be between -1 and 1"
            }
        }

        if (typeof nextElement != "undefined"){
            if (currentElement.category == "operator" && nextElement.category == "operator" && nextElement != symbolObject[11]){
                errorMessage = "SYNTAX ERROR: two consecutive operators"
                isError = true
            }
        }

        if (currentElement == "") {
            array.splice(index, 1)
        }

        if (currentElement == symbolObject[4]&&
            nextElement == symbolObject [5]){
                errorMessage = "SYNTAX ERROR: empty brackets"
                isError = true
        }

        // if any adjustments in index number need be made,
        // they can be changed in the error checks, and implemented here
        i = errorCheckIteration
    }

    return isError
}

function runEveryEdit(e) {
    userInput = displayTop.value
    if (ranEquals){
        if (typeof e.key != "undefined" && isNumberIncludesAllButMinusAndPeriod(e.key)||
        typeof e.target.id != "undefined" && isNumberIncludesAllButMinusAndPeriod(e.target.id.replace('btn', ""))){
        let newValue = userInput.at(-1)
            userInput=""
            userInput += newValue
            updateDisplay()
        }
        ranEquals=false
    }
    balance = checkBracketsBalance(userInput)
    if (userInput.length <= 3) {
        addAnsWhenOperatorFirst(userInput)
    }
    giveMissingBrackets(balance) 
}

function addAnsWhenOperatorFirst(string) {
    let endLoop = false
    let i
    let char = ""
    //check the first value of the userinput
    char = string.charAt(0)

    symbolObject.forEach(element => {
        if (element.category == "operator" &&
            element.sign.includes(char) &&
            element.id != "Square root" &&
            element.id != "Subtraction"
        ) {
            let oldInput = displayTop.value
            displayTop.value = ""
            displayTop.value = "ANS"
            displayTop.value += oldInput
            endLoop = true
        }
    });
    /*
    loop1: for (i = 0; i <= 3; i++) {
        char += string.charAt(i)

        symbolObject.forEach(element => {
            if (element.category == "operator" &&
                element.sign.includes(char) &&
                element.id != "Square root"
            ) {
                let oldInput = displayTop.value
                displayTop.value = ""
                displayTop.value = "ANS"
                displayTop.value += oldInput
                endLoop = true
            }
        });
        if (endLoop) {
            break loop1
        }

    }
    */

    /*


    char += string.charAt(1)
    char += string.charAt(2)
    */
}

function giveMissingBrackets(balance) {

    let missingCloseBrackets = ""
    if (balance >= 0) {
        for (i = balance - 1; i >= 0; i--) {
            missingCloseBrackets += ")"
        }
    }
    backMissingCharacters.textContent = missingCloseBrackets
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

window.addEventListener("mousedown", (e) => {

    if (e.target.id == "displayBottom" ||
        e.target.parentNode.id == "displayFrame"||
        e.target.parentNode.id == "calcLogContent"||
        e.target.id == "themeSelection") {
    } else {
        setTimeout(() => {
            displayTop.focus()
        }, 50)

    }
})

window.addEventListener("load", () => {
    displayTop.focus()
})


//----------LISTEN TO ANY INPUT CHANGE-----------
document.addEventListener("keyup", (e => {
    if (e.key == "Enter") {

        e.preventDefault()
        runEquals()
        return
    }

    if (e.altKey && e.key === '-'||
        e.key === "AltGraph" && e.key === '-'
    ) {
        e.preventDefault();
        zoomout()
    }

    if (e.altKey && e.key === '='||
        e.altKey && e.key === '+' ||
        e.key === "AltGraph" && e.key === '='||
        e.key === "AltGraph" && e.key === '+') {
        e.preventDefault();
        zoomin()
    }

    runEveryEdit(e)
}))

btnsFrameMain.addEventListener('click', (e => {
    runEveryEdit(e)
}))
//-----------------------------------------------

//save the last caretposition when the input goed out of focus

zoomoutBtn = document.getElementById("zoomoutBtn")
zoominBtn = document.getElementById("zoominBtn")

let calculatorFrameZoom = 1

zoomoutBtn.addEventListener("mousedown" ,()=> zoomout())

zoominBtn.addEventListener("mousedown" ,()=> zoomin())

allBtns.forEach(button=>{
    button.addEventListener("mouseover", ()=>darkenOnHover(button))
    button.addEventListener("mousedown", ()=>addTempShadow(button))
})


pixel1.addEventListener("click", ()=> triggerColorChange(1))
pixel2.addEventListener("click", ()=> triggerColorChange(2))
pixel3.addEventListener("click", ()=> triggerColorChange(3))

resetColor.addEventListener("click", ()=> resetColors())


displayTop.addEventListener("blur", (e => {
    caretPosition = e.target.selectionStart
}))

nextCalcLogBtn.addEventListener("click", ()=>displayNextCalcLog())

previousCalcLogBtn.addEventListener("click", ()=> displayPreviousCalcLog())

calcLogHeader.addEventListener("click", () => switchCalcLogVisibility())

background()

function background (){
    body.style.backgroundImage="./desert.jpg"
}

//#endregion
//#endregion
//#region   > CSS variables
let root = document.querySelector(":root")

let themes = [
    {
        //0
        name: "Skyrim",
        background: './files/skyrim.png',
        btnsColor: "rgb(122, 221, 321)",
        specificColor: "rgb(060, 277, 100)",
        colorAns: false,
        imgOverBg: true,
        btnFrameColorChange: false,
        changeBlur: "5px"
    },
    {
        //1
        name: 'Forest 1',
        background: "url('./files/forest1.jpg')",
        btnsColor: "rgb(200, 200, 100)",
        specificColor: "rgb(100, 200, 200)",
        colorAns: true,
        btnFrameColorChange: true,
        changeBlur: "3px"
    },
    {
        //2
        name: 'Forest 2',
        background: "url('./files/forest2.jpg')",
        btnsColor: "rgb(99, 154, 142)",
        specificColor: "rgb(117, 162, 182)",
        colorAns: true,
        btnFrameColorChange: true
    },
    {
        //3
        name: 'Sea',
        background: "url('./files/sea.jpg')",
        btnsColor: "rgb(200, 200, 100)",
        specificColor: "rgb(100, 200, 200)",
        colorAns: true,
        btnFrameColorChange: true,
        changeBlur: "5px"
    },
    {
        //4
        name: 'Galaxy',
        background: "url('./files/galaxy.jpg')",
        btnsColor: "rgb(45, 25, 65)",
        specificColor: "rgb(138, 140, 145)",
        colorAns: false,
        btnFrameColorChange: true,
        changeBlur: "0px",
        calcFrameShadow: "rgb(184, 184, 184)"
    },
    {
        //5
        name: 'Desert',
        background: "url('./files/desert.png')",
        btnsColor: "rgb(342, 233, 123)",
        specificColor: "rgb(131, 140, 130)",
        colorAns: true,
        btnFrameColorChange: true,
        changeBlur: "10px",
    },
    {
        //6
        name: 'Flowers',
        background: "url('./files/flowers.jpg')",
        btnsColor: "rgb(200, 200, 100)",
        specificColor: "",
        colorAns: true,
        btnFrameColorChange: true,
        changeBlur: "8px"
    },
]

let currentTheme = 4
//Math.floor(Math.random()*(themes.length))
console.log(currentTheme)
applyTheme(currentTheme)

function updatePixels(){
    pixel1.style.backgroundColor = color1
    pixel2.style.backgroundColor = color2
    pixel3.style.backgroundColor = color3
}

function applyTheme (themeNumber) {
    let theme = themes[themeNumber]
    if (theme.imgOverBg){
        body.appendChild(img)
        img.setAttribute("id", "background-img")
        img.setAttribute("src", theme.background)

    } else {
        img.removeAttribute("src")
        root.style.setProperty('--background', theme.background)
    }
    if (theme.changeBlur){
        calculatorFrame.style.backdropFilter=`blur(${theme.changeBlur})`
    }
    btnFrameColorChange = theme.btnFrameColorChange
    if (theme.calcFrameShadow){
        calculatorFrame.style.borderColor=theme.calcFrameShadow;
        calculatorFrame.style.boxShadow=`4px 4px 60px ${theme.calcFrameShadow}`;
        const btns = document.querySelectorAll('.btnFrame .btn')       
    if (theme.name == "Galaxy"){
        btns.forEach(btn => { 
            btn.style.boxShadow="0px 0px 2px grey"    
        });
    }
    } else {

        calculatorFrame.style.borderColor="";
        calculatorFrame.style.boxShadow="";
    }
    btnFrameColorChange = theme.btnFrameColorChange


    color1 = ""
    changeColors("", theme.btnsColor, theme.specificColor)
    updatePixels()
}

const themeSelection = document.getElementById(`themeSelection`)
for (i = themes.length-1; i >= 0; i--){
    const option = document.createElement("option")
    themeSelection.appendChild(option)
    option.textContent = themes[i].name
    option.value = i
}

themeSelection.addEventListener("change", (e)=> {
    currentTheme=e.target.value
    applyTheme(currentTheme)
})
