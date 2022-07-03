<template>
    <div class="w-64 grid grid-cols-2">
    <span class="my-auto">Currency:</span>
    <Listbox v-model="state.selectedCurrency.code" class="my-auto">
        <div class="relative mt-1">
            <ListboxButton class="relative w-full cursor-default rounded-lg 
                bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none 
                focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white 
                focus-visible:ring-opacity-75 focus-visible:ring-offset-2 
                focus-visible:ring-offset-orange-300 sm:text-sm">
            <span class="block truncate">{{ state.selectedCurrency.code }}</span>
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
            </ListboxButton>

            <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <ListboxOptions
                class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md 
                bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 
                focus:outline-none sm:text-sm">
                <ListboxOption
                v-slot="{ active, selected }"
                v-for="(currency, key) in state.currencyCodes"
                :key="key"
                :value="currency"
                as="template"
                @click="()=>changeCurrency(currency)">
                <li
                    :class="[
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-10 pr-4',
                    ]">
                    <span
                    :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate',
                    ]">{{ currency }}</span>
                    <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                </li>
                </ListboxOption>
            </ListboxOptions>
            </transition>
        </div>
    </Listbox>
  </div>
</template>
<script>
import {reactive, onBeforeMount} from 'vue';
import {useStore} from 'vuex';
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

export default {
    components: {
        Listbox, ListboxButton, 
        ListboxOptions, ListboxOption,
        CheckIcon, SelectorIcon
    },
    setup() {
        const store = useStore();
        const state = reactive({
            currencyCodes: store.getters['currency/currencyCodes'],
            selectedCurrency: store.getters['currency/toCurrency']
        });
        const changeCurrency = (code) => {
            store.dispatch('currency/changeCurrency', code);
        }

        onBeforeMount(()=> {
            store.dispatch('currency/initializeCurrencyRates');
        });

        return {
            state, changeCurrency
        }
    },
}
</script>
