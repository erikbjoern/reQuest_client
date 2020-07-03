import axios from "axios";
const getKarma = async (dispatch) => {
  try {
    const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"))
    const response = await axios.get("/karma_points",{headers:headers});
    dispatch({
      type: "GET_KARMA",
      payload: {
        karma: response.data.karma_points,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default getKarma;