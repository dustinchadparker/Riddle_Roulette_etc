
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
