const axios = require('axios');
require('dotenv').config();

const getAnswer = async (question) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: question,
      max_tokens: 150,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });
    return response.data.choices[0].text.trim();
  } catch (err) {
    throw new Error('Error generating AI answer');
  }
};

module.exports = { getAnswer };
