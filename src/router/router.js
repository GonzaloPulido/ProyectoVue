import { createRouter, createWebHashHistory } from 'vue-router'
import Inicio from '../pages/Inicio.vue'
import Circuitos from '../pages/Circuitos.vue'
import Contacto from '../pages/Contacto.vue'
import Equipos from '../pages/Equipos.vue'
import Error from '../pages/Error.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Piloto from '../pages/Piloto.vue'
import Pilotos from '../pages/Pilotos.vue'
import Perfil from '../pages/Perfil.vue'
import Favoritos from '../pages/Favoritos.vue'

const routes = [
    {
        path: '/',
        name: 'Inicio',
        component: Inicio,
    },
    {
        path: '/circuitos',
        name: 'Circuitos',
        component: Circuitos
    },
    {
        path: '/contacto',
        name: 'Contacto',
        component: Contacto
    },
    {
        path: '/equipos',
        name: 'Equipos',
        component: Equipos
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/piloto/:id',
        name: 'Piloto',
        component: Piloto
    },
    {
        path: '/pilotos',
        name: 'Pilotos',
        component: Pilotos
    },
    {
        path: '/perfil',
        name: 'Perfil',
        component: Perfil
    },
    {
        path: '/favoritos',
        name: 'Favoritos',
        component: Favoritos
    },
    {
        path: '/:catchAll(.*)',
        name: 'Error',
        component: Error,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router