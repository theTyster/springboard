from random import random
class WordFinder:
    """
    Word Finder: finds random words from a dictionary.
    >>> wf = WordFinder("words.txt")
    3 words read

    >>> wf.random()

    >>> wf.random()

    >>> wf.random()

    >>> wf.random()
    """
    def __init__(self, file):
        self.file = file
        self.words = []

    def random(self, num_words=3):
        """
        Gets a set number of words randomly from the file.
        """

        self.words = []

        with open(self.file, 'r', encoding='utf8') as r:
            lines = r.readlines()
            num_lines = len(lines)

            self.words = [lines[int(random() * num_lines)] for i in range(num_words)]
            self.words = [word.strip('\n') for word in self.words]

        return f'{num_words} words read'
