// Your code here
let createEmployeeRecord = function (row) {
    return {
        firstName : row[0],
        familyName : row[1],
        title : row[2],
        payPerHour : row[3],
        timeInEvents : [],
        timeOutEvents : []
    }
}

let createEmployeeRecords = function (employeeData){
    return employeeData.map((row)=>createEmployeeRecord(row));
}

let createTimeInEvent = function (employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    employee.timeInEvents.push({
        type : 'TimeIn',
        hour : parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function (employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    
    employee.timeOutEvents.push({
        type : 'TimeOut',
        hour : parseInt(hour, 10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function (employee, date) {
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === date
    })
    
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === date
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function (employee, date) {
    let wages = hoursWorkedOnDate(employee, date) * employee.payPerHour;
    return parseFloat(wages.toString())
}

let allWagesFor = function (employee) {
    let dayWorked = employee.timeInEvents.map(function(e){
        return e.date
    })
    let allWage = dayWorked.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return allWage
}

let calculatePayroll = function (arrayOfAllEmployee) {
    return arrayOfAllEmployee.reduce(function(memo,rec){
        return memo + allWagesFor(rec)
    }, 0)
}