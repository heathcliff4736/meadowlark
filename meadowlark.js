const express = require('express')
const expressHandlebars = require('express-handlebars') // View (frontend)
// 사용자 정의 라이브러리
const fortune = require('./lib/fortune.js')
const app = express()
const port = process.env.PORT || 3000

// 뷰 핸들바 엔진 설정
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
   // const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
   // res.render('about', {fortune: randomFortune})
   res.render('about', {fortune: fortune.getFortune()})
})

app.use((req, res)=>{
    res.status(404)
    //res.send('404 - Not Found')
    res.render('404')
})

app.use((err, req, res, next)=>{
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port,()=> console.log(`서버 시작 (포트번호 : ${port}, 종료는 Ctrl+c)`) )