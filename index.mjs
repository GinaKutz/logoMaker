import inquirer from 'inquirer';

const generateSVG = (text, textColor, shape, shapeColor) => {
    // Generate SVG string based on user input
    const svg = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            <text x="10" y="30" fill="${textColor}">${text}</text>
            <rect x="50" y="50" width="100" height="100" fill="${shapeColor}" />
            <!-- Add more shapes based on user input -->
        </svg>
    `;
    return svg;
};

const saveSVGToFile = (svg) => {
    fs.writeFileSync('logo.svg', svg);
};

const promptUser = async () => {
    const userInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Enter up to three characters:'
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter the text color (keyword or hexadecimal):'
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape:',
            choices: ['circle', 'triangle', 'square']
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Enter the shape color (keyword or hexadecimal):'
        }
    ]);

    const { text, textColor, shape, shapeColor } = userInput;

    const svg = generateSVG(text, textColor, shape, shapeColor);
    saveSVGToFile(svg);

    console.log('Generated logo.svg');
};

promptUser();