import WhatsApp from 'whatsapp';

// Your test sender phone number
const wa = new WhatsApp(Number(process.env.WA_PHONE_NUMBER_ID));

export async function send_message(recipient_number: number, message: string) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${process.env.CLOUD_API_ACCESS_TOKEN}`);

    const raw = JSON.stringify({
      "messaging_product": "whatsapp",
      "to": `${recipient_number}`,
      "type": "text",
      "text": { // the text object
        "body": message
      }
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch("https://graph.facebook.com/v19.0/157990417405268/messages", requestOptions);
    const result = await response.text();

    // console.log("sending whatspp to", recipient_number, message);
    // const sent_text_message = wa.messages.text({ "body": message }, recipient_number);
    //
    // await sent_text_message.then((res) => {
    //   // console.log(res.responseBodyToJSON());
    //   console.log("success")
    // });
  }
  catch (e) {
    console.log("error")
    // console.log(JSON.stringify(e));
  }
}


export async function send_list(recipient_number: number, list?: string[]) {
  try {
    const list_message =
    {
      "type": 'list',
      "header": {
        "type": "text",
        "text": "Our Services"
      },
      "body": {
        "text": "Please select a service that you are interested in."
      },
      "footer": {
        "text": "Press button below"
      },
      "action": {
        "button": "Service List",
        "sections": [
          {
            "title": "Hair Cut & Styling",
            "rows": [
              {
                "id": "Haircut1",
                "title": "Gent's Haircut",
                "description": "600 PKR - Discount price"
              },
              {
                "id": "Haircut2",
                "title": "Gent's Haircut and Shave",
                "description": "1200 PKR - Discount price"
              }
            ]
          },
          {
            "title": "Gent's Grooming",
            "rows": [
              {
                "id": "FaceWash1",
                "title": "Face Polish",
                "description": "1200 PKR - Discount price"
              },
              {
                "id": "Facewash2",
                "title": "Complete Facial",
                "description": "2500 PKR - Discount price"
              }
            ]
          }
        ]
      }
    }
    const sent_list_message = wa.messages.interactive(list_message as unknown as any, recipient_number);

    await sent_list_message.then((res) => {
      // console.log(res.rawResponse());
    });
  }
  catch (e) {
    console.log(JSON.stringify(e));
  }
}

export async function readMessage(message_id: string) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${process.env.CLOUD_API_ACCESS_TOKEN}`);

    const raw = JSON.stringify({
      "messaging_product": "whatsapp",
      "status": "read",
      "message_id": message_id
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch("https://graph.facebook.com/v19.0/157990417405268/messages", requestOptions);
    const result = await response.text();
    console.log({ result })
    // const read_message = wa.messages.status({ status: 'read', message_id });
    //
    // await read_message.then((res) => {
    //   console.log("sent read status");
    // });
  }
  catch (e) {
    console.log(JSON.stringify(e));
  }
}