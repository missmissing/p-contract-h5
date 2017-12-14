import {
  Input,
  InputNumber,
  Table,
  TableColumn,
  Icon,
  Row,
  Col,
  Card,
  Scrollbar
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
  Search
} from 'mint-ui';

export default (Vue) => {
  //element-ui
  Vue.use(Input);
  Vue.use(InputNumber);
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(Icon);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Card);
  Vue.use(Scrollbar);
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
};
