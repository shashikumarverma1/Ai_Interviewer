import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "Token missing" });
console.log(token , "token")
  // 🔹 Set HTTP-Only cookie
  res.setHeader(
    "Set-Cookie",
    serialize("authToken", token, {
      // httpOnly: !true, // 🔒 Secure (JS cannot access)
      // secure: true , //"development" === "production", // Use HTTPS in production
      sameSite: "strict", // Prevent CSRF
      path: "/", // Available across all pages
      maxAge: 60 * 60 * 24 * 7, // 7 days expiry
    })
  );

  return res.status(200).json({ success: true });
}
