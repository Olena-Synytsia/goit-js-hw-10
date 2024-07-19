import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const btn = document.querySelector('button');
const secondsElement = document.querySelector('span.value[data-seconds]');
const minutesElement = document.querySelector('span.value[data-minutes]');
const hoursElement = document.querySelector('span.value[data-hours]');
const daysElement = document.querySelector('span.value[data-days]');

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
    const selectedDate = selectedDates[0];

    if (selectedDate.getTime() < Date.now()) {
      btn.disabled = true;
      iziToast.error({
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'red',
        message: 'Please choose a date in the future',
      });
    } else {
      btn.disabled = false;
    }
  },
};

const datetimePicker = flatpickr('#datetime-picker', options);
