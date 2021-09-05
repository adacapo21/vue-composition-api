module.exports = {
    publickPath: process.env.NODE_ENV === 'production'
    ? '/vue-composition-api'            // the name of github repository
    : '/'
}