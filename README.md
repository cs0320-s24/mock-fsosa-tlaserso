> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details

This project largely is all stored in the REPLInput class, where the main logic occurs. A map from string to REPLFunction is used to store commands, and the commands either change variables inside of REPLInput (such as Mode or Path) or make calls to the mocked backend class. This class acts as the backend, responding to view and search calls. The REPLHistory class handles the output, printing differently based on the mode of the output and also whether the data to show is a string or a 2d array. If it is a 2d array, it converts the array into an html table before displaying it.

# Design Choices

We chose to store history as a 2d array storing either strings or other 2d arrays so that we could use a single history array to store all of our ouputs. This allows us to retroactively change the history window based on switching between verbose and brief mode. We also convert the outputs into an html table if they are stored as a 2d array of strings (such as the outputs of view and search). To implement commands, we made a map from strings to REPLFunction within REPLInput that allows developers to add new commands by writing a function implementing REPLFunction then adding their function to the map with a string key (as shown in our examples). Our functions check the amount of arguments instead of leaving that responsibility to the back end.

# Errors/Bugs

There are no bugs that we know of.

# Tests

Felix wrote our testing class to verify the functionality of the front end. There are 66 tests. There are no unit tests because there was no need for them. The only functions that might need them are the mocked back end functions and those results were verified in the e2e testing.

# How to

Running the server, pressing the log in button allows the entry of commands. Load_File "path" stores the input path as the filepath, View prints the entire contents of the file at the path, if it exists, as an html table, Mode switches the output mode, and Search "column" "query" performs the search function. We only have a few mocked searches, which are viewable in mockedBackEnd. They simulate searching by column number, header name, and terms in multiple rows.

# Collaboration

We did not collaborate beyond each other.

_(state all of your sources of collaboration past your project partner. Please refer to the course's collaboration policy for any further questions.)_
