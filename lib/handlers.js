const fortune = require('./fortune')

exports.home = (req, res) => res.render('home')

exports.about = (req, res) =>
    res.render('about', {fortune: fortune.getFortune()})
    //res.render('about'), "최종보스는 깐부다")
    //res.render('about'), '123')
    //res.render('about')

exports.notFound = (req, res) => res.render('404')

exports.serverError = (err, req, res, next) => {
    //console.log(err)
    res.render('500')
}

exports.sectionTest = (req, res) => res.render('section-test')