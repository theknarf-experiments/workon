#!/usr/bin/env node

const program = require('commander');
const { exec } = require("child_process");

program
	.version('0.0.1', '-v, --version')

program
	.command('begin [task]')
	.description('Start to work on a task')
	.action((task) => {
		if(!task) {
			console.log("You have to give the task parameter");
			return;
		}

		exec(`git checkout -b feature/${task}`);
	});

program
	.command('end')
	.description('End working on a task')
	.action(() => {
		exec(`git checkout master`);
		exec(`git pull`);
	});

program.parse(process.argv);

const NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
	program.help();
}
