class ErrorController {
    static async e400(req, res, error) {
        res.status(400).json({
            url: req.url,
            errCode: 400,
            errInfo: "Bad request.",
            errMessage: error.message,
            errType: error.name
        });
    }
    static async e401(req, res, error) {
        res.status(401).json({
            url: req.url,
            errCode: 401,
            errInfo: "Acces denied.",
            errMessage: error.message,
            errType: error.name
        });
    }
    static async e404(req, res, error) {
        res.status(404).json({
            url: req.url,
            errCode: 404,
            errInfo: "Resources not found.",
            errMessage: error.message,
            errType: error.name
        });
    }
    static async e500(req, res, error) {
        res.status(500).json({
            url: req.url,
            errCode: 500,
            errInfo: "Internal Server Error",
            errMessage: error.message,
            errType: error.name
        });
    }
}
export { ErrorController };
