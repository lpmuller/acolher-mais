import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
 
        // Configurar a conexão com o Firestore
        const firebaseConfig = {
            //Inserir aqui suas chaves do projeto Firebase
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        console.log("Firebase iniciado");        

        export {app, db};