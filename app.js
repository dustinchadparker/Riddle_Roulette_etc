// PRISONER CODE FOR PRISONER RIDDLE

$("#prisoner-button").click(function () {
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

  console.log(36 / 2 * 3 + 4);

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

$(function () {
  $("#prisoner-solution").popover({
    container: "body",
    offset: -100,
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

$("#tickets-button").click(function () {
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
$(".mouse").click(function () {
  mouseDis = mouseDis - 0.1;
  $(".mouse").fadeTo("fast", mouseDis);
});

//MONTY STUFF

$(function () {
  $("#monty-solution").popover({
    container: "body",
    offset: -100,
    content:
      "A lot of people have trouble with the better odds of switching doors. Myself included, until I realized a simple fact: the odds are better if you switch because Monty curates the remaining choices. Let’s say you played the game where Monty doesn’t know the location of the car. It wouldn’t make any difference if you switch or not (your odds would be 50% no matter what). But this isn’t what happens. The Monty Hall problem has a very specific clause: Monty knows where the car is. He never chooses the door with the car. And by curating the remaining doors for you, he raises the odds that switching is always a good bet. Another of the reasons some people can’t wrap their head around the Monty Hall problem is the small numbers. Let’s look at the exact same problem with 100 doors instead of 3. You pick a random door. Instead of one door, Monty eliminates 98 doors.These are doors that he knows do not have the prize! This leaves two doors. The one you picked, and one that was left after Monty eliminated the others. Monty Hall Problem: Solution Explained Simply Contents (Click to skip to that section): What is the Monty Hall Problem? A More Intuitive Way to Look at the Monty Hall Problem Why Does Switching Work? 1975 Version of The Monty Hall Problem The Media Furor Using Bayes’ Theorem to Solve the Monty Hall Problem What is the Monty Hall Problem? The Monty Hall problem is a probability puzzle named after Monty Hall, the original host of the TV show Let’s Make a Deal. It’s a famous paradox that has a solution that is so absurd, most people refuse to believe it’s true. monty hall problem Suppose you’re on a game show, and you’re given the choice of three doors: Behind one door is a car; behind the others, goats. You pick a door, say No. 1, and the host, who knows what’s behind the doors, opens another door, say No. 3, which has a goat. He then says to you, “Do you want to pick door No. 2?” Is it to your advantage to switch your choice? ~ (From Parade magazine’s Ask Marilyn column) Should you Switch? Believe it or not, it’s actually to your benefit to switch: If you switch, you have roughly a 2/3 chance of winning the car. If you stick to your original choice you have roughly a 1/3 chance of winning the car. The answer sounds unlikely. After door 3 is opened, you would think that you then have two doors to choose from…both with the same odds. However, you are actually much more likely to win if you switch. Those who switched doors won about 2/3 of the time Those who didn’t switch won about 1/3 of the time This fact has been proved over and over again with a plethora of mathematical simulations. If you’re stumped and still don’t believe it — don’t worry, even mathematicians scratch their head on this one. One genius mathematician, Paul Erdős didn’t believe the answer was right until he was shown simulations of the winning, “switch”, strategy. Back to Top A More Intuitive Way to Look at the Monty Hall Problem A lot of people have trouble with the better odds of switching doors. Myself included, until I realized a simple fact: the odds are better if you switch because Monty curates the remaining choices. Let’s say you played the game where Monty doesn’t know the location of the car. It wouldn’t make any difference if you switch or not (your odds would be 50% no matter what). But this isn’t what happens. The Monty Hall problem has a very specific clause: Monty knows where the car is. He never chooses the door with the car. And by curating the remaining doors for you, he raises the odds that switching is always a good bet. Another of the reasons some people can’t wrap their head around the Monty Hall problem is the small numbers. Let’s look at the exact same problem with 100 doors instead of 3. You pick a random door. monty hall problem 100 doors Instead of one door, Monty eliminates 98 doors.These are doors that he knows do not have the prize! This leaves two doors. The one you picked, and one that was left after Monty eliminated the others. monty hall problem 100 doors 2 Do you switch doors now? You should. When you first picked, you only had a 1/100 chance of getting the right door. Furthermore, it was sheer guesswork. Now you’re being presented with a filtered choice, curated by Monty Hall himself. It should be clear that now your odds are much better if you switch."
  });
});

//MONTY HALL STARTS HERE
$("#monty-button").click(function () {
  let gamesWon = 0;

  let totalGames = $("#goat-games-count").val();
  for (let games = 0; games < totalGames; games++) {
    let goatCount = $("#goat-count").val();
    let arrayOfDoors = [];

    goatCount = parseFloat(goatCount);
    totalGames = parseFloat(totalGames);

    if (goatCount && totalGames) {
    } else {
      alert("Must specify a valid number.");
    }
    let randomDoor = Math.floor(Math.random() * (goatCount + 1));

    for (let i = 0; i < goatCount + 1; i++) {
      //adds a 1 (goat) to the array for every goat
      arrayOfDoors.push(1);
    }
    //adds a car to the array
    randomDoor = Math.floor(Math.random() * (goatCount + 1));
    arrayOfDoors[randomDoor] = 0;

    //picks a door for you (your chosen door)

    randomDoor = Math.floor(Math.random() * (goatCount + 1));
    let chosenDoor = randomDoor;

    //host removes the rest of the goats in array
    while (arrayOfDoors.length > 2) {
      randomDoor = Math.floor(Math.random() * (goatCount + 1));

      if (arrayOfDoors[randomDoor] == 1 && randomDoor != chosenDoor) {
        arrayOfDoors.splice(randomDoor, 1);
        goatCount--;
        if (randomDoor < chosenDoor) {
          chosenDoor--;
        }
      }
    }

    //if the door you chose was a winner then you lose
    //(because you are supposed to switch)
    if (arrayOfDoors[chosenDoor] == 1) {
      gamesWon++;
    }
  }

  $("#goat-result-count").val((gamesWon / totalGames) * 100 + "%");
});

//MATT STARTS HERE
$("#matt-button").click(function () {
  let overGold = 0;
  let numRolls = $("#matt-rolls").val();
  let minBet = $("#matt-min").val();
  let maxBet = $("#matt-max").val();
  let golds = parseInt($("#matt-monies").val());
  let lossBypass = false;
  let totalGold = 0;
  let totalSpent = 0;
  let strat = $(".custom-select").val();
  let totalGames = 0;
  let wonGames = 0;
  let sessions = parseInt($("#matt-sessions").val());

  let currentSession = 0;

  let details = "\nStarting at " + golds + "g ---";
  if (golds == 0) {
    lossBypass = true;
  }

  if (maxBet == -1) {
    maxBet = 200;

    while (maxBet <= 5000) {

      currentSession = 0;

      while (currentSession < sessions) {


        let gold = golds;
        let gameOver = false;
        let bet = parseInt(minBet);
        let lossGold = 0;
        let detailBet = 0;
        let currentRoll = 0;

        while (currentRoll < numRolls && gameOver == false) {

          let rand = Math.floor(Math.random() * 100);
          rand++;

          totalSpent += bet;

          detailBet = bet;
          //LOSE ON 1-61
          if (rand < 61) {

            //ADD UP LOSS GOLD 
            lossGold += bet;
            gold -= bet;

            if (strat == 1) {
              bet = parseInt(minBet);
            }
            else if (strat == 2) {
              bet = bet * 2;
            } else if (strat == 3) {
              bet = lossGold * 2;
            } else if (strat == 4) {
              bet = lossGold * 1.05;
            }

            //Current bet can't be more than max
            if (bet > maxBet) {
              bet = maxBet;
            }

            if (gold <= 0 && lossBypass != true) {
              //WENT BUST; GAME OVER
              bet = 0;
              gameOver = true;
            }
          } else if (rand >= 61 && rand <= 94) {
            gold += bet * 1;
            bet = parseInt(minBet);
            lossGold = 0;
          } else if (rand >= 95 && rand <= 99) {
            gold += bet * 2;
            bet = parseInt(minBet);
            lossGold = 0;
          } else if (rand == 100) {
            gold += bet * 3;
            bet = parseInt(minBet);
            lossGold = 0;
          }

          currentRoll++;

        }

        totalGold += gold;
        totalGames++;
        console.log(wonGames + "" + totalGames);
        if (gold > 0) {
          wonGames++;
        }
        if (gold > golds) {
          overGold++;
        }

        currentSession++;
      }

      details += ("\n" + maxBet + "g Max Bet @" + sessions + " sessions = " + ((wonGames / totalGames) * 100).toFixed(2) + "% win rate and a " + ((overGold / totalGames) * 100).toFixed(2) + "% to come out over your starting gold.");
      console.log(details);


      totalGames = 0;
      wonGames = 0;
      overGold = 0;



      maxBet += 200;
    }

    $("#matt-solution").text(details);





    /**********IF INCREMENTAL IS NOT ON ********/
  } else while (currentSession < sessions) {

    let gold = golds;
    let gameOver = false;
    let bet = parseInt(minBet);
    let lossGold = 0;
    let detailBet = 0;
    let currentRoll = 0;

    while (currentRoll < numRolls && gameOver == false) {

      let rand = Math.floor(Math.random() * 100);
      rand++;

      totalSpent += bet;

      detailBet = bet;
      //LOSE ON 1-61
      if (rand < 61) {

        //ADD UP LOSS GOLD 
        lossGold += bet;
        gold -= bet;

        if (strat == 1) {
          bet = parseInt(minBet);
        }
        else if (strat == 2) {
          bet = bet * 2;
        } else if (strat == 3) {
          bet = lossGold * 2;
        } else if (strat == 4) {
          bet = lossGold * 1.05;
        }

        //Current bet can't be more than max
        if (bet > maxBet) {
          bet = maxBet;
        }

        if (gold <= 0 && lossBypass != true) {
          //WENT BUST; GAME OVER
          bet = 0;
          gameOver = true;
          details += "\n BUSTED!"
        }
      } else if (rand >= 61 && rand <= 94) {
        gold += bet * 1;
        bet = parseInt(minBet);
        lossGold = 0;
      } else if (rand >= 95 && rand <= 99) {
        gold += bet * 2;
        bet = parseInt(minBet);
        lossGold = 0;
      } else if (rand == 100) {
        gold += bet * 3;
        bet = parseInt(minBet);
        lossGold = 0;
      }


      details += ("\n Roll " + currentRoll + ": rolled a " + rand + " for " + parseInt(detailBet).toFixed(2) + "g, now at " + gold.toFixed(2) + " gold.");
      currentRoll++;

    }

    totalGold += gold;
    totalGames++;
    if (gold > 0) {
      wonGames++;
    }

    if (gold > golds) {
      overGold++;
    }
    $("#matt-solution").text(details);

    currentSession++;
  }

  $("#monies-average").val("\n" + maxBet + "g Max Bet @" + sessions + " sessions = " + ((wonGames / totalGames) * 100).toFixed(2) + "% win rate and a " + ((overGold / totalGames) * 100).toFixed(2) + "% to come out over your starting gold.");
  console.log(details);
  console.log("\n" + maxBet + "g Max Bet = " + ((wonGames / totalGames) * 100).toFixed(2) + "% win rate and a " + ((overGold / totalGames) * 100).toFixed(2) + "% to come out over your starting gold.");

  $("#monies-remain").val(totalGold.toFixed(2) + "g after " + sessions + " total sessions of " + numRolls + " max rolls@ " + minBet + "g each.");
}); 
