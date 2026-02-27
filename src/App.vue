<template>
  <router-view/>
</template>

<style>
.v-btn--variant-elevated {
  --v-shadow-key-umbra-opacity: hsla(177, 100%, 34%, 0.4);
  --v-shadow-key-penumbra-opacity: hsla(177, 100%, 34%, 0.3);
  --v-shadow-key-ambient-opacity: hsla(177, 100%, 34%, 0.2);
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px hsl(0, 0%, 12%) inset !important;
  -webkit-text-fill-color: white !important;
  -webkit-text-stroke-color: white !important;
}

</style>