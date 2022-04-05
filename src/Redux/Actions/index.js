function getToken(json) {
  return { type: 'GET_TOKEN', payload: json.token };
}

/* function requestToken() {
  return { type: REQUEST_TOKEN };
} */

export function failedRequest(error) {
  return { type: 'FAILED_REQUEST', payload: error };
}

export function fetchToken() {
  return (dispatch) => (
  // dispatch(requestToken());
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((json) => dispatch(getToken(json)))
      .catch((error) => dispatch(failedRequest(error))));
}
