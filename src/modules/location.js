const getPlace = async (dispatch) => {
  await navigator.geolocation.getCurrentPosition(
    (pos) => {
      dispatch({
        type: "SET_LOCATION",
        payload: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }
      }
      )
    }
  )
}
export default getPlace;