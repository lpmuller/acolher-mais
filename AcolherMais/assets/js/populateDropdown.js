import { db } from "./firebaseConfig.js";
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
  
  
  // Função para popular o campo select
  async function popularDropdown(selectElement, collectionName) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
        const option = document.createElement('option');
        option.value = doc.id;
        option.text = doc.data().nome;
        selectElement.appendChild(option); 
    });
  }

const generosSelect = document.getElementById('gender');
const orientacoesSelect = document.getElementById('orientation');
const servicesSelect = document.getElementById('service');
  
// Popular o campo dropdown de gêneros
popularDropdown(generosSelect, 'genero');
  
// Popular o campo dropdown de orientações
popularDropdown(orientacoesSelect, 'orientacao');

// Popular o campo dropdown de serviços
popularDropdown(servicesSelect, 'servico');
