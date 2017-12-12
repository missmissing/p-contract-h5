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
  Button,
  Cell,
  Navbar,
  TabItem,
  TabContainer,
  TabContainerItem,
  Field
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
  Vue.component(Button.name, Button);
  Vue.component(Cell.name, Cell);
  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);
  Vue.component(Field.name, Field);
};
