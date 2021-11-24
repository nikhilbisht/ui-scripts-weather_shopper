# ui-scripts-weather_shopper

### **Test-Case to Automate:**
1. Add and verify an item in Moisturizer on Checkout Page.

### Installation:
After cloning the project from the repository, make sure to run ``` npm install``` or ```npm i``` to install all the node_modules.

### Running Tests:
1. The command to run an individual test from Command Line is:

    ```npm test chrome```

    --browser refers to the browser where we want our tests to be executed. To run tests in any other browser, replace chrome with browser name, for eg, if tests to be run for           edge, use command ```npm test edge```

2. To run tests from UI, please follow the below-mentioned steps:

    a. Open cypress using command :  ```npx cypress open```
    
    b. Select the tests which you want to run

### Report:
Cypress reports will be generated under reports folder when tests are run using command line. 
