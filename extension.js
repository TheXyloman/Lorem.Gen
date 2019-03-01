// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "loremgen" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.loremgen', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		let editor = vscode.window.activeTextEditor;
		if (!editor) return;
		let res = editor.document.getText().match(/lorem.gen\d+/);

	

		
        let errorArr = [];
        editor.edit(function (builder) {
            res.map(function (value) {
				var num = value.match(/\d+/);	
				var loremIpsum = require('lorem-ipsum')
  				, output = loremIpsum({
				    count: num                   // Number of words, sentences, or paragraphs to generate.
				  , units: 'paragraphs'            // Generate words, sentences, or paragraphs.
				  , sentenceLowerBound: 5         // Minimum words per sentence.
				  , sentenceUpperBound: 15        // Maximum words per sentence.
				  , paragraphLowerBound: 3        // Minimum sentences per paragraph.
				  , paragraphUpperBound: 7        // Maximum sentences per paragraph.
				  , format: 'plain'               // Plain text or html
				});

                let text = editor.document.getText();
                let prop = value.replace(value, output); //key
                let start = editor.document.positionAt(text.indexOf(value));
                let end = editor.document.positionAt(text.indexOf(value) + value.length);
                let range = new vscode.Range(start, end);
                try {
                    builder.replace(range,prop);
                } catch (error) {
                    errorArr.push(prop);
                }
            })
        }).then(function (res) {
            console.log(res, errorArr);
        });
		

	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
