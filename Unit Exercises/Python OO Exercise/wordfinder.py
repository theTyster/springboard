from random import random
class WordFinder:
    """
    Word Finder: finds random words from a dictionary.
    >>> wf = WordFinder("test_files/words.txt")

    >>> wf.getrandom()
    3 random words read
    
    >>> len(wf.random_words)
    3

    """


    def __init__(self, file):
        self.file = file
        self.words = []

        with open(self.file, 'r', encoding='utf8') as r:
            self.words = r.readlines()
            self.words = [word.strip('\n') for word in self.words]


    def getrandom(self, num_words=3):
        """
        Gets a set number of words randomly from the file.
        """
        random_words = []
        random_words = [self.words[int(random() * len(self.words))] for i in range(num_words)]

        return random_words

class SpecialWordFinder(WordFinder):
    """
    Ignores empty lines and lines that have been commented out.
    """
    def __init__(self, file):
        super().__init__(file)

        self.words = [word for word in self.words if word and word.find('#') == -1 ]
