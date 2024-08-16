import React from "react";

const url = process.env.REACT_APP_HOST_NOTIFICATIONS;


const postSend = async (token, toUserId, amount) => {
    try{
        const body = {
            toUserId : toUserId,
            amount: amount
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
      return data.body;
    } else if (response.status === 424){
        return "Saldo insuficiente";
    } else {
      console.log(response);
      return "Falha ao realizar transferência";
    }
    } catch (err) {
      console.log(err);
      return "Falha ao realizar transferência";
    }
   }

export const sendPLC = async ( token, toUserId, amount ) => {
    if (amount <= 0){
      return "Quantidade deve ser maior que 0";
    }
    var result = await postSend(token, toUserId, amount);
    return result;        
}