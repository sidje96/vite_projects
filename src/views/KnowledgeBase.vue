<script setup>
const pageData = [
  {
    name: "Modificaties",
    items: [
      {
        icon: "mdi-hand-saw",
        title: "Modificaties",
        text: "Bij gemodificeerde dingen: vul het formulier in"
      },
      {
        icon: "mdi-hammer",
        title: "Monteur",
        text: "Bij professionele geïnstalleerde modificaties door een monteur, controleer en inspecteer dit dan zorgvuldig en vraag eventueel een keuring aan"
      }
    ]
  },
  {
    name: "Schade",
    items: [
      {
        icon: "mdi-handcuffs",
        title: "Geweld melden bij politie",
        text: "Bij schade veroorzaakt door geweld, bent u verplicht de politie in te lichten"
      },
      {
        icon: "mdi-check-outline",
        title: "Controle door professional",
        text: "Bij schade altijd laten controleren of deze geen acute gevaren opleveren"
      }
    ]
  },
  {
    name: "Achterstallig onderhoud",
    items: [
      {
        icon: "mdi-wrench-clock",
        title: "Soort achterstallig onderhoud",
        text: "Altijd bij het melden van achterstallig onderhoud vermelden wat voor soort onderhoud het is"
      }
    ]
  }
]

</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="bg-custom-color">
        <h2>Kennisbase</h2>
      </v-col>

      <template v-for="(category, cIndex) in pageData" :key="cIndex">

        <!-- Titel -->
        <v-col cols="12">
          <v-card-title>{{ category.name }}</v-card-title>
        </v-col>

        <!-- Items -->
        <v-col
          v-for="(item, index) in category.items"
          :key="index"
          cols="12"
        >
          <v-dialog>
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                block
                v-bind="activatorProps"
                :prepend-icon="item.icon"
              >
                {{ item.title }}
              </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card
                :prepend-icon="item.icon"
                :title="item.title"
                :text="item.text"
              >
                <template v-slot:actions>
                  <v-btn
                    prepend-icon="mdi-close"
                    class="ml-auto"
                    text="Sluiten"
                    @click="isActive.value = false"
                  />
                </template>
              </v-card>
            </template>
          </v-dialog>
        </v-col>

        <!-- Divider tussen categorieën, behalve na de laatste -->
        <v-col cols="12" v-if="cIndex < pageData.length - 1">
          <v-divider />
        </v-col>

      </template>
    </v-row>
  </v-container>
</template>
