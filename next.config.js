const path = require('path')
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  sassLoaderOptions: {
    includePaths: [path.resolve('./client/styles')]
  }
})
