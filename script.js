document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements - Forms
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    // DOM Elements - Inputs
    const regNameInput = document.getElementById('reg-name');
    const regEmailInput = document.getElementById('reg-email');
    const regPasswordInput = document.getElementById('reg-password');
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');

    // DOM Elements - Status Messages
    const registerStatus = document.getElementById('register-status');
    const loginStatus = document.getElementById('login-status');

    // DOM Elements - Logged In Area
    const loggedInArea = document.getElementById('logged-in-area');
    const userDisplayName = document.getElementById('user-display-name');
    const btnLogout = document.getElementById('btn-logout');
    const btnDelete = document.getElementById('btn-delete');

    // DOM Elements - Navigation Buttons
    const navBtnCadastro = document.getElementById('nav-btn-cadastro');
    const navBtnLogin = document.getElementById('nav-btn-login');

    // Navigation Scrolling
    navBtnCadastro.addEventListener('click', () => {
        document.getElementById('card-cadastro').scrollIntoView({ behavior: 'smooth' });
        regNameInput.focus();
    });

    navBtnLogin.addEventListener('click', () => {
        document.getElementById('card-login').scrollIntoView({ behavior: 'smooth' });
        loginEmailInput.focus();
    });

    // Check Initial State on Page Load
    function checkInitialState() {
        const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));
        const loggedInUser = localStorage.getItem('loggedInUser');

        if (registeredUser) {
            // Show register success status
            registerStatus.textContent = 'Cadastro realizado com sucesso!';
            registerStatus.classList.remove('hidden');

            if (loggedInUser && loggedInUser === registeredUser.name) {
                // Show login success state
                loginStatus.textContent = 'Login realizado com sucesso!';
                loginStatus.classList.remove('hidden');
                
                // Show logged in area
                userDisplayName.textContent = loggedInUser;
                loggedInArea.classList.remove('hidden');
            }
        }
    }

    // Register Form Handler
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = regNameInput.value.trim();
        const email = regEmailInput.value.trim();
        const password = regPasswordInput.value;

        // Perform basic validations (HTML handles most, but we double-check)
        if (!name || !email || !password) {
            return;
        }

        if (password.length < 6) {
            registerStatus.textContent = 'A senha deve ter no mínimo 6 caracteres.';
            registerStatus.classList.remove('hidden');
            return;
        }

        // Store user in localStorage
        const user = { name, email, password };
        localStorage.setItem('registeredUser', JSON.stringify(user));

        // Update Register Card status
        registerStatus.textContent = 'Cadastro realizado com sucesso!';
        registerStatus.classList.remove('hidden');

        // Update Login Card status
        loginStatus.textContent = 'Agora faça login com o usuário cadastrado.';
        loginStatus.classList.remove('hidden');

        // Clear register fields
        registerForm.reset();

        // If a different user was logged in, log them out
        localStorage.removeItem('loggedInUser');
        loggedInArea.classList.add('hidden');
    });

    // Login Form Handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = loginEmailInput.value.trim();
        const password = loginPasswordInput.value;

        const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

        if (!registeredUser) {
            loginStatus.textContent = 'E-mail ou senha incorretos.';
            loginStatus.classList.remove('hidden');
            loggedInArea.classList.add('hidden');
            return;
        }

        // Validate credentials (case-insensitive for email, case-sensitive for password)
        const isEmailMatch = registeredUser.email.toLowerCase() === email.toLowerCase();
        const isPasswordMatch = registeredUser.password === password;

        if (isEmailMatch && isPasswordMatch) {
            // Success
            loginStatus.textContent = 'Login realizado com sucesso!';
            loginStatus.classList.remove('hidden');

            // Save session
            localStorage.setItem('loggedInUser', registeredUser.name);

            // Display welcome area
            userDisplayName.textContent = registeredUser.name;
            loggedInArea.classList.remove('hidden');
            
            // Clear login form inputs
            loginForm.reset();
            
            // Scroll to welcome area
            setTimeout(() => {
                loggedInArea.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            // Fail
            loginStatus.textContent = 'E-mail ou senha incorretos.';
            loginStatus.classList.remove('hidden');
            loggedInArea.classList.add('hidden');
        }
    });

    // Logout Button Handler
    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        loggedInArea.classList.add('hidden');
        
        // Clear login card state/inputs
        loginStatus.textContent = 'Agora faça login com o usuário cadastrado.';
        loginForm.reset();
    });

    // Delete Registration Handler
    btnDelete.addEventListener('click', () => {
        // Clear localStorage
        localStorage.removeItem('registeredUser');
        localStorage.removeItem('loggedInUser');

        // Hide logged in area
        loggedInArea.classList.add('hidden');

        // Clear all status messages
        registerStatus.textContent = '';
        registerStatus.classList.add('hidden');
        loginStatus.textContent = '';
        loginStatus.classList.add('hidden');

        // Reset forms
        registerForm.reset();
        loginForm.reset();
        
        // Scroll back to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Run initial state check
    checkInitialState();
});
