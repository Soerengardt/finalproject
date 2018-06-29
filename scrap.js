[
    {
        user_id: 1,
        answer: 5,
        diff: 0
    },
    {
        user_id: 20,
        answer: 2,
        diff: 3
    }
]

rows.forEach(item => {
    item.diff = Math.abs(item.answer - userAnswer)
})

sortby...

// var obj = {};
//
// relevantAnswer.forEach(function(a) {
//     obj[a.id] = a.diff;
// });
// relevantAnswer2.forEach(function(a) {
//     obj[a.id] += a.diff;
// });
// relevantAnswer3.forEach(function(a) {
//     obj[a.id] += a.diff;
// });
