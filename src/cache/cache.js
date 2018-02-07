let cache = {};

function saveList(name, list) {
  cache[name] = list;
}

function exist(name) {
  return cache[name] !== undefined;
}

function getCache(name) {
  return cache[name];
}

export default Cache = {
  saveList,
  exist,
  getCache
}