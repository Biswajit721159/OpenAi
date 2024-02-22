import axios from 'axios'

let conversationHistory = [];

export async function sendtoAi(message, text) {
    try {
        conversationHistory.push({
            'role': 'user',
            'content': text
        })
        const requestBody = {
            'question': conversationHistory,
        };
        let responce = await axios.post(`/api`, requestBody)
        conversationHistory.push({
            'role': 'assistant',
            'content': responce.data.data[responce.data.data.length - 1]
        })
        message.push({
            'role': 'assistant',
            'content': responce.data.data.slice(0, responce.data.data.length - 1)
        })
        return {
            'data': message,
            isload: false
        }
    }
    catch (error) {
        message.push({
            'role': 'assistant',
            'content': "Sorry, we are not able to answer your question."
        })
        return {
            'data': message,
            isload: false
        }
    }
}
