const express = require('express');
const app = express();
const fsPromises = require('fs').promises;
const path = require('path');
const cors = require('cors');


app.use(cors());
const PORT = process.env.PORT || 5000;

const numUp = async () => {
    const data = await fsPromises.readFile(path.join(__dirname, 'num.txt'));
    const num = (Number(data.toString()) + 1).toString();
    await fsPromises.writeFile(path.join(__dirname, 'num.txt'), num);
    return num;
}


app.get('/num', async (req, res) => {
    const num = await numUp();
    res.json(num);
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));