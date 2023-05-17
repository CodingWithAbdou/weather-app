<template>
  <Teleport to="body">
    <Transition name="perant-model">
      <div
        v-show="modelBounce"
        class="absolute w-full h-screen bg-black flex justify-center bg-opacity-40 top-0 left-0"
      >
        <Transition name="child-model">
          <div
            v-if="modelBounce"
            class="bg-white z-50 self-start mt-20 text-black p-4 max-w-md rounded leading-5"
          >
            <slot></slot>
            <button
              @click="$emit('isClicked')"
              class="bg-weater-primary px-6 py-2 mt-8 text-white rounded-md"
            >
              CLose
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  modelBounce: String,
  default: false,
});
defineEmits(["isClicked"]);
</script>

<style scoped>
.perant-model-enter-active,
.perant-model-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.perant-model-enter-from,
.perant-model-leave-to {
  opacity: 0;
}

.child-model-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.child-model-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.child-model-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.child-model-leave-to {
  transform: scale(0.5);
}
</style>
