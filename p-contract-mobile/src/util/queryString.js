export default function (url) {
  const currentUrl = url || window.location.href;
  const query = currentUrl.split('?')[1];
  if (query) {
    const queryString = {};
    const params = query.split('&');
    params.forEach((param) => {
      const item = param.split('=');
      queryString[item[0]] = item[1];
    });
    return queryString;
  }
  return null;
}
