I feel like the existence of this file is proof enough that I know this curriculum. But nevertheless:

# Steps
1. Create a folder called learn_git_again. `mkdir learn_git_again`
1. cd into the learn_git_again folder. `cd learn_git_again`
1. Create a file called third.txt. `touch third.txt`
1. Initialize an empty git repository. `git init`
1. Add third.txt to the staging area. `git add third.txt`
1. Commit with the message “adding third.txt”. `git commit -m “adding third.txt”`
1. Check out your commit with git log. `git log`
1. Create another file called fourth.txt. `touch fourth.txt`
1. Add fourth.txt to the staging area. `git add fourth.txt`
1. Commit with the message “adding fourth.txt” `git commit -m "adding fourth.txt"`
1. Remove the third.txt file `rm third.txt`
1. Add this change to the staging area `git add third.txt`
1. Commit with the message “removing third.txt” `git commit -m "removing third.txt"`
1. Check out your commits using git log `git log`
1. Change your global setting to core.pager=cat - you can read more about that in the link:(https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration). `git config --global core.pager “cat”`
1. Write the command to list all of the global configurations for git on your machine. You can type git config --global to find out how to do this `git config --global --list`
