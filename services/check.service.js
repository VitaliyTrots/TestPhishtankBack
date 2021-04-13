// const _ = require('lodash');
const axios = require('axios');
const FormData = require('form-data');
const redis = require('redis');
const client = redis.createClient();

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

client.on('error', error => {
  console.error('Redis error: ' + error);
});

const getDataFromVirusTotal = async url => {
  let data = new FormData();
  data.append('url', url);

  const response = await axios({
    method: 'POST',
    timeout: 5000, // 5 sec timeout for response
    url: 'https://www.virustotal.com/api/v3/urls',
    headers: {
      ...data.getHeaders(),
      'x-apikey': process.env.VIRUSTOTAL_KEY
    },
    data
  });
  const virusTotalRecordId = response.data.data.id;

  const response2 = await axios({
    method: 'GET',
    timeout: 5000, // 5 sec timeout for response
    url: 'https://www.virustotal.com/api/v3/analyses/' + virusTotalRecordId,
    headers: {
      ...data.getHeaders(),
      'x-apikey': process.env.VIRUSTOTAL_KEY
    }
  });

  return response2.data.data;
};

class CheckService {
  async checkUrl(url) {
    try {
      let existingUrl = await getAsync(url);
      if (!existingUrl || JSON.parse(existingUrl).attributes.status !== 'completed') {
        const fetchedData = await getDataFromVirusTotal(url);
        existingUrl = JSON.stringify(fetchedData);
        await setAsync(url, existingUrl);
      };
      return JSON.parse(existingUrl);
    } catch (err) {
      console.error(err)
      throw err;
    };
  };
};

module.exports = new CheckService();
