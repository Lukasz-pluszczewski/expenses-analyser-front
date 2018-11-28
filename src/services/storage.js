const storage = async () => ({
  async set(key, value) {
    return localStorage.setItem(key, value);
  },
  async get(key) {
    return localStorage.getItem(key);
  }
});

export default storage;