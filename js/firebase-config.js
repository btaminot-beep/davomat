// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHR8vErcMrQpzMuoyJwsCpOKSbbf1k2yM",
  authDomain: "davomat-tizimi-aed04.firebaseapp.com",
  databaseURL: "https://davomat-tizimi-aed04-default-rtdb.firebaseio.com",
  projectId: "davomat-tizimi-aed04",
  storageBucket: "davomat-tizimi-aed04.firebasestorage.app",
  messagingSenderId: "868541510155",
  appId: "1:868541510155:web:40cdb3459593ef5da84d0e"
};

// Firebase import (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, get, onValue, update } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ============================================================
// FIREBASE STORAGE — localStorage o'rniga
// ============================================================

const FirebaseDB = {
  // Ma'lumotlarni Firebase ga saqlash
  async save(path, data) {
    try {
      await set(ref(db, path), data);
      return true;
    } catch(e) {
      console.error('Firebase save error:', e);
      return false;
    }
  },

  // Ma'lumotlarni Firebase dan o'qish
  async load(path) {
    try {
      const snapshot = await get(ref(db, path));
      return snapshot.exists() ? snapshot.val() : null;
    } catch(e) {
      console.error('Firebase load error:', e);
      return null;
    }
  },

  // Real-time yangilanishlarni kuzatish
  listen(path, callback) {
    onValue(ref(db, path), (snapshot) => {
      callback(snapshot.exists() ? snapshot.val() : null);
    });
  },

  // Qisman yangilash
  async update(path, data) {
    try {
      await update(ref(db, path), data);
      return true;
    } catch(e) {
      console.error('Firebase update error:', e);
      return false;
    }
  }
};

export { FirebaseDB, db, ref, set, get, onValue, update };
