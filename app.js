const expenseChart = document.querySelector('.expense-chart');

let spent = []
fetch('data.json')
    .then(data => data.json())
    .then(data => {
        data.forEach(exp => {
            data = `<div class="day"><div class='expense-bar' data-value='${exp.amount}'><p class="amount-day text-white">$${exp.amount}</p></div><p>${exp.day}</p></div>`
            spent.push(data)
        });
        expenseChart.innerHTML = spent.join('');
        animateChart()
    })

function animateChart(){
    let expenses = expenseChart.querySelectorAll('.expense-bar');
    let max = 0;
    expenses.forEach(e => {
        let amount = parseFloat(e.getAttribute('data-value'))
        if(max < amount) max = amount;
    })
    setTimeout(_ => {
        setHeight(max,expenses)
    },1000)
}

function setHeight(high,arr) {
    let sum = []
    arr.forEach((a,i)=> {
        let amount = parseFloat(a.getAttribute('data-value'))
        // console.log(amount*50/45,Math.round(amount*100/high));
        a.style.height = `${Math.round(amount*200/high)}px`;
        a.style.transitionDelay = `${i*100}ms`;
        a.classList.add('active')
        if(amount === high) a.style.backgroundColor = 'var(--Cyan)'
        sum.push(amount);
    })
    console.log(sum.reduce((a,i) => a+i));
}