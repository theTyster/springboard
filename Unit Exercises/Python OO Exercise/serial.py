"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.

    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self, start=0):
        self.initial = start
        self.current = start

    def generate(self):
        """
        Generates the next sequential number.
        """
        self.current += 1
        return  self.current -1

    def reset(self):
        """
        Resets the number back to its start value.
        """
        self.current = self.initial
