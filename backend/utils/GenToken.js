// JWT certifies the user identity and sends it to the frontend:
jwt = require("jsonwebtoken");
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "90d",
    });
};

module.exports = generateToken;
