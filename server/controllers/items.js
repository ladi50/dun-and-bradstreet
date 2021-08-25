const http = require("http");
const fs = require("fs");

exports.getItemResults = async (req, res) => {
    const query = req.query.q;

    if (query.trim().length === 0 || !query) {
        return res.status(200).json([]);
    }

    try {
        let data = "";
        let results = [];

        http.get(`http://api.duckduckgo.com/?q=${query}&format=json`, {
            headers: {
                "Content-Type": "application/json"
            }
        }, (response) => {
            response.on("data", (chunk) => data += chunk);
            response.on("end", () => {
                JSON.parse(data).RelatedTopics.map(topic => {
                    const { FirstURL, Text, Topics } = topic;

                    if (Topics) {
                        Topics.map(({ FirstURL, Text }) => {
                            if (FirstURL !== undefined || Text !== undefined) {
                                results.push({ FirstURL, Text });
                            }
                        });
                    }
                    if (FirstURL !== undefined || Text !== undefined) {
                        results.push({ FirstURL, Text });
                    }
                });

                return res.status(200).json(results);
            });
        });
    } catch (err) {
        res.status(500).json(err.stack);
    }
};

exports.postQueries = async (req, res) => {
    const { query } = req.body;

    try {
        fs.open("./storage/queries.txt", "a", (e, id) => {
            fs.write(id, query + "\n", null, 'utf8', function () {
                fs.close(id, function () {
                    return res.status(201).json("Query saved successfully!");
                });
            });
        });
    } catch (err) {
        res.status(500).json(err.stack);
    }
};

exports.getQueries = async (req, res) => {
    try {
        await fs.readFile("./storage/queries.txt", { encoding: "utf8" }, (err, data) => {
            if (err) throw err;

            if (data.trim().length === 0) {
                return res.status(200).json(null);
            }

            return res.status(200).json(data.trim().split("\n"));
        });
    } catch (err) {
        res.status(500).json(err.stack);
    }
};