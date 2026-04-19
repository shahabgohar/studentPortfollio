<template>
  <div class="vc-aura-bg fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div class="vc-aura-bg__base"></div>
    <div class="vc-orb vc-orb--amber"></div>
    <div class="vc-orb vc-orb--purple"></div>
    <div class="vc-orb vc-orb--orange"></div>
  </div>
</template>

<style scoped>
.vc-aura-bg__base {
  position: absolute;
  inset: 0;
  background-color: #0D0D0D;
}

.vc-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  will-change: transform;
}

.vc-orb--amber {
  width: 600px;
  height: 600px;
  top: -10%;
  left: -5%;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%);
  animation: vc-drift-1 25s ease-in-out infinite alternate;
}

.vc-orb--purple {
  width: 500px;
  height: 500px;
  bottom: -10%;
  right: -5%;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 70%);
  animation: vc-drift-2 30s ease-in-out infinite alternate;
}

.vc-orb--orange {
  width: 450px;
  height: 450px;
  top: 40%;
  right: 30%;
  background: radial-gradient(circle, rgba(255, 107, 53, 0.05) 0%, transparent 70%);
  animation: vc-drift-3 20s ease-in-out infinite alternate;
}

@keyframes vc-drift-1 {
  0% { transform: translate3d(0, 0, 0); }
  33% { transform: translate3d(80px, 40px, 0); }
  66% { transform: translate3d(-30px, 80px, 0); }
  100% { transform: translate3d(50px, -20px, 0); }
}

@keyframes vc-drift-2 {
  0% { transform: translate3d(0, 0, 0); }
  33% { transform: translate3d(-60px, -50px, 0); }
  66% { transform: translate3d(40px, -30px, 0); }
  100% { transform: translate3d(-20px, 60px, 0); }
}

@keyframes vc-drift-3 {
  0% { transform: translate3d(0, 0, 0); }
  33% { transform: translate3d(50px, -60px, 0); }
  66% { transform: translate3d(-70px, 20px, 0); }
  100% { transform: translate3d(30px, 50px, 0); }
}
</style>
