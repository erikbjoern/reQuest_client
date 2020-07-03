import React from "react";
import { Divider } from "semantic-ui-react";

const ActiveRequest = ({ request }) => {
  return (
    <div id="specific-component">
      <div id="selected-request">
        <h2 id="selected-title">{request.title}</h2>
        <span id="selected-requester">{request.requester}</span>
        <Divider />
        <div id="description-wrapper">
          <p id="selected-description">{request.description}</p>
        </div>
        <div id="selected-reward">{request.reward}p</div>
      </div>
    </div>
  );
};

export default ActiveRequest;
