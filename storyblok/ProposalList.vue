<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import {useSblokStore} from "~/store/sblok.js";

import { useDisplay } from 'vuetify'
const { xs, smAndUp } = useDisplay()
import {proposals, axis} from '~/composables/proposals.js'
import * as d3 from 'd3'

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

const modules = [Navigation, Pagination, Autoplay, EffectCoverflow];

dayjs.locale('es')
const sblockStore = useSblokStore()
// Store setup and state
const { all_documents } = storeToRefs(sblockStore)

// Props
const props = defineProps({
  blok: Object,
  init_documents: Array,
})

const typeDocuments = {
  "Informe quincenal": ['#dabdff', '#c192ff', 'secondary'],
  "Informe final": ['#feaabc', '#fd7291', 'pink'],
  "Informe": ['#dabdff', '#c192ff', 'purple'],
  "Comunicado": ['#516fce', '#001249', 'info'],
}

const proposals_hydrated = computed(() => {
  // console.log('proposals', proposals)
  // return []
  let idx = 0
  let full_proposals = proposals.map(doc => {
    doc.axis_data = axis.find(ax => ax.id === doc.axis)
    doc.idx = idx++
    return doc
  })
  // console.log('full_proposals', full_proposals)
  full_proposals.sort(() => Math.random() - 0.5)
  return full_proposals
})


</script>

<template>
  <SectionHeader
    v-for="blok in blok?.header"
    :key="blok._uid"
    :blok="blok"
    class="px-3"
  />
  <Swiper
    :modules="modules"
    :slides-per-view="3.2"
    :space-between="10"
    :loop="true"
    :navigation="true"
    :pagination="false"
    :autoplay="{ delay: 3000, disableOnInteraction: true }"
    class="my-swiper"
  >
    <SwiperSlide v-for="proposal in proposals_hydrated" :key="proposal.idx">
      <v-card
        class="my-2 mx-2"
        _width="300"
        style="width: 100%;"
      >
        <v-chip size="small" class="ma-2">
          {{proposal.axis_data.name}}
        </v-chip>
        <v-card-text class="pt-0">
          <b>Propuesta {{proposal.idx}}:</b>
          {{proposal.name}}
        </v-card-text>
      </v-card>

    </SwiperSlide>
  </Swiper>
  <div class="d-flex flex-wrap justify-center" v-if="false">
    <v-card
      v-for="proposal in proposals_hydrated"
      :key="proposal.idx"
      class="my-2 mx-2"
      width="300"
    >
      <v-chip size="small" class="ma-2">
        {{proposal.axis_data.name}}
      </v-chip>
      <v-card-text class="pt-0">
        <b>Propuesta {{proposal.idx + 1}}:</b>
        {{proposal.name}}
      </v-card-text>
    </v-card>
  </div>

</template>

<style scoped>
.carousel-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
