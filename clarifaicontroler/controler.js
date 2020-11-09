const Clarifai = require("clarifai")

const app = new Clarifai.App({
    apiKey: "3b993b6bb1514ca7a5bb3d8afe72eb6a"
})

const handleApiCall = async (req, res) => {

    try {
        const apiKey = await app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        if (apiKey) {
            return res.status(200).json(apiKey)
        } else {
            return res.status(400).json("something went wrong")
        }
    }
    catch (err) {
        res.status(400).json("unable no work with API")
    }
}

module.exports = {
    handleApiCall
}

