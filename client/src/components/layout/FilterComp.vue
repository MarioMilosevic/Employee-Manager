<template>
  <section class="section">
    <h3 class="section__title">
      <slot name="title"/>
    </h3>
    <RenderlessComp class="section__options">
        <template v-for="option in props.options" :key="option" #[option]>
          <OptionButton>
            {{ option }}
          </OptionButton>
        </template>
    </RenderlessComp>
</section>
</template>

<script setup lang="ts">
import RenderlessComp from 'src/components/layout/RenderlessComp.vue';
import OptionButton from 'src/components/layout/OptionButton.vue';
import { PropType } from 'vue';

const props = defineProps({
  options: {
    type: Array as PropType<string[]>,
    required:true
  }
})

console.log(props.options)

</script>

<style scoped lang="scss">

@use 'src/scss/abstracts/_variables' as *;
.section {
  grid-column: 1 / 3;
  /* display: flex; */
  /* flex-direction: column; */
  border: 1px solid black;
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: $medium;
margin-bottom: $medium;

&__title {
  grid-column: 1/3;
}


  &__options {
    border: 1px solid white;
  }
}

</style>