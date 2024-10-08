import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCjXlgysJkN-2s3Gu0forgp7as5-9NqCkI",
  authDomain: "pasar-b04a7.firebaseapp.com",
  databaseURL: "https://pasar-b04a7-default-rtdb.firebaseio.com",
  projectId: "pasar-b04a7",
  storageBucket: "pasar-b04a7.appspot.com",
  messagingSenderId: "508470916587",
  appId: "1:508470916587:web:460e9a1612e92b712e15ae",
  measurementId: "G-33T7CQCWBX"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
a
export async function ambilDaftarProduk() {
  const refDokumen = collection(db, "produk");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);
  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      harga: dok.data().harga,
      stok: dok.data().stok,
    });
  });
  return hasil;
}
export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export function hitungTotal() {
  let angka1 = parseInt(document.getElementById("input-harga").value);
  let angka2 = parseInt(document.getElementById("input-stok").value);
  let total = angka1 + angka2;
  document.getElementById("total").value = total;
}
export async function hapusdata(docId) {
  await deleteDoc(doc(db, "produk", docId));
}
export async function tambahProduk(nama, harga, stok) {
  try {
    const dokRef = await addDoc(collection(db, 'produk'), {
      nama: nama,
      harga: harga,
      stok: stok
    });
    console.log('Berhasil menambah produk ' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah produk ' + e);
  }
}