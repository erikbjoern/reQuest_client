import React, { useState } from "react";
import { Grid, List } from "semantic-ui-react";
import AllRequests from "./AllRequests";
import SpecificRequest from "./SpecificRequest";
import { useDispatch } from "react-redux";

const BrowseRequests = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const dispatch = useDispatch();
  const onItemClickHandler = (e) => {
    setSelectedTab(e.target.id);
    dispatch({
      type: "SET_ACTIVE_CATEGORY",
      payload: {
        activeCategory: e.target.id,
      },
    });
  };

  const activeTab = (nameOfTab) => {
    if (nameOfTab === selectedTab) {
      return "active";
    } else {
      return "inactive";
    }
  };

  return (
    <>
      <div id="page-container">
        <h2 id="browse-title">Categories</h2>
        <List id="categories" onClick={(e) => onItemClickHandler(e)}>
          <List.Item id="all" className={activeTab("all")}>
            All
          </List.Item>
          <List.Item id="home" className={activeTab("home")}>
            Home
          </List.Item>
          <List.Item id="education" className={activeTab("education")}>
            Education
          </List.Item>
          <List.Item id="sport" className={activeTab("sport")}>
            Sport
          </List.Item>
          <List.Item id="it" className={activeTab("it")}>
            IT
          </List.Item>
          <List.Item id="vehicles" className={activeTab("vehicles")}>
            Vehicles
          </List.Item>
          <List.Item id="other" className={activeTab("other")}>
            Others
          </List.Item>
        </List>
        <Grid>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={9} id="list-wrapper">
            <AllRequests />
          </Grid.Column>
          <Grid.Column width={5}>
            <SpecificRequest />
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
};

export default BrowseRequests;
