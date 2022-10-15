var userBday = document.querySelector("#bday-input");
var output = document.querySelector(".output");
var submitBday = document.querySelector("#check-btn");



function reverseStr(str) {
  var ListOfChars = str.split('');
  var reverseListOfChars = ListOfChars.reverse();
  var reversedStr = reverseListOfChars.join('');
  return reversedStr;
}


function isPalindrome(str) {
  var reverse = reverseStr(str);
  return str === reverse;
}

function convertDateStr(date) {
  var dateStr = { day: '', month: '', year: '' };
  if (date.day < 10) {
    dateStr.day = '0' + date.day;

  }
  else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = '0' + date.month;

  }
  else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDateFormats(date) {
  var dateStr = convertDateStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day
  var mmddyy = dateStr.day + dateStr.month + dateStr.year.slice(-2)
  var ddmmyy = dateStr.month + dateStr.day + dateStr.year.slice(-2)
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day

  return [ddmmyyyy, mmddyyyy, yyyymmdd, mmddyy, ddmmyy, yymmdd];
}

function checkPalindromeForAllFormats(date) {
  var listOfPalindromes = getAllDateFormats(date);

  var flag = false;

  for (var i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }

  }


  return flag;
}




function checkLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var dayInMonth = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];

  if (month === 2) {
    if (checkLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++
      }
    }
  } else {
    if (day > dayInMonth[month - 1]) {
      day = 1;
      month++
    }
    if (month > 12) {
      month = 1;
      year++;
    }
  }

  return { day: day, month: month, year: year }


}

function getNextPalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);

  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}


////////////////////

function getNextPalindromeDate(date) {
  var countDays = 0;

  var newDate = getNextDate(date);

  while (true) {
    countDays++
    if (checkPalindromeForAllFormats(newDate)) {
      break;
    }
    newDate = getNextDate(newDate);
  }
  return [countDays, newDate]
}

function getPrevDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var monthDates = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];

  if (month === 3) {
    if (checkLeapYear(year)) {
      if (day < 1) {
        day = 29;
        month--;
      }
    } else {
      if (day < 1) {
        day = 28;
        month--;
      }
    }
  } else {
    if (day < 1) {
      month--;
      day = Number(monthDates[month - 1]);
      if (month < 1) {
        month = 12;
        day = Number(monthDates[monthDates.length - 1]);
        year--;
      }
    }
  }
  return { day: day, month: month, year: year }
}

function getPrevPalindromeDate(date) {
  var countDays = 0

  var newDate = getPrevDate(date);

  while (true) {
    countDays++;
    if (checkPalindromeForAllFormats(newDate)) {
      break;
    }

    newDate = getPrevDate(newDate);
  }
  return [countDays, newDate];
}

function handlePalindromeClick() {
  var getuserBday = userBday.value;

  if (getuserBday) {
    var simplifyDate = getuserBday.split("-");

    prepareDate = {
      day: Number(simplifyDate[2]),
      month: Number(simplifyDate[1]),
      year: Number(simplifyDate[0])
    }

    var getPalindrome = checkPalindromeForAllFormats(prepareDate);

    if (getPalindrome) {
      output.innerText = "Hurray! Your birthday is a Palindrome date!"
    } else {
      var [nextCount, nextDate] = getNextPalindromeDate(prepareDate);
      var [prevCount, prevDate] = getPrevPalindromeDate(prepareDate);

      if (prevCount > nextCount) {
        output.innerText = `Patience mate, for the next Palindrome date, which is in ${nextCount} days on this special date: ${nextDate.day}/${nextDate.month}/${nextDate.year}`
      } else {
        output.innerText = `You missed it by ${prevCount} days, which was on this date: ${prevDate.day}/${prevDate.month}/${prevDate.year}`
      }
    }
  } else {
    output.innerText = "ENTER A DATE"
  }
}

submitBday.addEventListener("click", handlePalindromeClick);

