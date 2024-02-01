import axios from 'axios'
let conversationHistory = [];
export async function sendtoAi(message,text) {
    conversationHistory.push({
        'role':'user',
        'content':text
    })
    let API_KEY = process.env.REACT_APP_apiKey
    let api=process.env.REACT_APP_api
    try {
        const response = await axios.post(`${api}`,
            {
                model: 'gpt-3.5-turbo',
                messages: conversationHistory,
                stop: null,
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
            }
        );
        let response_data = response.data.choices[0].message
        let data = solve(response_data.content)
        conversationHistory.push({
            'role': 'assistant',
            'content': response_data.content
        })
        message.push({
            'role': 'assistant',
            'content': data
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

// function createPromptWithHistory(message) {
//     const recentMessages = conversationHistory.slice(-30); // Get up to 30 most recent messages
//     return recentMessages.map(({ role, content }) => `${role}: ${content}`).join("\n") + "\nYou: ${message}";
// }

function solve(str) {
    let n = str.length;
    let ans = []
    let word = ""
    for (let i = 0; i < n; i++) {
        if (i + 2 < n && str[i] == '`' && str[i + 1] == '`' && str[i + 2] == '`') {
            ans.push({
                'text': word
            })
            word = ""
            for (let j = i + 3; j < n; j++) {
                if (j + 2 < n && str[j] == '`' && str[j + 1] == '`' && str[j + 2] == '`') {
                    ans.push({
                        'code': word
                    })
                    i = j + 2;
                    word = ""
                    break
                } else {
                    word += str[j]
                }
            }
        }
        else {
            word += str[i]
        }
    }

    if (word.length !== 0) {
        ans.push({
            'text': word
        })
    }
    // console.log(ans)
    return ans;
}