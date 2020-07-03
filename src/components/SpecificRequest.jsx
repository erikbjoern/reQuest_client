import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import createHeaders from "../modules/headers";
import { AboutReQuest, SelectedRequest } from "./AboutReQuest";
import { CreateOffer } from "./CreateOffer";

const SpecificRequest = () => {
  const selectedRequest = useSelector(
    (state) => state.requests.selectedRequest
  );
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.authentication.uid);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const onContactHandler = () => setShowMessageForm(true);
  const dispatch = useDispatch();

  const createOffer = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "/offers",
      {
        request_id: selectedRequest.id,
        message: e.target.firstElementChild.value,
      },
      { headers: createHeaders() }
    );
    setMessage(response.data.message);
    setShowMessageForm(false);
    dispatch({
      type: "SET_SELECTED_REQUEST",
      payload: { request: { ...selectedRequest, offerable: null } },
    });
  };

  const render = () => {
    let disableButton, statusMessage;
    if (selectedRequest) {
      switch (true) {
        case !user:
          disableButton = true;
          statusMessage = "Log in or sign up to offer your help";
          break;
        case user && selectedRequest.offerable:
          disableButton = false;
          break;
        case user &&
          !selectedRequest.offerable &&
          selectedRequest.requester === user:
          disableButton = true;
          statusMessage = "You cannot make an offer on your own request";
          break;
        default:
          disableButton = true;
          statusMessage = "You have already offered to help with this request";
      }
      return (
        <div id="message-component">
          <SelectedRequest
            onContactHandler={onContactHandler}
            selectedRequest={selectedRequest}
            statusMessage={statusMessage}
            disableButton={disableButton}
            showMessageForm={showMessageForm}
          />
        </div>
      );
    } else {
      return (
        <div id="specific-component">
          <AboutReQuest />
        </div>
      );
    }
  };

  return (
    <>
      {render()}
      {showMessageForm && <CreateOffer createOffer={createOffer} />}
      {message !== "" && <p id="message"> {message}</p>}
    </>
  );
};

export default SpecificRequest;
