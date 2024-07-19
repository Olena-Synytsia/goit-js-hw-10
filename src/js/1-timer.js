import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.getElementById('#datetime-picker');
const btnStart = document.querySelector('button');
const secondsElement = document.querySelector('span.value[data-seconds]');
const minutesElement = document.querySelector('span.value[data-minutes]');
const hoursElement = document.querySelector('span.value[data-hours]');
const daysElement = document.querySelector('span.value[data-days]');

let userSelectedDate = 0;

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

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

flatpickr('#datetime-picker', options);
btnStart.addEventListener('click', timerStart);

function timerStart() {
  btnStart.disabled = true;
  datetimePicker.disabled = true;
  startCountdown();
}

function startCountdown() {
  const timerInterval = setInterval(() => {
    const timeLeft = getTimeDifference(userSelectedDate);

    updateTimerDisplay(timeLeft);

    if (timeLeft.total <= 0) {
      clearInterval(timerInterval);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
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
