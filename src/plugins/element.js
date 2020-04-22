import Vue from 'vue'
import { Button } from 'element-ui'
// 按需导入组件
import { Form, FormItem } from 'element-ui'
import { Input, Message } from 'element-ui'
import {
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Pagination,
  Footer,
  Carousel,
  CarouselItem,
  Checkbox
} from 'element-ui'
// 注册 全局可用
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Pagination)
Vue.use(Footer)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Checkbox)
// 把message 挂载到vue原型组件中 这样 全局都可以使用this.$message使用
Vue.prototype.$message = Message