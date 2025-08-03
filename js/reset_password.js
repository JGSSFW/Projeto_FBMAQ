// Importações do Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

/* ==========================================================================
   Configuração do Firebase
   ========================================================================== */
const firebaseConfig = {
    apiKey: "AIzaSyAWlLRvbcxZQvjzW7KT4A7Ls-iJ0I4BAGI",
    authDomain: "fb-maq.firebaseapp.com",
    projectId: "fb-maq",
    storageBucket: "fb-maq.firebasestorage.app",
    messagingSenderId: "782633097930",
    appId: "1:782633097930:web:281c9ac26470939449b233"
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ==========================================================================
   Seleção dos elementos do DOM
   ========================================================================== */
const resetView = document.getElementById('reset-view');
const successView = document.getElementById('success-view');
const resetForm = document.getElementById('reset-form');
const errorMessage = document.getElementById('error-message');
const submitButton = resetForm.querySelector('button[type="submit"]');
const buttonText = submitButton.querySelector('.button-text');
const buttonSpinner = submitButton.querySelector('.button-spinner');

/* ==========================================================================
   Evento de envio do formulário
   ========================================================================== */
resetForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorMessage.classList.add('hidden');

    // Inicia loading do botão
    submitButton.disabled = true;
    buttonText.classList.add('hidden');
    buttonSpinner.classList.remove('hidden');

    const email = document.getElementById('email').value;

    try {
        // Tenta enviar o link de redefinição
        await sendPasswordResetEmail(auth, email);

        // Independente do resultado, exibe sucesso por segurança (evita user enumeration)
        resetView.classList.add('hidden');
        successView.classList.remove('hidden');

    } catch (error) {
        console.error("Erro ao enviar email de redefinição:", error.code);

        // Trata alguns erros específicos conhecidos
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage.textContent = 'O formato do email é inválido.';
                break;
            default:
                errorMessage.textContent = 'Ocorreu um erro. Tente novamente.';
        }

        errorMessage.classList.remove('hidden');
    } finally {
        // Finaliza loading do botão
        submitButton.disabled = false;
        buttonText.classList.remove('hidden');
        buttonSpinner.classList.add('hidden');
    }
});
