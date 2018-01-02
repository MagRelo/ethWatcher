
/**
 * Main application routes
 */

const fetch = require('request-promise')

const elasticSearch_HOST = '198.211.105.115'
const elasticSearch_PORT = '9200'

module.exports = function(app) {

  app.post('/api/test', (request, response) => {

    console.log(request.body)

    fetch({
      method: 'POST',
      url: 'http://' + elasticSearch_HOST + ':' + elasticSearch_PORT + '/watch/event',
      json: true,
      body: {
        'eventType': 'test',
        'data': request.body,
        'timestamp': new Date()
      }
    })
    .then((result)=>{

      response.send(result);

    }).catch((error) => {

      // client error
      if(error.clientError){
        console.error(error.message)
        return response.status(error.status).json(error);
      }

      // server error
      console.error(error.message)
      return response.status(500).json({error: error.message});

    })
  });

  // *ANALYTICS*
  // app.post('/api/webhook/test', analyticsController.sendEvent);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get((request, response)=>{
     response.status(404).send()
   });

  // All other routes should redirect to the index.html
  app.get('/*', function(req, res){
    res.sendFile('index.html', { root: './build_webpack'});
  });

};
