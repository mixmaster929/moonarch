"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Origin",
    ],
}));
app.get('/', (req, res) => {
    res.send('Hello from Node API!');
});
app.use("/api/tokenscan", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenAddress = req.query.param;
    const url = "https://api.moonarch.app/1.0/tokens/ETH/details/" + tokenAddress;
    let fetched = [];
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
    function fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0, axios_1.default)(config)
                    .then(function (response) {
                    const data = response.data.token.checks;
                    // console.log("response=>", JSON.stringify(response.data.token.checks));
                    if (data.length > 0) {
                        data.map((each) => {
                            fetched.push({ "level": each.level, "messages": each.message });
                        });
                    }
                    console.log("fetched=>", fetched);
                    return res.json(fetched);
                })
                    .catch(function (error) {
                    console.log("error", error);
                });
            }
            catch (error) {
                console.error('Error fetching data:', error.message);
            }
        });
    }
    fetchData();
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
