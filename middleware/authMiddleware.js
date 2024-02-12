
const Jwt = require("jsonwebtoken");

 const verifyToken = async(req,res,next) =>{

  const token = req.headers['authorization']


console.log("token",token);

    if (!token) return res.status(500).json({ error: "Access denied" });
  
    try {
      const bearerToken = token.split(" ")[1];
  
      const decoded = Jwt.verify(bearerToken, "test");
  
      console.log("decoded", decoded);
      req.token = decoded;
      next();
    }catch(err){
        return res.status(500).json({
            message: err.message || "Some error occurred while creating the user.",
          });

}
}
 
module.exports = verifyToken
