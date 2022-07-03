<template>
    <div class="bg-white">
    <div class="max-w-2xl mx-auto py-8 sm:py-18 lg:max-w-7xl">
      <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">Products for today</h2>
      <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="product in state.products" :key="product.id" class="group relative">
            <Product :product="product"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Product from './Product.vue';
import {reactive, onBeforeMount} from 'vue';
import {FakeStoreApi} from '@/utils/apis.js';

export default {
    components: {
        Product
    },
    setup() {
        const state = reactive({
            products: []
        });

        const getProducts = async ()=> {
            let products = [];
            const response = await FakeStoreApi.getProducts();
            if (response.status == 200) {
                products = response.data.map(
                    ({id, title, description, image, price, rating}) => ({
                        id, title, description, image, price,
                        rating: rating.rate
                    }))
            }
            return products;
        }

        onBeforeMount(async ()=> {
            state.products = await getProducts();
        })
        return {
            state
        }
    }
}
</script>
