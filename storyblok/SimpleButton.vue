<script setup>
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const props = defineProps({
  blok: Object
})

const size = computed(() => {
  // :x-large="$breakpoint.is.smAndUp && blok.size == 'x-large'"
  // :large="($breakpoint.is.xs && blok.size == 'x-large') || blok.size == 'large'"
  // :small="blok.size == 'x-large'"
  console.log("blok.to", props.blok.to)
  return props.blok.size === 'x-large'
    ? (xs.value ? 'large' : undefined)
    : 'small'
})
const variant = computed(() =>
  // :outlined="blok.style == 'outlined'"
  // :text="blok.style == 'text'"
  props.blok.style === 'outlined'
    ? 'outlined'
    : props.blok.style === 'text'
    ? 'text'
    : 'elevated'
)

function goToLink() {
  console.log('goToLink', props.blok.to)
  const url = props.blok.to.cached_url || props.blok.to.url
  window.open(url, '_blank')
}

</script>

<template>

  <v-btn
    :size="size"
    variant="flat"
    :color="blok.color || 'black'"
    class="px-3 py-0 mx-2 my-2"
    id="button_new"
    :class="blok.style ? '' : 'white--text'"
    @click="goToLink"

    tile
  >
    {{blok.button_title}}
  </v-btn>
<!--  <span-->
<!--    :size="size"-->
<!--    variant="flat"-->
<!--    :color="blok.color || 'black'"-->
<!--    class="px-3 py-0 mx-2 my-2"-->
<!--    id="button_new"-->
<!--    :class="blok.style ? '' : 'white&#45;&#45;text'"-->
<!--    _click="openDialog"-->
<!--    :to="blok.to.cached_url || blok.to.url"-->
<!--    tile-->
<!--  >-->
<!--    {{blok.button_title}}-->
<!--  </span>-->

</template>