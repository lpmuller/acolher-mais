import { db } from "./firebaseConfig.js";
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

const form = document.getElementById('organizationForm');

// Tratar o envio do formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obter os valores do formulário
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const gender = Array.from(document.getElementById('gender').selectedOptions).map(option => option.value);
    const orientation = Array.from(document.getElementById('orientation').selectedOptions).map(option => option.value);
    const service = Array.from(document.getElementById('service').selectedOptions).map(option => option.value);
    const tel = document.getElementById('tel').value;
    const socialnetwork = document.getElementById('socialnetwork').value;
    const site = document.getElementById('site').value;
    const email = document.getElementById('email').value;


    // Enviar os dados para o Firestore
    try {
          const docRef = await addDoc(collection(db, "organizacao"), {
            nome: name,
            descricao: description,
            genero: gender,
            orientacao: orientation,
            servico: service,
            telefone: tel,
            redesocial: socialnetwork,
            site: site,
            email: email
          });
          console.log("Document written with ID: ", docRef.id);
          window.location.href = 'cadastro-sucesso.html'; 
        } catch (e) {
          console.error("Error adding document: ", e);
        }

    // Limpar os campos do formulário
    form.reset();
});