const _ = require("lodash")

const holidays = [
    {name: "Christmas", date: new Date("2025-12-25")},
    {name: "Canada Day", date: new Date("2025-07-01")},
    {name: "Aprils Fools", date: new Date("2025-04-01")},
]

let today = new Date();
holidays.forEach(holiday =>{
    let dateDifference = holiday.date - today
    let days = Math.ceil((dateDifference/(1000 *60 *60 *24)))
    console.log(days);
})

console.log(_.sample(holidays))
console.log(_.findIndex(holidays, {name: "Canada Day"}));
console.log(_.findIndex(holidays, {name: "Aprils Fools"}));
console.log(_.findIndex(holidays, {name: "Christmas"}));