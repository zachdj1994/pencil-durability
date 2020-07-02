##Pencil Simulator
This app is a simulation of a pencil. It writes and erases
text and can be sharpened when worn down.

#Technical considerations
This app runs from the command line using Node. All 
packages should be installed via node package manager prior
to running the app

#Installation
If node is installed, simply run npm install
If node is not installed, first download from 
https://nodejs.org/en/download/ and run the installer

#Running the app
There are 4 commands:
bin/pencil create --point 10 --erase 10
bin/pencil write 'sample text'
bin/pencil erase 'text to erase'
bin/pin edit 'text to insert'

#Running the tests
npx jasmine