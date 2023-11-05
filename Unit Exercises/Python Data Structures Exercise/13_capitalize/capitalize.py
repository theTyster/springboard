def capitalize(phrase):
    """Capitalize first letter of first word of phrase.

        >>> capitalize('python')
        'Python'

        >>> capitalize('only first word')
        'Only first word'
    """

    phrase = phrase.split(" ")

    phrase[0] = phrase[0].capitalize()

    phrase = " ".join(phrase)

    return phrase
