import md5 from 'crypto-js/md5';

const profilePictureAPI = async (email) => {
  const emailHash = md5(email).toString();
  const url = `https://www.gravatar.com/avatar/${emailHash}}`;
  const request = await fetch(url);
  const data = await request.url;
  return data;
};

export default profilePictureAPI;
