// PRISONER CODE FOR PRISONER RIDDLE

$("#prisoner-button").click(function() {
  let prisonerRuns = $("#prisoner-runs").val();
  let longestDays = 0;
  let averageDays = 0;
  let shortestDays = 1234567;
  let prisoners = [];
  let dayCounter = 0;
  let counter = 0;
  let leaderChosen = false;
  let prisonersExist = true;
  let lightSwitch = false;

  while (counter < prisonerRuns) {
    leaderChosen = false;
    prisonersExist = true;
    lightSwitch = false;
    dayCounter = 0;
    prisoners = [];

    let x = 0;
    // sets all Prisoners to 1 (or, OFF)
    while (x < 100) {
      prisoners.push(1);
      x++;
    }

    while (prisonersExist == true || leaderChosen == false) {
      dayCounter++;
      let value = Math.floor(Math.random() * 100);
      // checks to see if leader is chosen

      if (value == 10) {
        leaderChosen = true;
      } else {
        leaderChosen = false;
      }

      // if light is off and prisoner hasn't been in, switch it ON
      if (lightSwitch == false && prisoners[value] == 1) {
        prisoners[value] = 0;
        lightSwitch = true;
      }

      // if light is on AND leader present, switch it OFF
      if (value == 10 && lightSwitch == true) {
        lightSwitch = false;
      }

      // Checks to see if all prisoners have been chosen

      prisonersExist = false;

      prisoners.forEach(i => {
        if (i == 1) {
          prisonersExist = true;
        }
      });
    }

    // sets the shortest and longest days (if applicable)
    if (dayCounter < shortestDays) {
      shortestDays = dayCounter;
    }

    if (dayCounter > longestDays) {
      longestDays = dayCounter;
    }
    // keeps a running count of the number of days for the average
    averageDays += dayCounter;

    counter++;
  }

  // calculates the time taken and outputs it to the console
  averageDays = averageDays / prisonerRuns;

  remainder = averageDays % 365;
  years = averageDays / 365;

  $("#average-escape").val(
    Math.floor(years) + " years and " + Math.floor(remainder) + " days."
  );
  $("#longest-escape").val(
    Math.floor(longestDays / 365) +
      " years and " +
      (longestDays % 365) +
      " days."
  );
  $("#quickest-escape").val(
    Math.floor(shortestDays / 365) +
      " years and " +
      (shortestDays % 365) +
      " days."
  );
});

$(function() {
  $(".btn-danger").popover({
    container: "body",
    content:
      "At the beginning, the prisoners select a leader. Whenever a person (with the exception of the leader) comes into a room, he turns the lights on (but he does this only once). If the lights are already on, he does nothing. When the leader goes into the room, he turns off the lights. When he will have turned off the lights 99 times, he is 100% sure that everyone has been in the room."
  });
});

//LOTTERY STUFF!!!!!!!!!!!!!!!!!

ticketCreation = () => {
  let ticketArray = [];
  let randomNum = 0;

  while (ticketArray.length < 5) {
    randomNum = Math.floor(Math.random() * 69);
    if (ticketArray.some(i => i == randomNum)) {
      //if number is already in array
    } else {
      ticketArray.push(randomNum);
    }
  }

  return ticketArray;
};

$("#tickets-button").click(function() {
  let ticketsPurchasedAtOnce = $("#lottery-tickets").val();
  let winner = false;
  let arrayWinsWithP = [0, 0, 0, 0, 0, 0];
  let arrayWinsNoP = [0, 0, 0, 0, 0];
  let winningTicketsGenerated = 0;
  let totalTicketCounter = 0;

  while (winner == false) {
    let ticketCounter = 0;

    let winningTicket = ticketCreation();
    let winningTicketP = (randomNum = Math.floor(Math.random() * 26));
    winningTicketsGenerated++;

    while (ticketCounter < ticketsPurchasedAtOnce && winner == false) {
      let numberMatches = 0;
      ticketCounter++;
      totalTicketCounter++;
      let boughtTicket = ticketCreation();
      let boughtTicketP = (randomNum = Math.floor(Math.random() * 26));

      if (boughtTicketP == winningTicketP) {
        //if powerball nums match
        arrayWinsWithP[5]++; //increment to show powerball win

        boughtTicket.map(i => {
          if (winningTicket.includes(i)) {
            numberMatches++;
          }
        });

        arrayWinsWithP[numberMatches - 1]++; //increment for results at winning numbers
        if (numberMatches == 5) {
          winner = true;
        }
      } else {
        //if powerball doesn't match
        boughtTicket.map(i => {
          if (winningTicket.includes(i)) {
            numberMatches++;
          }
          arrayWinsNoP[numberMatches - 1]++; //increment for results at winning numbers
        });
      }
    }
  }

  $("#lottery-jackpot-count").val(arrayWinsWithP[4]);
  $("#lottery-5-count").val(arrayWinsNoP[4]);
  $("#lottery-4p-count").val(arrayWinsWithP[3]);
  $("#lottery-4-count").val(arrayWinsNoP[3]);
  $("#lottery-3p-count").val(arrayWinsWithP[2]);
  $("#lottery-3-count").val(arrayWinsNoP[2]);
  $("#lottery-2p-count").val(arrayWinsWithP[1]);
  $("#lottery-1p-count").val(arrayWinsWithP[0]);
  $("#lottery-p-count").val(
    arrayWinsWithP[5] -
      arrayWinsWithP[3] -
      arrayWinsWithP[2] -
      arrayWinsWithP[1] -
      arrayWinsWithP[0]
  );

  let totalWinnings =
    $("#lottery-p-count").val() * 4 +
    $("#lottery-1p-count").val() * 4 +
    $("#lottery-2p-count").val() * 7 +
    $("#lottery-3-count").val() * 7 +
    $("#lottery-3p-count").val() * 100 +
    $("#lottery-4-count").val() * 100 +
    $("#lottery-4p-count").val() * 50000 +
    $("#lottery-5-count").val() * 1000000;

  $("#lottery-details").val(
    "You bought " +
      totalTicketCounter +
      " tickets, went through " +
      winningTicketsGenerated +
      " different drawings, totalling $" +
      totalTicketCounter * 2 +
      " - with a total winnings of $" +
      totalWinnings +
      " (not including the grand prize)"
  );
});

//mouse disappears slowly on click
let mouseDis = 1.0;
$('.mouse').click(function () {
    mouseDis = mouseDis - 0.1;
    $('.mouse').fadeTo("fast", mouseDis);
})
