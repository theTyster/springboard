"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/* A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <input type="checkbox" class="favorite-box">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();

  $favoriteCheckboxes.on("change", addFavorite);
}

/** Takes user input and sends it to backend. */

async function submitStoriesToAPI(evt){
  console.debug("submit story", evt);
  evt.preventDefault();

  //grab title, url, and author
  const $title = $("#submit-title");
  const $url = $("#submit-url");
  const $author  = $("#submit-author");

  try{
    await StoryList.addStory(
    currentUser, {
      author: $author.val(), 
      title: $title.val(), 
      url: $url.val(),
    })
  }
  catch({name, message}){
    $submissionForm.after(`<p id='error-msg'>Unssuccesful Connection to database. Try Again. | Error: ${message} |`)
    setTimeout(()=> $("p#error-msg").remove(), 5000);
    return;
  }

  $submissionForm.trigger("reset");
  $submissionForm.hide();

  putStoriesOnPage();
}

$submissionForm.on("submit", submitStoriesToAPI);
