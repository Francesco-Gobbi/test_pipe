<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import WelcomeItem from './WelcomeItem.vue'
import AwsIcon from './icons/AwsIcon.vue'
import PythonIcon from './icons/PythonIcon.vue'
import JavascriptIcon from './icons/JavascriptIcon.vue'
import TerraformIcon from './icons/TerraformIcon.vue'
import ProjectsIcon from './icons/ProjectsIcon.vue'
import PricingIcon from './icons/PricingIcon.vue'
</script>

<template>
  <section class="main-content">
    <WelcomeItem>
      <template #icon>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        </svg>
      </template>
      <template #heading>Chi Sono</template>

      Mi chiamo Gobbi Francesco e sono un Developer.

      <div class="skills-logos">
        <!-- Loghi delle tecnologie -->
        <AwsIcon />
        <PythonIcon />
        <JavascriptIcon />
        <TerraformIcon />
      </div>
    </WelcomeItem>

    <!-- Sezione Progetti -->
    <WelcomeItem>
      <template #icon>
        <!-- Icona Progetti -->
        <ProjectsIcon />
      </template>
      <template #heading>Progetti</template>

      Dai un'occhiata ai miei progetti su
      <a href="https://github.com/Gobbi-Francesco" target="_blank" rel="noopener">GitHub</a>.
    </WelcomeItem>

    <!-- Sezione Pricing -->
    <WelcomeItem>
      <template #icon>
        <!-- Icona Pricing -->
        <PricingIcon />
      </template>
      <template #heading>Servizi</template>

      Offro i seguenti servizi a pagamento:
      <ul>
        <li>Sviluppo Web</li>
        <li>Configurazione Infrastruttura Cloud con AWS e Terraform</li>
        <li>Servizi DevOps e Automazione</li>
      </ul>
    </WelcomeItem>
  </section>
</template>

<style scoped>

.main-content {
  padding: 2rem;
}

.skills-logos {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
</style>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  setup() {

  },
}
</script>
