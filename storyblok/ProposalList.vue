<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import {useSblokStore} from "~/store/sblok.js";

import { useDisplay } from 'vuetify'
const { xs, smAndUp, mobile } = useDisplay()
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

onMounted(() => {
  console.log("mobile", mobile.value)
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

  <div class="my-swiper">
    <Swiper
      :modules="modules"
      :slides-per-view="smAndUp ? 3.2 : 1.2"
      :space-between="10"
      :loop="true"
      :navigation="true"
      :pagination="false"
      :autoplay="{ delay: 3000, disableOnInteraction: true }"

    >
      <SwiperSlide
        v-for="proposal in proposals_hydrated"
        :key="proposal.idx"
      >
        <v-card
          class="my-2 mx-2"
          _style="width: 100%;"
        >
          <v-chip
            _size="small"
            class="ma-2"
            :color="blok.chip_color || 'primary'"
            variant="outlined"
          >
            {{proposal.axis_data.name}}
          </v-chip>
          <v-card-text class="pt-0 text-body-1">
            <b>Propuesta {{proposal.idx}}:</b>
            {{proposal.name}}
          </v-card-text>
        </v-card>
      </SwiperSlide>
    </Swiper>
  </div>

</template>

<style scoped>
.carousel-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.my-swiper {
  max-width: 100%;
}

@media (max-width: 500px) {
  .my-swiper {
    max-width: 400px;
  }
}
@media (max-width: 600px) {
  .my-swiper {
    max-width: 400px;
  }
}
</style>
