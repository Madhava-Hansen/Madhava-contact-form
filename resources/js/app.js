require('./bootstrap');

window.addEventListener('DOMContentLoaded', () => {

  const state = {
    name: '',
    phone: '',
    email: '',
    reason: '',
    message: '',
    hasEmailError: false,
    hasNameError: false,
    hasPhoneError: false
  }

  const emailValidationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const nameInput = document.querySelector('.ContactForm-name');
  const emailInput = document.querySelector('.ContactForm-email');
  const phoneInput = document.querySelector('.ContactForm-phone');
  const reasonInput = document.querySelector('.ContactForm-reason');
  const messageInput = document.querySelector('.ContactForm-message');
  const submitButton = document.querySelector('.ContactForm-submitButton');
  const emailError = document.querySelector('.ContactForm-emailError');
  const phoneError = document.querySelector('.ContactForm-phoneError');
  const nameError = document.querySelector('.ContactForm-nameError');

  const validateEmail = () =>
    emailValidationRegex.test(state.email.toLowerCase());

  const handleSubmit = () => {
    if (!validateEmail()) {
      emailError.style.visibility = 'visible';
      emailInput.classList.add('ContactForm-inputErrorMode');
      state.hasEmailError = true;
    }
    if (!state.name) {
      nameError.style.visibility = 'visible';
      nameInput.classList.add('ContactForm-inputErrorMode');
      state.hasNameError = true;
    }
    if (!state.phone) {
      phoneError.style.visibility = 'visible';
      phoneInput.classList.add('ContactForm-inputErrorMode');
      state.hasPhoneError = true;
    }
  }

  submitButton.addEventListener('click', e => {
    handleSubmit();
  })

  nameInput.addEventListener('change', e => {
    state.name = e.target.value;
    if (state.hasNameError && state.name) {
      nameError.style.visibility = 'hidden';
      nameInput.classList.remove('ContactForm-inputErrorMode');
      state.nameError = false;
    }
  });

  emailInput.addEventListener('change', e => {
    state.email = e.target.value;
    if (state.hasEmailError && validateEmail()) {
      emailError.style.visibility = 'hidden';
      emailInput.classList.remove('ContactForm-inputErrorMode');
      state.emailError = false;
    }
  });

  phoneInput.addEventListener('change', e => {
    state.phone = e.target.value;
    if (state.hasPhoneError && state.phone) {
      phoneError.style.visibility = 'hidden';
      phoneInput.classList.remove('ContactForm-inputErrorMode');
      state.phoneError = false;
    }
  });

  reasonInput.addEventListener('change', e => {
    state.reason = e.target.value;
  });

  messageInput.addEventListener('change', e => {
    state.message = e.target.value;
  });

});

