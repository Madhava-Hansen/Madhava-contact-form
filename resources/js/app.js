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
  const phoneNumberValidationRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

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

  const validatePhone = () => 
    phoneNumberValidationRegex.test(state.phone);

  const createContact = () => {
    return $.ajax({
      method: "POST",
      url: `/contact`,
      data: {
        name: state.name,
        phone: state.phone,
        email: state.email,
        reason: state.reason,
        message: state.message
      }
    });
  }

  const handleSubmit = () => {
    if (!validateEmail()) {
      triggerErrors('email');
    }
    if (!state.name) {
      triggerErrors('name');
    }
    if (!validatePhone()) {
      triggerErrors('phone');
    }
    if (state.hasEmailError || state.hasNameError || state.hasPhoneError) {
      return;
    } else {
      createContact().then((response) => {
        const form = document.querySelector('.ContactForm-formWrapper');
        form.style.opacity = 0;
        setTimeout(() => {
          const successMessage = document.querySelector('.ContactForm-successMessage');
          successMessage.style.zIndex = 1;
          successMessage.style.opacity = 1;
        }, 500);
      }).catch(error => {
        const errors = error.responseJSON.errors;
        for (let err in errors) {
          triggerErrors(err);
        }
      })
    }
  }

  const triggerErrors = name => {
    if (name === 'phone') {
      phoneError.style.visibility = 'visible';
      phoneInput.classList.add('ContactForm-inputErrorMode');
      state.hasPhoneError = true;
    } else if (name === 'email') {
      emailError.style.visibility = 'visible';
      emailInput.classList.add('ContactForm-inputErrorMode');
      state.hasEmailError = true;
    } else if (name === 'name') {
      nameError.style.visibility = 'visible';
      nameInput.classList.add('ContactForm-inputErrorMode');
      state.hasNameError = true;
    }
  }

  submitButton.addEventListener('click', e => {
    handleSubmit();
  })

  nameInput.addEventListener('change', e => {
    state.name = e.target.value;
    if (state.hasNameError && state.name) {
      state.hasNameError = false;
      nameError.style.visibility = 'hidden';
      nameInput.classList.remove('ContactForm-inputErrorMode');
    }
  });

  emailInput.addEventListener('change', e => {
    state.email = e.target.value;
    if (state.hasEmailError && validateEmail()) {
      state.hasEmailError = false;
      emailError.style.visibility = 'hidden';
      emailInput.classList.remove('ContactForm-inputErrorMode');
    }
  });

  phoneInput.addEventListener('change', e => {
    state.phone = e.target.value;
    if (state.hasPhoneError && state.phone) {
      state.hasPhoneError = false;
      phoneError.style.visibility = 'hidden';
      phoneInput.classList.remove('ContactForm-inputErrorMode');
    }
  });

  reasonInput.addEventListener('change', e => {
    state.reason = e.target.value;
  });

  messageInput.addEventListener('change', e => {
    state.message = e.target.value;
  });

});

