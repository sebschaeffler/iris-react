// function to parse fragment and return access token
const getParams = () => {
  const hash = window.location.hash.substring(1);
  if (hash === null || !hash) {
    return;
  }
  const queries = hash.split("&");
  const params = {}
  for (var i = 0; i < queries.length; i++) {
    const pair = queries[i].split('=');
    params[pair[0]] = pair[1];
  }
  return params;
};

export default {
  getParams
};
