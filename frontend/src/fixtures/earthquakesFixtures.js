const earthquakesFixtures = {
    oneEarthquake: {
        "id": 1,
        "title": "M 2.2 - 10km ESE of Ojai, CA",
        "mag": 2.16,
        "place": "10km ESE of Ojai, CA",
        "time": 1644571919000,
        "properties": {"url": "https://earthquake.usgs.gov/earthquakes/eventpage/ci40182864"}
    },
    threeEarthquakes: [
        {
            "id": 1,
            "title": "M 2.2 - 10km ESE of Ojai, CA",
            "mag": 2.16,
            "place": "10km ESE of Ojai, CA",
            "time": 1644571919000,
            "properties": { "url": "https://earthquake.usgs.gov/earthquakes/eventpage/ci40182864" }
        },
        {
            "id": 2,
            "title": "M 2.6 - 10km NW of Santa Paula, CA",
            "mag": 2.68,
            "place": "10km NW of Santa Paula, CA",
            "time": 1644539746380,
            "properties": { "url": "https://earthquake.usgs.gov/earthquakes/eventpage/ci40182600" }
        },
        {
            "id": 3,
            "title": "M 3.5 - 13km NNW of Grapevine, CA",
            "mag": 3.51,
            "place": "13km NNW of Grapevine, CA",
            "time": 1643280682330,
            "properties": { "url": "https://earthquake.usgs.gov/earthquakes/eventpage/ci39924871" }
        }
    ]
};

export { earthquakesFixtures };