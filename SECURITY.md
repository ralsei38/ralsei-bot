# Chamilo.py
for now credentials are written in clear in the .env file...
<br/>here are some ideas to improve the way credentials are managed.

## feeding credentials through CLI arguments
Passing credentials to the program at startup using CLI arguments.

probleme --> The program cannot be restarted easily, in case something goes wrong.<br/>

A solution could be to:
* create a user for this program
* make the program store the credentials into a new file readable & writable only by himself ?
So that if a restart is required, chamilo.py can grab credentials from the said file.