<script setup>
import { ref } from 'vue'
import { resizeImg, transformImage } from '~/composables/storyblok_images.js'

const props = defineProps({
  blok: Object
})

const loading = ref(false)
const showAll = ref(false)

</script>

<template>
  <v-row v-editable="blok">
    <v-col cols="12">
      <SectionHeader
        v-for="blok in blok?.header"
        :key="blok._uid"
        :blok="blok"
        class="px-3"
      />
    </v-col>

    <v-container fluid>
      <v-card-actions v-if="loading">
        <v-spacer></v-spacer>
        <v-progress-circular color="accent" :value="30" indeterminate>
          Cargando
        </v-progress-circular>
        <v-spacer></v-spacer>
      </v-card-actions>

      <v-row>
        <v-col
          v-for="member in blok.members"
          :key="member._uid"
          class="d-flex child-flex px-2"
          cols="6"
          sm="4"
          md="3"
        >
          <v-card flat tile class="d-flex">
            <v-hover v-slot:default="{ hover }">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-img
                    :src="resizeImg(member.profile_img, 300)"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  ></v-img>
                  <v-fade-transition>
                    <v-overlay
                      v-if="hover"
                      absolute
                      style="overflow: hidden; vertical-align: top;"
                      color="#036358"
                      class="text-body-2"
                    >
                      <div>{{ member.biography?.substr(0, 300) }}</div>
                    </v-overlay>
                  </v-fade-transition>
                </v-col>
                <v-col cols="12" align-self="center">
                  <div class="text-subtitle-1 primary--text font-weight-bold">
                    {{ member.full_name }}
                  </div>
                </v-col>
              </v-row>
            </v-hover>
          </v-card>
        </v-col>

        <v-col cols="12" align="center" v-if="false">
          <v-btn color="accent" @click="showAll = true">
            Ver todos
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>