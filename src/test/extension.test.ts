import * as vscode from 'vscode';
import * as kotlinExt from '../extension';
// import * as compliance from '../compliance';
// import * as commands from '../commands';
// import * as file_generator from '../file_generator';
// import * as preferences from '../preferences';
// import * as template_interpreter from '../template_interpreter';
// import * as path from "path";
// import * as fs from 'fs';

//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function () {

    // Defines a Mocha unit test
    test("Something 1", function() {
        if (typeof vscode.workspace.workspaceFolders === 'undefined') {
			console.log("Not a valid workspace");
            assert.equal(1, 0);
            return;
        }
        var uri = vscode.Uri.parse(vscode.workspace.workspaceFolders[0].uri.path.replace("/out/test", "/testing-workspace/workspace"));
        kotlinExt.setWorkspaceFolderFsPath(uri.fsPath);
        kotlinExt.setWorkspaceFolderPath(uri.path);

        console.log("Path: " + kotlinExt.getWorkspaceFolderPath());
        console.log("FsPath: " + kotlinExt.getWorkspaceFolderFsPath());

        assert.equal(1, 1);
    });
});