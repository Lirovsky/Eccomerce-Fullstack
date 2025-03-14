import jwt from "jsonwebtoken";

const generatedAccessToken = async (userId) => {
  const token = jwt.sign({ id: userId }, process.env.SECRET_KEY_ACCESS_TOKEN, { expiresIn: "2h" });
  return token;
};

export default generatedAccessToken;
