<template>
  <router-view v-slot="{ Component, route }">

    <v-slide-x-transition v-if="['Login', 'TwoFactor'].includes(String(route.name))">
      <component :is="Component" :key="route.fullPath" />
    </v-slide-x-transition>

    <component v-else :is="Component" :key="route.fullPath" />

  </router-view>
</template>
