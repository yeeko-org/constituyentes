<script setup>
import { onMounted, ref, nextTick } from 'vue'
import {useSblokStore} from "~/store/sblok.js";
const { $preview } = useNuxtApp()
// const version_sb = process.env.NUXT_PUBLIC_STORYBLOK_VERSION
// const version = $preview ? 'draft' : 'published'
const version = 'draft'
// console.log("version", version)
const story = await useAsyncStoryblok(
    'home',
    { version: version },
{ customParent: 'https://app.storyblok.com' }
)
const sblockStore = useSblokStore()
const { setDocuments, setGlobalConfig } = sblockStore
const storyblokApi = useStoryblokApi();

useSeoMeta({
  title: 'Constituyentes',
  ogTitle: 'Constituyentes',
  description: 'Constituyentes es un espacio democrático para repensar,' +
    'proponer y transformar las dinámicas políticas, sociales y económicas',
  ogDescription: 'Constituyentes es un espacio democrático para repensar,' +
      'proponer y transformar las dinámicas políticas, sociales y económicas',
  ogType: 'website',
  ogImage: 'https://oej.yeeko.org/_nuxt/nuevo_logo.ChaL5KSF.png',
})


</script>

<template>
  <StoryblokComponent
    v-if="story" :blok="story.content"
  />
</template>
