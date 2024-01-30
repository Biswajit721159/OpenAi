let express = require("express");
let cors = require("cors");
const axios = require('axios');
let app = express();
app.use(express.json({ limit: "50mb" }));
const dotenv = require('dotenv')
dotenv.config();

app.use(cors());
app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type',
}));
let { ApiResponse } = require("./utils/ApiResponse.js");

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.post('/', async (req, res) => {
    let apikey=process.env.apiKey
    let api=process.env.api
    let searching_description = req.body.searching_description
    const headergpt = {
        'Authorization': `Bearer ${apikey}`,
        'Content-Type': 'application/json',
    }
    const payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "assistant",
                "content": "Related to everything"
            },
            {
                "role": "user",
                "content": searching_description
            },
        ],
        "temperature": 0
    }
    const chat_url = api
    const response = await axios.post(chat_url, payload, { headers: headergpt })
    try {
        let response_data = response.data.choices[0].message
        let data = solve(response_data.content)
        return res.status(200).json(new ApiResponse(200, data, "success"));
    }
    catch {
        return res.status(500).json(new ApiResponse(500, "Sorry, we are not able to answer your question.", "error"));
    }
})

function solve(str) {
    // console.log(str)
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

app.listen(5000);