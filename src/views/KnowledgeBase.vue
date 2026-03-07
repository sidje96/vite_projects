<script setup>
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="bg-custom-color">
        <h2>Kennisbase</h2>
      </v-col>
      <v-col cols="12">
        <v-card-title>Modificaties</v-card-title>
        <v-dialog>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              block
              v-bind="activatorProps"
              prepend-icon="mdi-package"
            >
              Modificaties
            </v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card
              prepend-icon="mdi-package"
              text="Bij gemodificeerde dingen: vul het formulier in"
              title="Modificatie"
            >
              <template v-slot:actions>
                <v-btn
                  prepend-icon="mdi-close"
                  class="ml-auto"
                  text="Sluiten"
                  @click="isActive.value = false"
                ></v-btn>
              </template>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
      <v-col cols="12">
        <v-dialog>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              block
              v-bind="activatorProps"
              prepend-icon="mdi-package"
            >
              Slot Activator
            </v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card
              prepend-icon="mdi-package"
              text="When using the activator slot, you must bind the slot props to the activator element."
              title="Slot Activator"
            >
              <template v-slot:actions>
                <v-btn
                  prepend-icon="mdi-close"
                  class="ml-auto"
                  text="Sluiten"
                  @click="isActive.value = false"
                ></v-btn>
              </template>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
      <v-col cols="12">
        <v-dialog>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              block
              v-bind="activatorProps"
              prepend-icon="mdi-package"
            >
              Slot Activator
            </v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card
              prepend-icon="mdi-package"
              text="When using the activator slot, you must bind the slot props to the activator element."
              title="Slot Activator"
            >
              <template v-slot:actions>
                <v-btn
                  prepend-icon="mdi-close"
                  class="ml-auto"
                  text="Sluiten"
                  @click="isActive.value = false"
                ></v-btn>
              </template>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
      <v-col cols="12">
        <v-dialog>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              block
              v-bind="activatorProps"
              prepend-icon="mdi-package"
            >
              Slot Activator
            </v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card
              prepend-icon="mdi-package"
              text="When using the activator slot, you must bind the slot props to the activator element."
              title="Slot Activator"
            >
              <template v-slot:actions>
                <v-btn
                  prepend-icon="mdi-close"
                  class="ml-auto"
                  text="Sluiten"
                  @click="isActive.value = false"
                ></v-btn>
              </template>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
      <v-col cols="12">
        <v-dialog>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              block
              v-bind="activatorProps"
              prepend-icon="mdi-package"
            >
              Slot Activator
            </v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card
              prepend-icon="mdi-package"
              text="When using the activator slot, you must bind the slot props to the activator element."
              title="Slot Activator"
            >
              <template v-slot:actions>
                <v-btn
                  prepend-icon="mdi-close"
                  class="ml-auto"
                  text="Sluiten"
                  @click="isActive.value = false"
                ></v-btn>
              </template>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
      <v-divider/>
      <v-card-title>Schade</v-card-title>
      <v-col cols="12">
        <v-dialog>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              block
              v-bind="activatorProps"
              prepend-icon="mdi-handcuffs"
            >
              Geweld melden bij politie
            </v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card
              prepend-icon="mdi-handcuffs"
              text="Bij schade veroorzaakt door geweld, bent u verplicht de politie in te lichten"
              title="Geweld"
            >
              <template v-slot:actions>
                <v-btn
                  prepend-icon="mdi-close"
                  class="ml-auto"
                  text="Sluiten"
                  @click="isActive.value = false"
                ></v-btn>
              </template>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>  
</template>