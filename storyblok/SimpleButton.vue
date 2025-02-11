<script setup>
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const props = defineProps({
  blok: Object,
  fixed_size: String,
  fixed_variant: String,
  fixed_color: String,
})

const size = computed(() => {
  // :x-large="$breakpoint.is.smAndUp && blok.size == 'x-large'"
  // :large="($breakpoint.is.xs && blok.size == 'x-large') || blok.size == 'large'"
  // :small="blok.size == 'x-large'"
  console.log("blok.to", props.blok.to)
  if (props.fixed_size)
    return props.fixed_size
  return props.blok.size
  // return props.blok.size === 'x-large'
  //   ? (xs.value ? 'large' : undefined)
  //   : 'small'
})


const variant = computed(() => {
  // :outlined="blok.style == 'outlined'"
  // :text="blok.style == 'text'"
  if (props.fixed_variant)
    return props.fixed_variant
  return 'flat'
  // props.blok.style === 'outlined'
  //   ? 'outlined'
  //   : props.blok.style === 'text'
  //   ? 'text'
  //   : 'elevated'
})

const color = computed(() => {
  if (props.fixed_color)
    return props.fixed_color
  return props.blok.color || 'black'
})

function goToLink() {
  console.log('goToLink', props.blok.to)
  const url = props.blok.to.cached_url || props.blok.to.url
  window.open(url, '_blank')
}

</script>

<template>

  <v-btn
    :size="size"
    :variant="variant"
    :color="color"
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