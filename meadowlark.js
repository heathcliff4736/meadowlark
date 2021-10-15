const express = require('express')
const expressHandlebars = require('express-handlebars') // View (frontend)
// 사용자 정의 라이브러리
// const fortune = require('./lib/fortune.js')
const app = express()
const fortune = require("./lib/fortune");
const handlers = require('./lib/handlers');
const weatherMiddleware = require('./lib/middleware/weather');
const port = process.env.PORT || 3000

// 뷰 핸들바 엔진 설정
app.engine('.hbs', expressHandlebars({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers:{
        section: function(name, options){
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        }
    }
}))
//app.set('view engine', 'handlebars')
app.set('view engine', '.hbs')

app.use(express.static(__dirname + '/public'))

app.use(weatherMiddleware)

app.get('/', handlers.home)

app.get('/about', handlers.about)

app.get('/section-test', handlers.sectionTest)

app.use(handlers.notFound)

app.use(handlers.serverError)

app.listen(port,()=> console.log(`서버 시작 (포트번호 : ${port}, 종료는 Ctrl+c)`) )