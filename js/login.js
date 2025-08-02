// Importações do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// ============================
// Configuração Firebase
// ============================
const firebaseConfig = {
  apiKey: "AIzaSyAWlLRvbcxZQvjzW7KT4A7Ls-iJ0I4BAGI",
  authDomain: "fb-maq.firebaseapp.com",
  projectId: "fb-maq",
  storageBucket: "fb-maq.firebasestorage.app",
  messagingSenderId: "782633097930",
  appId: "1:782633097930:web:281c9ac26470939449b233"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ============================
// Lógica para alternar visibilidade da senha
// ============================
const togglePassword = document.getElementById('toggle-password');
const passwordInput = document.getElementById('password');
const eyeOpen = document.getElementById('eye-open');
const eyeClosed = document.getElementById('eye-closed');

togglePassword.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  eyeOpen.classList.toggle('hidden');
  eyeClosed.classList.toggle('hidden');
});

// ============================
// Lógica de login com Firebase
// ============================
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');
const submitButton = loginForm.querySelector('button[type="submit"]');
const buttonText = submitButton.querySelector('.button-text');
const buttonSpinner = submitButton.querySelector('.button-spinner');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita o reload da página
  errorMessage.classList.add('hidden'); // Oculta erros anteriores

  // Desabilita botão e mostra spinner
  submitButton.disabled = true;
  buttonText.classList.add('hidden');
  buttonSpinner.classList.remove('hidden');

  // Captura dados do formulário
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('remember-me').checked;

  // Define persistência da sessão
  const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;

  try {
    // Define persistência
    await setPersistence(auth, persistence);

    // Tenta logar com email/senha
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Login bem-sucedido:', userCredential.user);

    // Redireciona para menu após login
    window.location.href = './pages/menu.html';

  } catch (error) {
    // Tratamento de erros
    console.error("Erro no login:", error.code);

    switch (error.code) {
      case 'auth/invalid-credential':
        errorMessage.textContent = 'Email ou senha inválidos.';
        break;
      default:
        errorMessage.textContent = 'Ocorreu um erro ao fazer login.';
    }

    errorMessage.classList.remove('hidden');

  } finally {
    // Restaura estado do botão
    submitButton.disabled = false;
    buttonText.classList.remove('hidden');
    buttonSpinner.classList.add('hidden');
  }
});
