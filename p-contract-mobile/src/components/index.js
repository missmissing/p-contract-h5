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
  TabContainer,
  TabContainerItem
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
  Vue.use(Button);
  Vue.use(Cell);
  Vue.use(TabContainer);
  Vue.use(TabContainerItem);
};
