// pages/api/whatsappWebhook.js

// import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const token = process.env.WHATSAPP_TOKEN;
const verifyToken = process.env.VERIFY_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Parse the request body from the POST
    let body = req.body;

    // Check the Incoming webhook message
    console.log(JSON.stringify(req.body, null, 2));

    // Your existing logic for handling WhatsApp webhook events goes here
    // ...

    res.status(200).json({ success: true });
  } else if (req.method === 'GET') {
    // Handle the verification request
    const mode = req.query['hub.mode'];
    const receivedToken = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && receivedToken) {
      if (mode === 'subscribe' && receivedToken === verifyToken) {
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } else {
        (res as any).sendStatus(403);
      }
    } else {
        (res as any).sendStatus(400);
    }
  } else {
    (res as any).sendStatus(405);; // Method Not Allowed
  }
}
