// src/store.js
import { createStore } from 'redux';
import themeReducer from './reducers/themeReducer';

// Buat store
const store = createStore(themeReducer);

export default store;
