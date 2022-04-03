<template>
    <button @click="increment">Count is {{ count }}, and the double value is {{ doubleCount }}</button>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const counterStore = useCounterStore()

const {count, doubleCount} = storeToRefs(counterStore)

const { increment } = counterStore

</script>

<style>
button {
    font-weight: bold;
}
</style>