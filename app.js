const mqtt = require('mqtt')
const mqttClient = mqtt.connect('mqtt://iot.eclipse.org')
const request = require('request');

mqttClient.subscribe('nodes/+/air_sensor/humidity')
mqttClient.subscribe('nodes/+/air_sensor/temperature')
mqttClient.on('message', handleMsg);



function handleMsg(topic, payload) {
  const msg_text = payload.toString()

  const topic_without_root = topic.replace('nodes/','')
  var node_serial = topic_without_root.split('/')[0];
  var sensor_name = topic_without_root.split('/')[1]
  var attribute_name = topic_without_root.split('/')[2];;

  if (attribute_name == "temperature") {
    console.log("temperature", msg_text)

    var options = {
      uri: 'https://api.powerbi.com/beta/1b0d02db-fc9e-4495-9537-1d379cca2ae7/datasets/ba9192c8-05b6-429e-aff5-0cc697ceadda/rows?key=pe68elohVrM4M6KkaMXK%2Bm%2Bc9U0fQ1R6n0O7bSHXn0WoA%2FhTYE4ePvRAiTk%2FXO6p8%2BIueUVTXeHKT%2FYo6bdIbA%3D%3D',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: `[{"temperature" :${msg_text}, "timestamp":"${new Date().toISOString()}"}]`
    };

    request(options, function (error, response, body) {
      if (error || response.statusCode != 200) {
        console.log(body)
      }
    });
  }

  if (attribute_name == "humidity") {
    console.log("humidity", msg_text)

    var options = {
      uri: 'https://api.powerbi.com/beta/1b0d02db-fc9e-4495-9537-1d379cca2ae7/datasets/9a2e6e0a-062d-4945-b323-b00e34a9faac/rows?key=vWVRRcnVbKSVUHXseJ3b%2BVkZKpRT8QCZVtDF3IjSUq2fKEVOjpRMN0TxU2bA%2B48qYR%2BYdOHmbmLTXuo0rpMvKg%3D%3D',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: `[{"humidity" :${msg_text}, "timestamp":"${new Date().toISOString()}"}]`
    };

    request(options, function (error, response, body) {
      if (error || response.statusCode != 200) {
        console.log(body)
      }
    });


  }
}
