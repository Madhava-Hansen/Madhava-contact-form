require('./bootstrap');

window.addEventListener('DOMContentLoaded', (event) => {

  const state = {
    name: '',
    phone: '',
    email: '',
    reason: '',
    message: ''
  }

  const emailValidationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const nameInput = document.querySelector('.ContactForm-name');
  const emailInput = document.querySelector('.ContactForm-email');
  const phoneInput = document.querySelector('.ContactForm-phone');
  const reasonInput = document.querySelector('.ContactForm-reason');
  const messageInput = document.querySelector('.ContactForm-message');

  const validateEmail = () =>
    emailValidationRegex.test(state.email.toLowerCase());

  const handleSubmit = () => {
    if (!validateEmail()) {
      const errorMessage = document.querySelector('.ContactForm-emailError');
    }
  }


  nameInput.addEventListener('change', e => {
    state.name = e.target.value;
  });

  emailInput.addEventListener('change', e => {
    state.email = e.target.value;
  });

  phoneInput.addEventListener('change', e => {
    state.phone = e.target.value;
  });

  reasonInput.addEventListener('change', e => {
    state.reason = e.target.value;
  });

  messageInput.addEventListener('change', e => {
    state.message = e.target.value;
    console.table(state);
  });

});

