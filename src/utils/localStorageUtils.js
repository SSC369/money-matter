export const removeDataFromLocalStorage = (key) => {
  localStorage.removeItem(item);
};

export const addDataIntoLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getDataFromLocalStorage = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};
