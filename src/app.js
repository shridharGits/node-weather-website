const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath);
// setup static directory to serve
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather', 
        name: 'Shridhar Kalukhe'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Shridhar Kalukhe'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'Go to weather tab and enter the cityname of which you want to have weather!',
        title: 'Help',
        name: 'Shridhar Kalukhe'
    })
})

app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error: 'Please provide the address'
        })
    }
    const address = req.query.address;
        geocode(address, (err, data = {}) =>{
            if (err){
                return res.send({err})
            }
            else{
                const latitude = data.latitude
                const longitude = data.longitude
                const location = data.location
                // const icon = da
                forecast(latitude, longitude, (err, forecast)=>{
                    if (err){
                        return res.send({err})
                    }
                    res.send({
                        forecast: forecast.forecast,
                        icon: forecast.icon,
                        location,
                        address: address
                    })
                })
            }
        })
})



app.get('/products', (req, res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Shridhar Kalukhe',
        errorMessage: 'Help page not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Shridhar Kalukhe',
        errorMessage: 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}.`);
})
