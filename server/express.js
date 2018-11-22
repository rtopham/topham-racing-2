import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import userRoutes from './routes/user.routes' 
import authRoutes from './routes/auth.routes'
import raceRoutes from './routes/race.routes'
import bannerRoutes from './routes/banner.routes'
import bannerLinkRoutes from './routes/bannerLink.routes'    
import Template from './../template' 

// modules for server side rendering
/*
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainRouter from './../client/src/MainRouter'
import StaticRouter from 'react-router-dom/StaticRouter'
import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'   
*/

const app = express() 

// parse body params and attach them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(cookieParser())
app.use(compress())

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// mount routes
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', raceRoutes)
app.use('/', bannerRoutes)
app.use('/', bannerLinkRoutes)

//#app.use(express.static('public')) 
app.use(express.static('client/build'))       

/*
app.all('/api/*', (req, res) =>{ 

})
*/

/*
app.get('*', (req, res) =>{ 
  const sheetsRegistry = new SheetsRegistry()
  const generateClassName = createGenerateClassName() 
  const context = {}
  const markup = ReactDOMServer.renderToString(React.createElement('StaticRouter',{location:req.url, context:context},
        React.createElement('JssProvider',{registry:sheetsRegistry,generateClassName:generateClassName},
        React.createElement('MainRouter',{},'')
        )
        ))
  console.log("Sending Template")
  const css = sheetsRegistry.toString()
  rest.status(200).send(Template({
    markup:markup,
    css: css
  })) 
})

*/

// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({"error" : err.name + ": " + err.message})
    }
  })


export default app