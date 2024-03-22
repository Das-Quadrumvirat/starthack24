<style>
  .loader {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 4em;
    /* width:  /em; */
    margin-left: 3rem;
  }

  .circle {
    width: 0.5em;
    height: 0.5em;
    margin: 0 0.125em;
    border-radius: 50%;
    background-color: #B0B0B0;
  }

  @keyframes loader1 {
    0%, 100% {
      background-color: #B0B0B0;
    }

    30% {
      background-color: #303030;
    }

    99% {
      background-color: #303030;
    }
  }

  @keyframes loader2 {
    0%, 30%, 100% {
      background-color: #B0B0B0;
    }

    60% {
      background-color: #303030;
    }

    99% {
      background-color: #303030;
    }
  }

  @keyframes loader3 {
    0%, 60%, 100% {
      background-color: #B0B0B0;
    }

    90% {
      background-color: #303030;
    }

    99% {
      background-color: #303030;
    }
  }

  .circle:nth-child(1) {
    animation: loader1 2s infinite ease-in;
  }

  .circle:nth-child(2) {
    animation: loader2 2s infinite ease-in;
  }

  .circle:nth-child(3) {
    animation: loader3 2s infinite ease-in;
  }
</style>

<div class="loader">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
