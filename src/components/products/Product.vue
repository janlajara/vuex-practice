<template>
    <div v-if="product != null">
        <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
            <img :src="product.image"  class="w-full h-full object-center object-cover lg:w-full lg:h-full" />
            </div>
            <div class="mt-4 flex justify-between">
            <div>
                <h3 class="text-sm text-gray-700">
                    <p class="">{{ product.title }}</p>
                </h3>
            </div>
            <p class="text-sm font-medium text-gray-900">{{ convert(product.price) }}</p>
        </div>
    </div>
</template>
<script>
import {useStore} from 'vuex';

export default {
    props: {
        product: Object
    },
    setup() {
        const store = useStore();
        const convert = (amount) => {
            return store.getters['currency/convert'](amount);
        }
        return {
            convert
        }
    }
}
</script>
