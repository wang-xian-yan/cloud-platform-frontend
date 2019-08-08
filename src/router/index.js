import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Index from '../components/Index'
import User from "../components/consumer/User";
import CardList from "../components/card/CardList";
import CardTransferHistory from "../components/card/CardTransferHistory";
import Role from "../components/consumer/Role";
import MenuAuthority from "../components/consumer/MenuAuthority";
import Enterprise from "../components/consumer/Enterprise";

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
          path: '/consumers/enterprises',
          name: 'Enterprise',
          component: Enterprise
        }, {
          path: '/consumers/users',
          name: 'User',
          component: User
        }, {
          path: '/consumers/roles',
          name: 'Role',
          component: Role
        }, {
          path: '/consumers/menu-authority',
          name: 'MenuAuthority',
          component: MenuAuthority
        }, {
          path: '/cards/list',
          name: 'CardList',
          component: CardList
        }, {
          path: '/cards/transfer',
          name: 'CardTransferHistory',
          component: CardTransferHistory
        }]
    }
  ]
})
