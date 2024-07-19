import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btnStart = document.querySelector('button[data-start]');
const secondsElement = document.querySelector('span.value[data-seconds]');
const minutesElement = document.querySelector('span.value[data-minutes]');
const hoursElement = document.querySelector('span.value[data-hours]');
const daysElement = document.querySelector('span.value[data-days]');
const datetimePicker = document.getElementById('datetime-picker');

let userSelectedDate = null;
let timerInterval = 0;

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < new Date()) {
      btnStart.disabled = true;
      iziToast.error({
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'red',
        message: 'Please choose a date in the future',
      });
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

btnStart.addEventListener('click', timerStart);

function timerStart() {
  btnStart.disabled = true;
  datetimePicker.disabled = true;

  if (timerInterval) {
    clearInterval(timerInterval);
  }
  timerInterval = setInterval(() => {
    const now = new Date();
    const timeLeft = userSelectedDate - now;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      datetimePicker.disabled = false;
      btnStart.disabled = false;
      resetTimer();
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateTimerDisplay({ days, hours, minutes, seconds });
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDisplay(time) {
  const days = addLeadingZero(time.days);
  const hours = addLeadingZero(time.hours);
  const minutes = addLeadingZero(time.minutes);
  const seconds = addLeadingZero(time.seconds);

  daysElement.textContent = days;
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;
}

function resetTimer() {
  btnStart.disabled = false;
  datetimePicker.disabled = false;
  daysElement.textContent = '00';
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
}
