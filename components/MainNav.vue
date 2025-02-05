<script setup>

// import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import {computed} from "vue";
const { xs, mdAndUp, smAndDown } = useDisplay()
import {useSblokStore} from "~/store/sblok.js";
import { storeToRefs } from 'pinia'

const sblockStore = useSblokStore()
const { global_config } = storeToRefs(sblockStore)

const props = defineProps({
  blok: Object,
  is_editable: Boolean,
})

//       logo: null, // require("@/assets/logo.png"),
// const logo = ref(null)
// const menu = ref(false)
// const font_size = computed(() => xs.value ? 12 : 14)

const main_blok = computed(() => {
  if (props.blok) return props.blok
  // console.log('global_config 2', global_config.value)
  const global_c = global_config.value
  if (global_c && global_c.header && global_c.header.length > 0)
    return global_c.header[0]
})

const full_objectives = [
  {
    name: 'objetivo1',
    button_title: 'Objetivo 1',
  },
  {
    name: 'objetivo2',
    button_title: 'Objetivo 2',
  },
  {
    name: 'objetivo3',
    button_title: 'Objetivo 3',
  },
]

const final_buttons = computed(() => {
  if (!main_blok.value) return []
  console.log("main_blok.buttons", main_blok.value.buttons)
  return main_blok.value.buttons
})

const all_buttons = [
  {
    title: 'Agenda',
    link: '/agenda',
  },
  {
    title: 'Integrantes',
    link: '/integrantes',
  },
  {
    title: 'Caravana',
    link: '/caravana',
  },
  {
    title: 'Encuentros',
    link: '/encuentros',
  },
  {
    title: 'Capacitación',
    link: '/capacitacion',
  },
]

</script>

<template>
  <v-app-bar
    color="primary"
    height="60"
    app
    class="_app-width2"
    v-editable="blok"
  >
    <div
      class="px-3"
    >
      <router-link to="/" class="d-flex align-center">
<!--          src="~/assets/constituyentes_branding_logo_gif.gif"-->
        <v-img
          src="~/assets/logo_principal.png"
          :height="xs ? 64 : 76"
          :width="xs ? 264 : 276"
        />
<!--        <v-img-->
<!--          class="ml-3"-->
<!--          src="~/assets/letras.png"-->
<!--          :height="xs ? 60 : 70"-->
<!--          :width="xs ? 190 : 220"-->
<!--        />-->
      </router-link>
    </div>
    <v-spacer></v-spacer>
    <div>
      <v-menu
        v-if="false"
        transition="slide-y-transition"
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            variant="text"
            color="secondary"
            v-on="on"
          >
            Agenda
            <v-icon>expand_more</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="objective in full_objectives"
            :key="objective.name"
            _href="/objective/${objective}`"
          >
            <v-list-item-title
              class="subtitle-1 accent--text"
            >{{objective.button_title}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <template
        v-if="final_buttons.length"
      >
        <StoryblokComponent
          v-for="blok in final_buttons"
          :key="blok._uid"
          :blok="blok"
          fixed_size="default"
          fixed_variant="text"
          fixed_color="white"
        ></StoryblokComponent>
      </template>

<!--      <v-btn-->
<!--        v-for="button in all_buttons"-->
<!--        variant="text"-->
<!--        color="white"-->
<!--      >-->

<!--        {{ button.title }}-->
<!--      </v-btn>-->
    </div>
  </v-app-bar>
</template>

<style lang="scss">
.header-xs{
  margin-left: -10px
}

.app-width2{
  margin-left: auto;
  margin-right: auto;
  max-width: 1024px;
}

</style>
