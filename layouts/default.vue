<script setup>

import {nextTick, onMounted} from "vue";
import {useSblokStore} from "~/store/sblok.js";
const storyblokApi = useStoryblokApi();

const { $preview } = useNuxtApp()

const sblockStore = useSblokStore()
const { setDocuments, setAllDocuments, setGlobalConfig } = sblockStore

// const version = $preview ? 'draft' : 'published'
const version = 'draft'

onMounted(() => {
  nextTick(() => {
    // storyblokApi.get(
    //   `cdn/stories/documents`,
    //   {
    //     version: version,
    //   }
    // ).then(({data}) => {
    //   // console.log("data", data);
    //   setDocuments(data.story.content);
    //   // documents.value = data.story.content;
    // });
    // storyblokApi.getAll(
    storyblokApi.getStories({
        version: version,
        starts_with: "report/"
      }
    ).then(({data}) => {
      console.log("data all_documents", data);
      setAllDocuments(data.stories);
      // documents.value = data.story.content;
    });
    storyblokApi.get(
      `cdn/stories`,
      {
        version: version,
        starts_with: "global"
      }
    ).then(({data}) => {
      if (data.stories.length)
        setGlobalConfig(data.stories[0].content);
    });
  });
});

</script>

<template>
  <v-app >
    <MainNav />
    <v-responsive max-width="1024" class="mx-auto">
    <v-main class="" id="app-width">
      <v-container class="px-1 px-sm-3" fluid>
        <NuxtPage />
      </v-container>
    </v-main>
    </v-responsive>
    <Footer />
  </v-app>
</template>

<style lang="scss">
@use '../assets/css/utils.scss' as *;
</style>
