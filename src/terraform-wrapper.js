#!/usr/bin/env node
'use strict';

const { spawn } = require('child_process');
const { resolve } = require('path');

const execName = process.platform === 'win32' ? 'terraform.exe' : './terraform';
const command = resolve(__dirname, '..', 'tools', execName);
console.log(`Executing Terraform binary at ${command}...`);
const terraform = spawn(command, process.argv.slice(2), { cwd: process.cwd() });

terraform.stdout.pipe(process.stdout);
terraform.stderr.pipe(process.stderr);
terraform.on('error', function(err) {
  console.error(`Received an error while executing the Terraform binary: ${err}`);
  process.exit(1);
});
terraform.on('exit', function (code) {
  console.log(`Terraform exited with code ${code}`);
  process.exit(code);
});
