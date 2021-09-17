import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import eslint from 'eslint'

const pkgUrl = new URL('./package.json', import.meta.url)
const pkg = JSON.parse(readFileSync(pkgUrl, 'utf-8'))

export default {
  // cmd, homepage, bugs all pulled from package.json
  cmd: 'semistandard',
  version: pkg.version,
  homepage: pkg.homepage,
  bugs: pkg.bugs.url,
  tagline: 'Semicolons For All!',
  eslint,
  eslintConfig: {
    configFile: fileURLToPath(new URL('eslintrc.json', import.meta.url))
  }
}
