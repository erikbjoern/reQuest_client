import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequests } from "../modules/getRequests";
import RequestCard from "./RequestCard";
import { Card } from "semantic-ui-react";

const AllRequests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests.requests);
  const activeCategory = useSelector((state) => state.pages.activeCategory);
  const latitude = useSelector((state) => state.coords.latitude);
  const longitude = useSelector((state) => state.coords.longitude);
  const coords = { lat: latitude, long: longitude };

  useEffect(() => {
    getRequests(dispatch, activeCategory, coords);
  }, [dispatch, activeCategory]);

  const requestCards = requests.map((request) => (
    <RequestCard key={request.id} request={request} myRequests={false} />
  ));

  return (
    <>
      <Card.Group id="qcards">{requestCards}</Card.Group>
    </>
  );
};

export default AllRequests;
