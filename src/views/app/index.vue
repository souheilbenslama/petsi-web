<template>
<div id="app-container" :class="getMenuType">
    <sidebar />
    <main>
        <div class="container-fluid">
            <router-view />
        </div>
    </main>
    <footer-component/>
</div>
</template>

<script>
import Sidebar from '@/containers/Sidebar'
import Footer from '@/containers/Footer'
import {
    mapGetters
} from 'vuex'

export default {
    components: {
        'sidebar': Sidebar,
        'footer-component': Footer
    },
    data() {
        return {
            show: false
        }
    },
    computed: {
        ...mapGetters(['getMenuType'])
    }
}
</script>
