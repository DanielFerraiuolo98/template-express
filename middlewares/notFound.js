function errorEndpoint(req, res, next) {
    res.status(404);
    res.json({ error: "Not Found", message: "Risorsa non trovata" });
}

module.exports = errorEndpoint;