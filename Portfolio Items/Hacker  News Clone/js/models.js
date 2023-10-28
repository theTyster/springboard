"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

/******************************************************************************
 * Story: a single story in the system
 */

class Story {

  /** Make instance of Story from data object about story:
   *   - {title, author, url, username, storyId, createdAt}
   */

  constructor({ storyId, title, author, url, username, createdAt }) {
    this.storyId = storyId;
    this.title = title;
    this.author = author;
    this.url = url;
    this.username = username;
    this.createdAt = createdAt;
  }

  /** Parses hostname out of URL and returns it. */

  getHostName() {
    //It works. Trust me.
    return this.url.match(/(\w+\.\w+)(:\w+)?(?=(\/)|$)/i)[0];
  }
}


/******************************************************************************
 * List of Story instances: used by UI to show story lists in DOM.
 */

class StoryList {
  constructor(stories) {
    this.stories = stories;
  }

  /** Generate a new StoryList. It:
   *
   *  - calls the API
   *  - builds an array of Story instances
   *  - makes a single StoryList instance out of that
   *  - returns the StoryList instance.
   */

  static async getStories() {

    // query the /stories endpoint (no auth required)
    const response = await axios({
      url: `${BASE_URL}/stories`,
      method: "GET",
    });

    // turn plain old story objects from API into instances of Story class
    const stories = response.data.stories.map(story => new Story(story));

    // build an instance of our own class using the new array of stories
    return new StoryList(stories);
  }

  /** get one SINGULAR story from API using a story ID */

  static async getStory(id){
    return axios({
      url: `${BASE_URL}/stories/${id}`,
      method: 'get',
    })
  }

  /** Adds story data to API, makes a Story instance, adds it to story list.
   * - user - the current instance of User who will post the story
   * - obj of {title, author, url}
   *
   * Returns the new Story instance
   */

  static async addStory( user, {author, title, url}) {
    const token = user.loginToken;

    const config = {
      url: `${BASE_URL}/stories`,
      method: 'post',
      data: {token,
      story: {author, title, url},
      }
    }

    const response = await axios(config);
    const addedStory = new Story(response.data.story);


    storyList.stories.unshift(addedStory);
    user.ownStories.unshift(addedStory);

    return addedStory;
  }

  /** Sends story data to API for deletion, makes a Story instance, removes it from the story list.
   * - user - the current instance of User who will delete the story.
   * - id - the id of the story for deletion.
   *
   * Returns the new Story instance
   */

  static async delStory(user, id){
    const token = user.loginToken;

    const config = {
      url: `${BASE_URL}/stories/${id}`,
      method: 'delete',
      data: {token},
    }

    const response = await axios(config);
    const removedStory = new Story(response.data.story);

    storyList.stories = storyList.stories.filter(e=> e.storyId !== id);
    user.ownStories = user.ownStories.filter(e=> e.storyId !== id);

    return removedStory;
  }
}


/******************************************************************************
 * User: a user in the system (only used to represent the current user)
 */

class User {
  /** Make user instance from obj of user data and a token:
   *   - {username, name, createdAt, favorites[], ownStories[]}
   *   - token
   */

  constructor({
                username,
                name,
                createdAt,
                favorites = [],
                ownStories = []
              },
              token) {
    this.username = username;
    this.name = name;
    this.createdAt = createdAt;

    // instantiate Story instances for the user's favorites and ownStories
    this.favorites = favorites.map(s => new Story(s));
    this.ownStories = ownStories.map(s => new Story(s));

    // store the login token on the user so it's easy to find for API calls.
    this.loginToken = token;
  }

  /** Register new user in API, make User instance & return it.
   *
   * - username: a new username
   * - password: a new password
   * - name: the user's full name
   */

  static async signup(username, password, name) {
    const response = await axios({
      url: `${BASE_URL}/signup`,
      method: "POST",
      data: { user: { username, password, name } },
    });

    let { user } = response.data

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }

  /** Login in user with API, make User instance & return it.

   * - username: an existing user's username
   * - password: an existing user's password
   */

  static async login(username, password) {
    const response = await axios({
      url: `${BASE_URL}/login`,
      method: "POST",
      data: { user: { username, password } },
    });

    let { user } = response.data;

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }

  /** When we already have credentials (token & username) for a user,
   *   we can log them in automatically. This function does that.
   */

  static async loginViaStoredCredentials(token, username) {
    try {
      const response = await axios({
        url: `${BASE_URL}/users/${username}`,
        method: "GET",
        params: { token },
      });

      let { user } = response.data;

      return new User(
        {
          username: user.username,
          name: user.name,
          createdAt: user.createdAt,
          favorites: user.favorites,
          ownStories: user.stories
        },
        token
      );
    } catch (err) {
      console.error("loginViaStoredCredentials failed", err);
      return null;
    }
  }

  /** Get/set/delete favorited stories of a user.
   *  -method: string specifying the API method.
   *  -user: User Object.
   *  -storyid: string of the story id.
   */

  static async doFavorite(method, user, storyid){
    const username = user.username;
    const token = user.loginToken;
    return axios({
      url: `${BASE_URL}/users/${username}/favorites/${storyid}`,
      method: method,
      data:{
        token,
        },
    });
  }
}
