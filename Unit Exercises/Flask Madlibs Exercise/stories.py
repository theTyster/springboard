"""Madlibs Stories."""


class Story:
    """Madlibs story.

    To  make a story, pass a list of prompts, and the text
    of the template.

        >>> s = Story(["noun", "verb"],
        ...     "I love to {verb} a good {noun}.")

    To generate text from a story, pass in a dictionary-like thing
    of {prompt: answer, prompt:answer):

        >>> ans = {"verb": "eat", "noun": "mango"}
        >>> s.generate(ans)
        'I love to eat a good mango.'
    """

    def __init__(self, words, text):
        """Create story with words and template text."""

        self.prompts = words
        self.template = text

    def generate(self, answers):
        """Substitute answers into text."""

        text = self.template

        for (key, val) in answers.items():
            text = text.replace("{" + key + "}", val)

        return text


# DEFAULT STORIES
fairy_tale = Story(
    ["place", "noun", "verb", "adjective", "plural noun"],
    """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural noun}."""
)
advertisement = Story(
    ['verb', 'verb', 'verb', 'adverb ending in -er', 'adverb ending in -er', 'adverb ending in -er', 'noun'],
    '''{verb} {adverb ending in -er}, {verb} {adverb ending in -er}, {verb} {adverb ending in -er}. \n
    The new sports energy drink "{noun} juice" has it all.'''
)

quest = Story(
    ['who', 'what', 'when', 'where'],
    '''In the dark recluses of a place known as "{where}" a small brave {what} is on a quest to save {who} from the forces of evil. There's only one problem. They can't remember {when}.'''
)

stories = {'Fairy Tale': fairy_tale, 'Advertisement': advertisement, 'Quest': quest}
