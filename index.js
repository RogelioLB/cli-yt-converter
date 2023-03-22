#!/usr/bin/env node
const { Command } = require('commander')
const packageJson = require('./package.json')
const program = new Command()
const path = require('path')
const fs = require('fs')
const yt = require('yt-converter')
const prompt = require('prompt')

const configPath = path.resolve('./', 'config.json')
if (!fs.existsSync(configPath)) {
  fs.writeFileSync(path.resolve(configPath), JSON.stringify({ path: undefined }))
}

program.name('cli-yt-converter').version(packageJson.version)

program
  .command('convert')
  .argument('<url video>')
  .option('-m, --mode <string>', 'Forma de conversion, audio o video. Por default es audio', 'audio')
  .action((url, options) => {
    console.log(options)
    const json = JSON.parse(fs.readFileSync(configPath))
    if (!json.path) return console.log('No hay una carpeta seleccionada donde guardar los archivos. Usa el comando configure para seleccionarla.')
    switch (options.mode) {
      case 'audio':
        yt.convertAudio({
          url,
          directoryDownload: json.path
        }, (p) => { console.log('Converted ' + p + '%') }, () => console.log('Converted in ' + json.path))
        break
      case 'video':
        break
      default:
        console.log('No mode provided')
        break
    }
  })

program.command('configure').action(() => {
  prompt.start()
  prompt.get({ description: 'Enter absolute path for directory of converts.', type: 'string', required: true, name: 'path' }, (err, res) => {
    if (err) throw err
    const absolutePath = path.resolve(res.path)
    if (!fs.existsSync(absolutePath)) return console.log('Path bad formatted')
    if (!fs.statSync(absolutePath).isDirectory()) return console.log('Path must be directory.')
    fs.writeFileSync(configPath, JSON.stringify({ path: absolutePath }))
    console.log('Configured Succesfully')
  })
})

program.parse()
