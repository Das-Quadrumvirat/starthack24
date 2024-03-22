<style>/* Container for the loader */
.loader {
  display: flex;
  justify-content: start;
  align-items: center;
  height: 4em;
  /* width:  /em; */
  margin-left: 3rem;
}

/* Circle elements */
.circle {
  width: 0.5em;
  height: 0.5em;
  margin: 0 0.125em;
  border-radius: 50%;
  background-color: #111;
  animation: wave 1s infinite ease-in-out;
  transition: background-color 0.3s ease;
}

/* Animation */
@keyframes wave {
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-0.5rem);
  }
}

/* Delay for each circle */
.circle:nth-child(1) {
  animation-delay: 0s;
}

.circle:nth-child(2) {
  animation-delay: 0.2s;
}

.circle:nth-child(3) {
  animation-delay: 0.4s;
}

.circle:nth-child(4) {
  animation-delay: 0.6s;
}

.circle:nth-child(5) {
  animation-delay: 0.8s;
}
  </style>

<div class="loader">
  <div class="circle" tabindex="0"></div>
  <div class="circle" tabindex="0"></div>
  <div class="circle" tabindex="0"></div>
  <div class="circle" tabindex="0"></div>
  <div class="circle" tabindex="0"></div>
</div>
