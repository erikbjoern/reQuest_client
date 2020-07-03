import { getSingleRequest } from "./getRequests";

const updateRequest = async (request, dispatch) => {
  try {
    const response = await getSingleRequest(request.id);
    response &&
      dispatch({
        type: "SET_MY_SELECTED_REQUEST",
        payload: { request: response.data.request },
      });
  } catch (error) {
    console.log(error);
  }
};

export default updateRequest;
