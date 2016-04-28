Test Application
=====================

This is a test application used to evaluate ease in TDD.

### To run the application :
 1. Fork the project
 2. Clone it
 3. Install node packages
 4. Install bower dependencies
 5. Run the webserver using **Gulp**
```
npm install
bower install
gulp
```

### To submit your work
#### 1 - Write tests

Write a test that describes what you want to build and add it to [tests/](tests/).

#### 2 - Write code & commit you changes

Make sure you follow the following style guides while writing both the tests and the code :
- [Javascript Style Guide](https://github.com/airbnb/javascript)
- [AngularJS Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)

Implement your feature and commit your changes.
Please write commit messages that clearly describe what changed and why. Another user should be able to grasp the content of commit, only by reading the associated message.

#### 3 - Push and submit a pull request

---
Your goal
===

When you access the application you should have an empty layout, containing a simple text input. Your goal is to transform that input into a **Google Places Autocompleted ** input with some custom behaviors.

First, add the [angular-google-maps](https://angular-ui.github.io/angular-google-maps/#!/) module to the application using Bower and Gulp, and use it to implement what is described below.

We want the input to have the following behavior :
- It uses the user's current location when available, to automatically fill the input with the user's city.
- If the user starts typing the name of a city, it should see suggestions from **Google Places Autocomplete API**