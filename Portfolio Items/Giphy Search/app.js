"use strict";
$("form").on("submit", async function (e) {
  e.preventDefault();
  const query = $("input").val();
  let request = await axios.get(
    `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`,
  );
  request = request.data.data;
  const gifs = request.map((e) =>
    $("div.container.gifs").append(
      `<img class="gif" alt="${e.title}"src=${e.images.fixed_height.url} type="gif">`,
    ),
  );
});

$(".remove-gif").on("click", () => $(".gif").remove());
