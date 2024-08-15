import React from "react";

const url = process.env.REACT_APP_HOST_NOTIFICATIONS;


const postSend = async (token, toUserId) => {
    try{
        const body = {
            toUserId : toUserId,
            amount: 10
        }
      const response = await fetch(
        url+`/wallet/send`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body)
      }
    );
    if(response.ok){
      const data = await response.json();
      console.log(data)
    } else {
      console.log(response);
    }
    } catch (err) {
      console.log(err);
    }
   }

export const sendPLC = ( token, toUserId ) => {
    postSend(token, toUserId);
    return<></>;        
}