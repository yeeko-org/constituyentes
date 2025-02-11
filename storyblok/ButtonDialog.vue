<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import MaterialList from "./MaterialList"
import DocumentList from "./DocumentList"

const { xs } = useDisplay()

const props = defineProps({
  blok: Object
})

const dialog = ref(false)

function openDialog() {
  console.log('openDialog')
  dialog.value = true
}

function closeDialog() {
  dialog.value = false
}

const max_width = computed(() =>
  props.blok.display_list === 'MemberJoin' ? '500px' : '850px'
)

const size = computed(() =>
  props.blok.size
  // props.blok.size === 'x-large'
  //   ? (xs.value ? 'large' : undefined)
  //   : 'small'
)

const variant = computed(() =>{
  if (props.fixed_variant)
    return props.fixed_variant
  return props.blok.style || 'flat'
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

const description = computed(() => {
  return renderRichText(props.blok.content)
})

</script>

<template>
  <v-btn
    :size="size"
    :variant="variant"
    :color="color"
    class="px-3 py-0 mx-2 my-2"
    id="button_new"
    :class="blok.style ? '' : 'white--text'"
    @click="openDialog"
    tile
  >
    {{ blok.button_title }}
    <v-dialog
      v-model="dialog"
      :max-width="max_width"
      class="rounded-xl"
    >
      <v-card class="_rounded-xl">
        <v-toolbar class="text-center pr-5" elevation="6">
<!--          <v-spacer></v-spacer>-->
          <v-toolbar-title class="font-weight-bold">
            {{ blok.title_dialog || 'Título' }}
          </v-toolbar-title>
<!--          <v-spacer></v-spacer>-->
        </v-toolbar>
        <v-card-text>
          <MaterialList v-if="blok.display_list === 'Materials'" />
          <DocumentList v-else-if="blok.display_list === 'OfficialDocs'" />
          <FormGossip
            v-else-if="blok.display_list === 'FormGossip'"
            is_dialog
            @close-dialog="closeDialog"
          />
          <div
            v-else
            v-editable="blok"
            v-html="description"
            class="rich_text"
          >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<style scoped lang="scss">
.rich_text {
  white-space: pre-wrap;
  ::v-deep(p) {
    min-height: 0.5rem;
    margin-bottom: 0.5rem;
  }
}
</style>