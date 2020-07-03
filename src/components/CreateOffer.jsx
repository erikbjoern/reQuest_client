import React from "react";
import { Button } from "semantic-ui-react";

export const CreateOffer = (props) => {
  return (
    <div id="message-component-send">
      <div id="message-container">
        <h3 className="createOffer-label">{"Your message:"}</h3>
        <form id="send-message-form" onSubmit={(e) => props.createOffer(e)}>
          <textarea
            id="offerMessage"
            name="OfferMessage"
            placeholder="Write your message here..."
            required
          />
          <Button id="message-send-btn" type="submit">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export const ReplyOffer = (props) => {
  return (
    <div id="message-component-send">
      <div id="message-container">
        <h3 className="createReply-label">{"Your message:"}</h3>
        <form
          id="send-message-form"
          onSubmit={(e) => props.replyOfferMessage(e)}
        >
          <textarea
            id="replyMessage"
            name="replyMessage"
            placeholder="Write your message here..."
            required
          />
          <Button id="message-send-btn" type="submit">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

