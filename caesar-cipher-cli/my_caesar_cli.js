const fs = require('fs');
const path = require('path')
const { pipeline } = require('stream');
const { Command } = require('commander');
const Transform = require('./transformer.js');

const command = new Command();

command.storeOptionsAsProperties(true)
command
  .option('-s, --shift [shift]', 'shift', 0)
  .option('-i, --input [type]', 'input file', 'input.txt')
  .option('-o, --output [type]', 'output file', 'output.txt')
  .option('-a, --action [action]', 'encode or decode', 0);

let shift;
if (process.argv[process.argv.indexOf('-s') + 1] < 0) {
  shift = process.argv[process.argv.indexOf('-s') + 1];
  process.argv.splice(process.argv.indexOf('-s') + 1, 1);
  command.parse(process.argv);
} else {
  command.parse(process.argv);
  shift = command.shift;
}

if(!fs.existsSync(path.join(__dirname, command.input))){
  console.error(`file ${command.input} do not exist`);
  return;
}
if(!fs.existsSync(path.join(__dirname, command.output))){
  console.error(`file ${command.output} do not exist`);
  return;
} 

const input_stream_data = [path.join(__dirname, command.input)];
const transform_stream_data = [Number(shift), command.action];
const output_stream_data = path.join(__dirname, command.output);

const input_stream = fs.createReadStream(...input_stream_data);
const transform_stream = new Transform(...transform_stream_data);
const output_stream = fs.createWriteStream(output_stream_data, {flags: 'a+'});

pipeline(
  input_stream,
  transform_stream,
  output_stream,
  (err) => {
    if (!err) {
        console.log('Pipeline succeeded.');
    } else {
        console.error('Pipeline failed: ', err);
    }
  }
)
