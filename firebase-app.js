// ES Module — importado por admin y páginas públicas
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getFirestore, doc, getDoc, setDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyAOy0AJGbSMY70uGOj0IoCrAvy9f1kqXas",
  authDomain: "stoico-moda.firebaseapp.com",
  projectId: "stoico-moda",
  storageBucket: "stoico-moda.firebasestorage.app",
  messagingSenderId: "239588530754",
  appId: "1:239588530754:web:621381037ffe5071256bdb"
};

const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup, onAuthStateChanged, signOut, doc, getDoc, setDoc, collection, getDocs };

// ---------- HELPERS ----------

/** Lee todos los datos del sitio desde Firestore */
export async function fsGetAllData() {
  const [configSnap, productsSnap] = await Promise.all([
    getDoc(doc(db, 'config', 'main')),
    getDocs(collection(db, 'products')),
  ]);
  const config = configSnap.exists() ? configSnap.data() : {};
  const products = {};
  productsSnap.forEach(d => { products[d.id] = d.data(); });
  return { ...config, products };
}

/** Guarda configuración general en Firestore */
export async function fsSaveConfig(data) {
  const { products, ...config } = data;
  await setDoc(doc(db, 'config', 'main'), config);
}

/** Guarda un producto individual en Firestore */
export async function fsSaveProduct(id, data) {
  await setDoc(doc(db, 'products', id), data);
}

/** Comprime una imagen a base64 (mantiene < 800KB) */
export function compressImage(file, maxW = 700, maxH = 875, quality = 0.82) {
  return new Promise(resolve => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      let w = img.width, h = img.height;
      if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
      if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(''); };
    img.src = url;
  });
}

export function compressHero(file) {
  return compressImage(file, 1280, 640, 0.85);
}
