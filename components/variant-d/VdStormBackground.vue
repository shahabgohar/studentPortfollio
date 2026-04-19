<script setup lang="ts">
</script>

<template>
  <div class="vd-storm-bg fixed inset-0" style="z-index: 0;">
    <!-- Base gradient -->
    <div class="absolute inset-0" style="background: linear-gradient(180deg, #050510 0%, #0A0A2A 50%, #050510 100%);" />

    <!-- Storm clouds -->
    <div class="vd-clouds absolute inset-0 overflow-hidden pointer-events-none">
      <div class="vd-cloud vd-cloud-1" />
      <div class="vd-cloud vd-cloud-2" />
      <div class="vd-cloud vd-cloud-3" />
      <div class="vd-cloud vd-cloud-4" />
    </div>

    <!-- Rain -->
    <div class="vd-rain absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="i in 40" :key="i" class="vd-raindrop" :style="{
        left: `${(i * 2.5) + Math.random() * 2}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${0.6 + Math.random() * 0.4}s`,
        opacity: 0.06 + Math.random() * 0.08
      }" />
    </div>
  </div>
</template>

<style scoped>
.vd-cloud {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.12;
}

.vd-cloud-1 {
  width: 600px;
  height: 200px;
  background: #1a1a3a;
  top: 5%;
  left: -5%;
  animation: vd-drift-1 30s ease-in-out infinite alternate;
}

.vd-cloud-2 {
  width: 500px;
  height: 180px;
  background: #151530;
  top: 15%;
  right: -10%;
  animation: vd-drift-2 35s ease-in-out infinite alternate;
}

.vd-cloud-3 {
  width: 700px;
  height: 220px;
  background: #0d0d25;
  top: 40%;
  left: 20%;
  animation: vd-drift-3 40s ease-in-out infinite alternate;
}

.vd-cloud-4 {
  width: 400px;
  height: 150px;
  background: #1a1a3a;
  bottom: 20%;
  right: 10%;
  animation: vd-drift-1 25s ease-in-out infinite alternate-reverse;
}

@keyframes vd-drift-1 {
  0% { transform: translateX(0) translateY(0); }
  100% { transform: translateX(80px) translateY(15px); }
}

@keyframes vd-drift-2 {
  0% { transform: translateX(0) translateY(0); }
  100% { transform: translateX(-60px) translateY(20px); }
}

@keyframes vd-drift-3 {
  0% { transform: translateX(0) translateY(0); }
  100% { transform: translateX(50px) translateY(-10px); }
}

.vd-raindrop {
  position: absolute;
  top: -10%;
  width: 1px;
  height: 30px;
  background: linear-gradient(180deg, transparent, rgba(100, 150, 255, 0.3), transparent);
  animation: vd-rain-fall linear infinite;
}

@keyframes vd-rain-fall {
  0% { transform: translateY(-100vh); }
  100% { transform: translateY(110vh); }
}
</style>
