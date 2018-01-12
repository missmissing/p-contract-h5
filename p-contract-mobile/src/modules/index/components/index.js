import {
  Table,
  TableColumn
} from 'element-ui';
import {
  Header,
  Button,
  Cell,
  Tabbar,
  TabItem,
  Navbar,
  TabContainer,
  TabContainerItem,
  Field,
  Popup,
  Search,
  Actionsheet
} from 'mint-ui';

import RsTabs from './rs-tabs.vue';
import RsTabItem from './rs-tab-item.vue';

export default (Vue) => {
  //element-ui
  Vue.use(Table);
  Vue.use(TableColumn);
  //mint-ui
  Vue.component(Header.name, Header);
  Vue.component(Button.name, Button);
  Vue.component(Cell.name, Cell);
  Vue.component(Tabbar.name, Tabbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component(Navbar.name, Navbar);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);
  Vue.component(Field.name, Field);
  Vue.component(Popup.name, Popup);
  Vue.component(Search.name, Search);
  Vue.component(Actionsheet.name, Actionsheet);

  Vue.component(RsTabs.name, RsTabs);
  Vue.component(RsTabItem.name, RsTabItem);
};
