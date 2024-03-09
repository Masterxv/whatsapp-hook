import WhatsApp from 'whatsapp';

// Your test sender phone number
const wa = new WhatsApp(Number(process.env.WA_PHONE_NUMBER_ID));

export async function send_message(recipient_number: number, message: string) {
  try {
    console.log("sending whatspp to", recipient_number, message);
    const sent_text_message = wa.messages.text({ "body": message }, recipient_number);

    await sent_text_message.then((res) => {
      // console.log(res.rawResponse());
    });
  }
  catch (e) {
    console.log(JSON.stringify(e));
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
    const sent_list_message = wa.messages.interactive(list_message, recipient_number);

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
    const read_message = wa.messages.status({ status: 'read', message_id });

    await read_message.then((res) => {
      // console.log(res.rawResponse());
    });
  }
  catch (e) {
    console.log(JSON.stringify(e));
  }
}