import React, { useState, useEffect } from "react";
import { Form, Input, Container, Dropdown } from "semantic-ui-react";
import axios from "axios";
import createHeaders from "../modules/headers";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import getKarma from "../modules/getKarma";
import categoryList from "../modules/category";

const NewRequest = () => {
  const [message, setMessage] = useState("");
  const category = categoryList();
  const dispatch = useDispatch();
  const latitude = useSelector((state) => state.coords.latitude);
  const longitude = useSelector((state) => state.coords.longitude);
  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );
  const karmaPoints = useSelector((state) => state.karma.karma);

  useEffect(() => {
    getKarma(dispatch);
  }, [dispatch]);

  const submitRequest = async (e) => {
    e.persist();
    try {
      const response = await axios.post(
        "/my_request/requests",
        {
          title: e.target.title.value,
          description: e.target.description.value,
          reward: e.target.reward.value,
          category: document.getElementById("category").innerText.toLowerCase(),
          coordinates: { lat: latitude, long: longitude },
        },
        { headers: createHeaders() }
      );
      getKarma(dispatch);
      e.target.reset();
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div id="page-container">
      {!authenticated ? (
        <Redirect to={{ pathname: "/login" }} />
      ) : (
        <Container className="form-container">
          <h1 className="input-labels">{"New reQuest"}</h1>
          <Form id="newRequest-form" onSubmit={(e) => submitRequest(e)}>
            <Form.Input
              id="title"
              name="Title"
              type="text"
              placeholder="reQuest Title"
              required
            />
            <Form.TextArea
              id="description"
              name="Description"
              placeholder="reQuest Description"
              type="textarea"
              required
            />
            <Form.Input
              id="reward"
              name="Reward"
              type="number"
              placeholder="Karma Points"
              max={karmaPoints}
              min="0"
              step="1"
              required
            />
            <Form.Input>
              <Dropdown
                selection
                id="category"
                name="category"
                required
                placeholder="Category"
                options={category}
              ></Dropdown>
            </Form.Input>
            <Input
              id="submit-btn"
              type="submit"
              value="Submit"
              rows="5"
              cols="40"
              required
            />
          </Form>
          <p className="input-labels" id="message">
            {message}
          </p>
        </Container>
      )}
    </div>
  );
};

export default NewRequest;
