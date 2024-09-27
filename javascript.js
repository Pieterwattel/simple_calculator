/*
===========
>>>INDEX<<<
===========

> Variable Declarations
    >> Node Declarations		
        >>> Numbers
        >>> Operators
        >>> Functional
    >> Other Global Variables
> Functions
    >> Utility Functions
    >> Controller Functions
> Dom Generation
    >> Node Creation
    >> Listeners
*/

//#region   > Variable Declarations
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

//btnFrameOperator.style.backgroundColor= "rebeccapurple";


//#endregion	
//#region           >>> Numbers
const numBtns = {}
for (let i = 9; i >= 0; i--){
    numBtns[i] = document.getElementById(`btn${i}`);
}
//#endregion
//#region           >>> Operators

let operatorObject = [
    {
    id: 'btnAdd' ,
    sign: '+' ,   
    },
    {
    id: 'btnSubtract' ,
    sign: '-',   
    } ,
    {
    id: 'btnMultiply' ,
    sign: '*',   
    } ,
    {
    id: 'btnDivide' ,
    sign: '/',   
    } ,
]

operatorObject.forEach ((prop) => {
    let btn = document.createElement("button")
    btnFrameOperator.appendChild(btn)
    btn.setAttribute("id" , prop.id)
    btn.classList.add("btn")
    btn.textContent = prop.sign
})


// empty operator, for later additions
/*
    {
    name: '' ,
    id: '' ,
    value: '',   
    } ,
*/

//#endregion
//#region           >>> Other Buttons

let otherBtns = [
    {
    id: 'btnEquals' ,
    sign: '=' ,   
    },
    {
    id: 'btnAns' ,
    sign: 'Ans',   
    } ,
    {
    id: 'btnClear' ,
    sign: 'C',   
    } ,
    {
    id: 'btnClearEntry' ,
    sign: 'CE',   
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
//#region       >> Global Variables

// variables that hold calculation data:
let num1 = ""
let num2 = ""
let operator = ""
let ans = ""

let currentNum = num1

numSwitchFlag = true

let testVar = num1 + operator + num2


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


function getNum (e){
    return e.target.id.replace('btn', "")
}

function concatCurrentNum (num){
    currentNum = currentNum.concat(num)
}

function switchCurrentNum (){
    if (numSwitchFlag == true){
        currentNum = num2
        numSwitchFlag = false
    } else if (numSwitchFlag == false){
        currentNum = num1
        numSwitchFlag = true
    }
}

function updateNum () {
    if (numSwitchFlag == true){
        num1 = currentNum
    } else if (numSwitchFlag == false){
        num2 = currentNum
    }
}

function updateDisplay (){
    updateNum()
    console.log (num1 + " " + operator + " " + num2)
}


//#endregion
//#region       >> Controller Functions
function operatorPress (e) {
    console.log(getId(e))
    switchCurrentNum();
    updateDisplay ();
}

function numberPress (e) {
    let newNum = getNum(e);
    concatCurrentNum (newNum);
    updateDisplay ();
}

function functionPress () {
    updateDisplay ();
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

//#endregion
//#endregion