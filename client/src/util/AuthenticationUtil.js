export function saveAuth(info) {
  const { id, username } = info;

  let isUser = false, isAdmin = false;
  if (info.roles[0].name === "ROLE_USER"){
    isUser = true;
  }
  else{
    isAdmin = true;
  }

  const authJson = { id, username, isUser, isAdmin };

  localStorage.setItem("authInfo", JSON.stringify(authJson));
}

export function cleanAuth() {
  localStorage.removeItem("authInfo");
}

export function expireAuth() {
  localStorage.setItem("authExpired", true);
  cleanAuth();
}

export function isExpired() {
  let exp = localStorage.getItem("authExpired");
  if (exp) {
    localStorage.removeItem("authExpired");
    return true;
  }
  return false;
}

export function isAuthenticated() {
  return true; // TODO delete this line
  let auth = localStorage.getItem("authInfo");
  return auth != null;
}

export function getAuthId() {
  return true; // TODO delete this line
  let auth = localStorage.getItem("authInfo");
  let authJson = JSON.parse(auth);
  return authJson.id;
}

export function getAuthName() {
  return true; // TODO delete this line
  let auth = localStorage.getItem("authInfo");
  let authJson = JSON.parse(auth);
  return authJson.username;
}

export function isAdmin() {
  return true; // TODO delete this line
  let auth = localStorage.getItem("authInfo");
  let authJson = JSON.parse(auth);
  return authJson.isAdmin;
}

export function isUser() {
  return true; // TODO delete this line
  let auth = localStorage.getItem("authInfo");
  let authJson = JSON.parse(auth);
  return authJson.isUser;
}
