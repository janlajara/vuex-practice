<template>
    <div class="m-4 md:m-8 lg:m-12">
        <div class="md:flex md:justify-between">
            <span class="text-5xl font-bold">Test Store</span>
            <CurrencySelect class="my-auto"/>
        </div>
        <ProductList/>
    </div>
</template>
<script>
import CurrencySelect from '@/components/currency/CurrencySelect.vue';
import ProductList from '@/components/products/ProductList.vue';

export default {
    components: {
        CurrencySelect, ProductList
    },
    setup() {
        
    },
}
</script>
