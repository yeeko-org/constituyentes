<script setup>
import { computed, ref, onMounted } from 'vue'
// import { useMainStore } from '~/store/index'
import {useSblokStore} from "~/store/sblok.js";
import { storeToRefs } from 'pinia'

const sblockStore = useSblokStore()
const { global_config } = storeToRefs(sblockStore)
const props = defineProps({
  blok: Object,
})

const is_mounted = ref(false)

onMounted(() => {
  // console.log('global_config 1', global_config.value)
  is_mounted.value = true
})

const main_blok = computed(() => {
  if (props.blok) return props.blok
  // console.log('global_config 2', global_config.value)
  const global_c = global_config.value
  if (global_c && global_c.footer && global_c.footer.length > 0)
    return global_c.footer[0]
})

const description = computed(() => {
  return renderRichText(main_blok.value.description)
})
function wantOpenLink(url) {
  if (!url) return
  if (!url.url) return
  window.open(url.url, '_blank')
}

</script>

<template>
  <v-footer
    v-if="is_mounted"
    padless
    id="app"
    v-editable="blok"
    color="secondary"
    class="py-6"
    style="width: 100%;"
  >
    <v-row
      v-if="main_blok"
      class="app-width2"
    >
      <v-col
        cols="8"
        md="4"
        offset="2"
        offset-md="0"
        class="text-left pa-8"
      >
        <v-img
          src="~/assets/logo_cuadrado.png"
          :height="'100%'"
          :width="'100%'"
          max-height="280"
        />
      </v-col>
      <v-col
        cols="12"
        md="8"
        class="text-left pa-8 text-justify d-flex flex-column justify-center lato"
      >
        <div
          v-html="description"
          class="text-body-2 text-sm-body-1 py-2 lato"
        ></div>
        <v-divider
          v-if="main_blok.contact_email || main_blok.social_networks.length > 0"
          color="white" class="my-1"
        ></v-divider>
        <div v-if="main_blok.contact_email" class="lato">
          <b>Contacto:</b> {{ main_blok.contact_email }}
        </div>
        <div class="mt-4">
          <v-btn
            v-for="net in main_blok.social_networks"
            :key="net._uid"
            align="end"
            class="mr-4 text-primary"
            icon
            variant="tonal"
            @click="wantOpenLink(net.url)"
            color="white"
          >
            <v-avatar
              v-if="net.logo"
              size="default"
            >
              <img
                :src="resizeImg(net.logo, 80)"
                :alt="net.icon"
                :height="24"
              >
            </v-avatar>
            <v-icon v-else size="large" color="white">
              user
            </v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped lang="scss">

</style>