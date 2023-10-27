const loadGame = async () => {
  //RESET THE BOARD.
  $("table").off();
  $("table").css("display", "none");
  $("th").html("");
  $("td").off();
  $("td").css("background", "var(--dark-blue)");
  $("td").html("<strong>?</strong>");
  $("strong").css("display", "block");
  $("button").replaceWith("<button id='start-button'>Restart Game</button>");
  $("img.loading").css("display", "block");

  //API CALLS
  await axios
    .get("https://jservice.io/api/random")
    .then(async ({ ...data }) => {
      const id = data.data[0].game_id;
      return await axios.get(`https://jservice.io/api/clues?game_id=${id}`);
    })

    //JEOPARDY GAME FUNCTIONALITY
    .then(({ ...data }) => {
      $("img.loading").css("display", "none");
      $("table").css("display", "block");

      data = data.data;

      //DESTRUCTURE GAME DATA
      const board = data.reduce((acc1, cv1) => {
        acc1[cv1.category.title] = data.reduce((acc2, cv2) => {
          if (cv2.category.title === cv1.category.title) {
            let container = [];
            container.push(cv2.question);
            container.push(cv2.answer);
            acc2.push(container);
          }
          return acc2;
        }, []);
        return acc1;
      }, {});

      //The board Object is shaped like this:
      //board = {
      //	category: [[question, answer], ... *5],
      //  category: ... *6
      //}

      const categories = Array.from(Object.keys(board));

      //BUILD THE BOARD
      try {
        for (let i = 0; i < 6; i++) {
          $(`th.j-category${i}`).append(categories[i]);
          for (let ii = 0; ii < 5; ii++) {
            $(`td#j-${i}-${ii + 1}00`).append(
              `<div class="question">${board[categories[i]][ii][0]}</div>`,
            );
            $(`td#j-${i}-${ii + 1}00`).append(
              `<div class="answer"><i>${board[categories[i]][ii][1]}</i></div>`,
            );
          }
        }
      } catch ({ name, message }) {
        //IF BOARD IS INCOMPLETE, REBUILD IT
        if (
          name === "TypeError" &&
          (message === "board[categories[i]][ii] is undefined" ||
            message === "board[categories[i]] is undefined")
        )
          loadGame();
      }
    })
    .then(() => {
      //HANDLERS FOR THE GAME
      //IF A BOX IS CLICKED ON, SHOW THE NEXT VALUE IN THE BOX AND CHANGE THE BACKGROUND.
      //IF A CLUE IS ON THE BOARD DON'T ALLOW OTHER BOXES TO BE CLICKED.
      const gameClickHandler = function (event) {
        function showAnswer(event) {
          if (
            event.target.className === "question" &&
            event.target.style.display === "block"
          ) {
            event.target.style.display = "none";
            event.target.nextSibling.style.display = "block";
            event.target.parentElement.style.background = "var(--green)";
          } else if (
            event.target.tagName === "TD" &&
            event.target.children[0].style.display === "block"
          ) {
            event.target.children[0].style.display = "none";
            event.target.children[0].nextSibling.style.display = "block";
            event.target.children[0].parentElement.style.background =
              "var(--green)";
          }

          $("td").off();
          $("table").off().on("click", gameClickHandler);
        }

        if (event.target.tagName === "STRONG") {
          event.target.style.display = "none";
          event.target.nextSibling.style.display = "block";
          event.target.parentElement.style.background = "var(--light-blue)";
          $("table").off();
          $(event.target).parent().on("click", showAnswer);
        } else if (
          event.target.tagName === "TD" &&
          event.target.children[0].style.display === "block" &&
          event.target.innerText === "?"
        ) {
          event.target.children[1].style.display = "block";
          event.target.children[0].remove();
          event.target.style.background = "var(--light-blue)";
          $("table").off();
          $(event.target).on("click", showAnswer);
        }
      };

      $("table").on("click", gameClickHandler);
    });
};

$("div.game").on("click", "#start-button", loadGame);
