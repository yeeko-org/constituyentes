<script setup>
import { ref } from 'vue'
import { resizeImg, transformImage } from '~/composables/storyblok_images.js'

const props = defineProps({
  blok: Object
})

const loading = ref(false)
const showAll = ref(false)

const final_color = computed(() => {
  return props.blok.background_color?.color || 'grey-lighten-5'
})

</script>

<template>
  <v-sheet v-editable="blok" style="width: 100%;" :color="final_color">

    <v-row>
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

        <v-row class="pb-6 mx-0">
          <v-col
            v-for="member in blok.members"
            :key="member._uid"
            cols="6"
            sm="4"
            md="3"
          >
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                flat
                rounded="xl"
                color="#d1d7855e"
                class="d-flex flex-column justify-space-between px-1 pt-3"
                v-bind="props"
              >
                <v-img
                  :src="resizeImg(member.profile_img, 300)"
                  aspect-ratio="1"
                  class="grey lighten-2"
                ></v-img>
                <v-card-text>
                  <h2 class="text-h6" :class="`text-${blok.name_color || 'white'}`">
                    {{ member.full_name }}
                  </h2>
                </v-card-text>

                <v-overlay
                  :model-value="!!isHovering"
                  class="align-center text-body-2 text-white"
                  scrim="#036358"
                  opacity="0.7"
                  contained
                >
                  <div class="px-2 text-justify">
                    {{ member.biography?.substr(0, 350) }}
                  </div>
                </v-overlay>
              </v-card>
            </v-hover>
          </v-col>

          <v-col cols="12" align="center" v-if="false">
            <v-btn color="accent" @click="showAll = true">
              Ver todos
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-sheet>

</template>