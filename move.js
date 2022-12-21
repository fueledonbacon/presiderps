const fs = require('fs/promises')

const jsDir = './build/static/js' 
const cssDir = './build/static/css'

async function main(){
    const jsFiles = await fs.readdir(jsDir)
    const cssFiles = await fs.readdir(cssDir)
    for(const file of jsFiles){
        if(/^main\..*\.js$/.test(file)){
            const newFile = await fs.copyFile( jsDir + '/' + file, './lib/main.js')
        }
    }
    for(const file of cssFiles){
      if(/^main\..*\.css$/.test(file)){
        const newFile = await fs.copyFile(cssDir + '/' + file, './lib/main.css')
      }
    }
    return
}
main()
.then(process.exit)