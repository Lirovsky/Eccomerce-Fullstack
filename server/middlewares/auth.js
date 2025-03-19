import jwt from "jsonwebtoken";

const auth = async (request, response, next) => {
  try {
    // get token
    const token = request.cookies.accessToken || request?.headers?.authorization?.split(" ")[1];

    // if token doesn't exist
    if (!token) {
      return response.status(401).json({
        message: "No access token!",
        error: true,
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if (!decode) {
      return response.status(401).json({
        message: "Unauthorized",
        error: true,
        success: false,
      });
    }

    request.userId = decode.id;
    next();
  } catch (error) {
    response.status(500).json({
      message: "You are not logged in",
      error: true,
      success: false,
    });
  }
};
export default auth;
