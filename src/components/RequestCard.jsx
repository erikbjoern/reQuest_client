import React from "react";
import { Card } from "semantic-ui-react";
import { useDispatch } from "react-redux";

const RequestCard = ({ request }) => {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch({
      type: "SET_SELECTED_REQUEST",
      payload: {
        request: request,
      },
    });
  };

  return (
    <>
      <Card
        style={{ margin: "10px" }}
        id={"request-" + request.id}
        onClick={onClickHandler}
      >
        <Card.Content>
          <Card.Header>{request.title}</Card.Header>
          <Card.Meta>{request.reward} KP</Card.Meta>
          {request.distance && (
            <Card.Meta id="distance">Distance: {request.distance} km</Card.Meta>
          )}
        </Card.Content>
      </Card>
    </>
  );
};

export default RequestCard;
