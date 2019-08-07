import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Index from '../components/Index'
import UserDocument from "../components/user/UserDocument";
import CardList from "../components/card/CardList";
import CardTransferHistory from "../components/card/CardTransferHistory";
import Role from "../components/user/Role";
import MenuAuthority from "../components/user/MenuAuthority";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: "/index",
      name: "Index",
      component: Index,
      hidden: true,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/user-manager/documents',
          name: 'UserDocument',
          component: UserDocument
        }, {
          path: '/user-manager/roles',
          name: 'Role',
          component: Role
        }, {
          path: '/user-manager/menu-authority',
          name: 'MenuAuthority',
          component: MenuAuthority
        }, {
          path: '/card-manager/card',
          name: 'CardList',
          component: CardList
        }, {
          path: '/card-manager/transfer',
          name: 'CardTransferHistory',
          component: CardTransferHistory
        }]
    }
  ]
})
