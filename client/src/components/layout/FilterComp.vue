<template>
  <section class="section">
    <h3 class="section__title">
      <slot name="title"/>
    </h3>
    <RenderlessComp class="section__options">
        <template v-for="(option, index) in props.options" :key="option" #[option]>
          <ActionButton :color="index === selectedIndex ? 'purple' : 'white'" @click="mario(index)">
            {{ option }}
          </ActionButton>
        </template>
    </RenderlessComp>
</section>
</template>

<script setup lang="ts">
import RenderlessComp from 'src/components/layout/RenderlessComp.vue';
import ActionButton from 'src/components/layout/ActionButton.vue';
import { PropType, ref } from 'vue';


const selectedIndex = ref<number>(0)


const props = defineProps({
  options: {
    type: Array as PropType<string[]>,
    required:true
  }
})

console.log(props.options)

const mario = (index:number) => {
  console.log(index)
selectedIndex.value = index
}

</script>

<style scoped lang="scss">

@use 'src/scss/abstracts/_variables' as *;
.section {
  grid-column: 1 / 3;
display: grid;
/* background-color: red; */
background-color: #35184a;
padding: $medium;
grid-template-columns: repeat(2, 1fr);
gap: $medium;
margin-bottom: $medium;
border-radius: $medium-radius;

&__title {
  grid-column: 1/3;
}


  &__options {
    border: 1px solid white;
  }
}

</style>