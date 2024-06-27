'use server'

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    //get user from clerk
    const user = await currentUser();

    if(!user) throw new Error('User is not logged in');
    if(!apiKey) throw new Error('No API key');
    if(!apiSecret) throw new Error('No API secret key');

    //create a server-side client
    const client = new StreamClient(apiKey, apiSecret);

    //Create an expiration date (valid for 1h)
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    //when the token was issued
    const issued = Math.floor(Date.now() / 1000) - 60;
    
    //create new token
    const token = client.createToken(user.id, exp, issued)
    
    return token;
}