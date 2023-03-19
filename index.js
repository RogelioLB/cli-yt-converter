const { Command } = require('commander')
const packageJson = require('./package.json')
const program = new Command()
const path = require("path")
const fs = require("fs")
const yt = require("yt-converter")


const configPath = path.resolve("./","config.json")
if(!fs.existsSync(configPath)){
    fs.writeFileSync(path.resolve(configPath))
}

program.name('cli-yt-converter').version(packageJson.version)

program
  .command('convert')
  .argument('<url video>')
  .option('-m, --mode', 'Forma de conversion, audio o video.')
  .action((url, options) => {
    switch (options.mode) {
      case 'audio':
            yt.convertAudio({
                url,
                itag:136,
                directoryDownload:
            })
        break
      case 'video':
        break
      default:
        break
    }
  })

program.parse()
