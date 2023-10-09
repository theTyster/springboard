# Part II

1. What does the man command do? Type in man rm. How do you scroll and get out?
man command opens the terminal manual.

to navigate in the manual you can use vim keybindings "hjkl" or your arrow keys. Or mouse if you are using a modern terminal.
You can also use the "/" to find word patterns.

2. Look at the man page for ls. What does the -l flag do? What does the -a flag do?
Per manual:
 -a, --all
				do not ignore entries starting with .
 -l     use a long listing format

3. How do you jump between words in the terminal?
You can use alt and then ⬅ or ➡ on your keyboard.

4. How do you get to the end of a line in terminal?
control ➡ or "end"

5. How do you move your cursor to the beginning in terminal?
control ⬅ or "home"

6. How do you delete a word (without pressing backspace multiple times) in terminal?
control "w"

7. What is the difference between a terminal and shell?
Terminal is what runs the shell. Shell is a scripting language based on POSIX that runs commands typically in a terminal or console.

8. What is an absolute path?
An absolute path is the complete path from root "/" to the designated directory or file. An absolute path will work regardless of your position in the directory or your PATH variable as long as the directories and files in the path exist.

9. What is a relative path?
usually start with "~" or ".". They are the paths relative to your terminals PATH variable. Or relative to your current position in the directory tree.

10. What is a flag? Give three examples of flags you have used.
flags are used to provide options to commands.
here are three I commonly use:
 - $COMMAND --help
 - rm -dr
 - mkdir -p

11. What do the r and f flags do with the rm command?
rm -rf would remove a directory recursively. similar to -dr
