<template>
    <v-sheet class="d-flex flex-sm-row flex-column justify-center align-center ga-10" min-height="100%" theme="custom-color">
        <v-btn
            size="x-large"
            class="text-h6 px-8 py-6"
            prepend-icon="mdi-plus"
            height="20vh"
            :to="{ name: 'Form'}"
            >
            Nieuwe inspectie
            </v-btn>

            <v-btn
            size="x-large"
            class="text-h6 px-8 py-6"
            prepend-icon="mdi-check"
            height="20vh"
            width="252.46"
            :to="{ name: 'Completed'}"
            >
            Afgerond
        </v-btn>
    </v-sheet>  
</template>