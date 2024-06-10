import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/signin',
		name: 'signin',
		component: SignInView,
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
