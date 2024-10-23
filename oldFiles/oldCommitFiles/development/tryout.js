let result = "this was element 2, 3 and 4"

let object = [
    1,
    2,
    3,
    {
        name:  "element4",
        type: "object",

    },
    5, {
        name:  "element6",
        type: "object",

    },

]

console.log(object)

object.splice(1, 3, result)

console.log(object)