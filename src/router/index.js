import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Index from '../components/Index'
import User from "../components/consumer/User";
import CardList from "../components/card/CardList";
import CardTransferHistory from "../components/card/CardTransferHistory";
import Role from "../components/authority/Role";
import Enterprise from "../components/consumer/Enterprise";
import UpdatePassword from "../components/account/UpdatePassword";
import LoginHistoryLog from "../components/system/LoginHistoryLog";
import SystemPackage from "../components/packages/SystemPackage";
import MessageCenter from "../components/account/MessageCenter";
import CardReport from "../components/reports/CardReport";
import RechargeReport from "../components/reports/RechargeReport";
import UserReport from "../components/reports/UserReport";
import AccountBasic from "../components/account/AccountBasic";
import SystemPropertySetting from "../components/system/SystemPropertySetting";
import EmailSend from "../components/system/EmailSend";
import Menu from "../components/authority/Menu";
import FileResource from "../components/system/FileResource";
import OperatorLog from "../components/system/OperatorLog";

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
          path: '/account-basic',
          name: 'AccountBasic',
          component: AccountBasic
        }, {
          path: '/message-center',
          name: 'MessageCenter',
          component: MessageCenter
        },
        {
          path: '/reset-password',
          name: 'UpdatePassword',
          component: UpdatePassword
        },
        {
          path: '/cards/list',
          name: 'CardList',
          component: CardList
        }, {
          path: '/cards/transfer',
          name: 'CardTransferHistory',
          component: CardTransferHistory
        }, {
          path: '/packages/system',
          name: 'SystemPackage',
          component: SystemPackage
        },

        {
          path: '/consumers/enterprises',
          name: 'Enterprise',
          component: Enterprise
        }, {
          path: '/consumers/users',
          name: 'User',
          component: User
        }, {
          path: '/authorities/roles',
          name: 'Role',
          component: Role
        }, {
          path: '/authorities/menus',
          name: 'Menu',
          component: Menu
        }, {
          path: '/reports/card',
          name: 'CardReport',
          component: CardReport
        }, {
          path: '/reports/user',
          name: 'UserReport',
          component: UserReport
        }, {
          path: '/reports/recharge',
          name: 'RechargeReport',
          component: RechargeReport
        }, {
          path: '/systems/login-history',
          name: 'LoginHistoryLog',
          component: LoginHistoryLog
        }, {
          path: '/systems/property-setting',
          name: 'SystemPropertySetting',
          component: SystemPropertySetting
        }, {
          path: '/systems/email-send',
          name: 'EmailSend',
          component: EmailSend
        }, {
          path: '/systems/file-resources',
          name: 'FileResource',
          component: FileResource
        }, {
          path: '/systems/operator-logs',
          name: 'OperatorLog',
          component: OperatorLog
        }]
    }
  ]
})
