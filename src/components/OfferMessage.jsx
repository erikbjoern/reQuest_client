import React, { useState } from "react";
import { List, Button, Card, Form, TextArea, Icon } from "semantic-ui-react";
import ChatBubbles from "./ChatBubbles";

const OfferMessage = (props) => {
  const [replyStatus, setReplyStatus] = useState(false);

  const showActivityButtons = (
    <Card.Content extra>
      <>
        {props.selectedStatus === "pending" && (
          <div className="ui two buttons">
            <Button
              basic
              color="green"
              onClick={(e) => props.onClickActivity(e)}
              id="accepted"
              value={props.id}
            >
              Accept
            </Button>
            <Button
              basic
              color="red"
              onClick={(e) => props.onClickActivity(e)}
              id="declined"
              value={props.id}
            >
              Decline
            </Button>
          </div>
        )}
        {props.selectedStatus === "active" && (
          <div className="ui two buttons">
            {(!props.completedMessage || props.error) && (
              <Button id="quest-completed" onClick={props.completeRequest}>
                Quest Completed
              </Button>
            )}
            {replyStatus ? (
              <Button
                id="send-chat-message"
                form="send-message-form"
                type="submit"
                color="yellow"
              >
                Send
              </Button>
            ) : (
              <Button id="quest-reply" onClick={() => setReplyStatus(true)}>
                Reply
              </Button>
            )}
          </div>
        )}
      </>
    </Card.Content>
  );

  return (
    <List divided relaxed id="offers">
      <Card.Group>
        <Card>
          <Card.Content>
            <Card.Meta>Conversation with: {props.helperOffer.email}</Card.Meta>
            <Card.Content
              style={{
                height: "35vh",
                overflow: "auto",
                color: "#444",
                paddingTop: "10px",
              }}
            >
              <ChatBubbles messages={props.helperOffer.conversation.messages} />
            </Card.Content>
            {replyStatus && (
              <Card.Content style={{ paddingBottom: 0 }}>
                <Card.Meta
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  your message:
                  <Icon
                    id="close-messages"
                    name="close"
                    onClick={() => setReplyStatus(false)}
                    style={{ padding: "3px", cursor: "pointer" }}
                  />
                </Card.Meta>
                <Form
                  id="send-message-form"
                  onSubmit={(e) => {
                    e.target.replyMessage.value !== "" &&
                      props.replyOfferMessage(e) &&
                      e.target.reset();
                  }}
                  style={{ padding: 0 }}
                >
                  <TextArea
                    id="replyMessage"
                    name="replyMessage"
                    placeholder="Write..."
                    style={{
                      maxWidth: "100%",
                      height: "70px",
                      marginTop: "10px",
                    }}
                  />
                </Form>
              </Card.Content>
            )}
          </Card.Content>
          {showActivityButtons}
        </Card>
      </Card.Group>
      <p style={{ color: "black" }} id="completed-message">
        {props.completedMessage}
      </p>
    </List>
  );
};

export default OfferMessage;
