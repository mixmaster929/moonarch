import express, { Request, Response } from "express";
import cors from "cors";
import axios from 'axios'

const app = express();
const port = 5000;
app.use(
    cors({
        origin: "*",
        methods: ["GET"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Access-Control-Allow-Origin",
        ],
    })
);
app.get('/', (req, res) => {
    res.send('Hello from Node API!');
});


app.use("/api/tokenscan", async (req: Request, res: Response) => {
    const tokenAddress: any = req.query.param;
    const url = "https://api.moonarch.app/1.0/tokens/ETH/details/" + tokenAddress;
    let fetched: any[] = [];
    const config = {
        method: 'get',
        url: url,
        headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9',
            'if-none-match': 'W/"967-eAEuOgSSEwNsi2eQAasHO4gdZFE"',
            'origin': 'https://eth.moonarch.app',
            'priority': 'u=1, i',
            'referer': 'https://eth.moonarch.app/',
            'sec-ch-ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
        }
    };

    async function fetchData() {
        try {
            const response = await axios(config)
                .then(function (response) {
                    const data = response.data.token.checks;
                    // console.log("response=>", JSON.stringify(response.data.token.checks));
                    if (data.length > 0) {
                        data.map((each: any) => {
                            fetched.push({ "level": each.level, "messages": each.message });
                        })
                    }
                    console.log("fetched=>", fetched);

                    return res.json(fetched);
                })
                .catch(function (error) {
                    console.log("error", error);
                });
        } catch (error: any) {
            console.error('Error fetching data:', error.message);
        }
    }

    fetchData();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});