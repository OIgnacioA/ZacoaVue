import { createStore } from 'vuex';
import { db } from '../firebaseConfig';
import { collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore';

export default createStore({
  state: {
    user: null,
    inputData: [],
    Notas: [], // Inicializar Notas como un array vacío
    Monto: null, // Valor inicial
  },
  getters: {
    getInputData(state) {
      return state.inputData;
    },
    isAuthenticated(state) {
      return !!state.user;
    }
  },
  mutations: {

  setUser(state, user) {
      state.user = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    },
  
    setDatos(state, payload) {
      let cash = 0; 
      let div = 0;
      let montoActual = parseFloat(state.Monto);
      let montoPayload = parseFloat(payload.Monto);
      
      if ((payload.Person == 'Anto') && (payload.Modalidad == 'full')) {
        cash = montoActual - montoPayload;
      } else if ((payload.Person == 'Oscar') && (payload.Modalidad == 'full')) {
        cash = montoActual + montoPayload;
      } else if ((payload.Person == 'Anto') && (payload.Modalidad == 'dividido')) {
        div = montoPayload / 2;
        cash = montoActual - div;
      } else if ((payload.Person == 'Oscar') && (payload.Modalidad == 'dividido')) {
        div = montoPayload / 2;
        cash = montoActual + div;
      }

      state.Monto = cash; 
      state.inputData.push(payload);
    },
    setNotas(state, payload) {
      state.Notas = payload;
    },
    setMonto(state, payload) {
      state.Monto = payload;
    }
  },
  actions: {
    MostrarData({ commit, state }, datos) {
      if (state.user) {
        commit('setDatos', datos);
      } else {
        alert('User not authenticated');
      }
    },
    AddNotas({ commit }, datos2) {
      commit('setNotas', datos2);
    },
    async GenerarJson(context) {
      const Json1 = {
        ...context.state,
        timestamp: serverTimestamp() // Añade un timestamp al documento
      };
      try {
        const docRef = await addDoc(collection(db, "MiColeccion"), Json1);
        console.log("Document successfully written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error writing document: ", error);
      }

      // ReseteaR el estado 
      context.state.inputData = [];
      context.state.Monto = 0; 
      context.state.Notas = "";

      // Recargar la página
      window.location.reload();
    },
    async fetchLastDocument({ commit }) {
      try {
        const q = query(collection(db, "MiColeccion"), orderBy("timestamp", "desc"), limit(1));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data && data.Monto !== undefined) {
            commit('setMonto', data.Monto);
          } else {
            console.log("---> No Monto field in document");
          }
        });
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    },
    async fetchLastNotes({ commit }) {
      try {
        const q = query(collection(db, "MiColeccion"), orderBy("timestamp", "desc"), limit(20));
        const querySnapshot = await getDocs(q);
        const notas = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data && data.Notas !== undefined) {
            const fecha = new Date(data.timestamp.seconds * 1000).toLocaleDateString('es-ES');
            const notaConFechaYMonto = `• ${data.Notas} - ${fecha} - monto: ${data.inputData[0].Monto}.*`;
            notas.push(notaConFechaYMonto);
          } else {
            console.log("---> No Notas field in document");
          }
        });
        commit('setNotas', notas);
      } catch (error) {
        console.error("Error fetching notes: ", error);
      }
    },
    monitorAuthState({ commit }) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        commit('setUser', user);
      }
    }
  }
});
