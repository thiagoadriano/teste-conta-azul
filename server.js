let express = require('express'),
    app = express(),
    port = 4889;

app.use(express.static(__dirname + '/public'));

app.all("*/*", (req, res) => {
    res.send("index");
});

app.listen(port, () => {
    console.info(`Server Escutando na porta: ${port}`);
});