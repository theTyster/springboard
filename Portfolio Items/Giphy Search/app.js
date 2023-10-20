"use strict";
$("form").on("submit", async function (e) {
  e.preventDefault();
  const query = $("input").val();
  let request = await axios
    .get(
      `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`,
    )
    .catch(async () => {
      $(
        "<p class='error'> There was an error. Please, try again. </p>",
      ).appendTo("h1");
      await new Promise((r) => setTimeout(() => r(), 4000)); // custom sleep function
      $("p.error").remove();
    });
  console.log(request);
  request = request.data.data;
  request.map((e) =>
    $("div.container.gifs").append(
      `<img class="gif" alt="${e.title}"src=${e.images.fixed_height.url} type="gif">`,
    ),
  );
});

$(".remove-gif").on("click", () => $(".gif").remove());
