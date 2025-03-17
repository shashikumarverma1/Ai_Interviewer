import { NextApiRequest, NextApiResponse } from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

// const result=  res.setHeader(
//     "Set-Cookie",
//     serialize("authToken", "", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       path: "/",
//       maxAge: 0, // Expire immediately
//     })
//   );

  return res.status(200).json({ success: true });
}
