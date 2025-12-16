export const auth = {
  isAuthenticated: false,

  login(username, password) {
    if (username === "hansiga" && password === "1234") {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }
};
