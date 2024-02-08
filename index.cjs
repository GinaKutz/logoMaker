const fs = require('fs');
const inquirer = require ('inquirer');
const { createSVG } = require('./lib/svgGenerator');

const shapes = ['circle', 'triangle', 'square'];

async function promptUser() {
    try {
        const userInput = await inquirer.prompt([
            {
                type: 'input',
                name: 'text',
                message: 'Enter up to three characters:',
                validate: value => value.length > 0 && value.length <= 3 ? true : 'Please enter up to three characters.'
            },
            {
                type: 'input',
                name: 'textColor',
                message: 'Enter text color (keyword or hexadecimal):',
                default: 'black'
            },
            {
                type: 'list',
                name: 'shape',
                message: 'Choose a shape:',
                choices: shapes
            },
            {
                type: 'input',
                name: 'shapeColor',
                message: 'Enter shape color (keyword or hexadecimal):',
                default: 'blue'
            }
        ]);

        return userInput;
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

async function generateLogo() {
    const userInput = await promptUser();
    const { text, textColor, shape, shapeColor } = userInput;
    
    const svgContent = createSVG(text, textColor, shape, shapeColor);
    fs.writeFile('logo.svg', svgContent, err => {
        if (err) {
            console.error('Error writing SVG file:', err);
        } else {
            console.log('Generated logo.svg');
        }
    });
}

generateLogo();
