import pdSelectItem from './selectitem.vue'
import pdSelectBox from './selectBox.vue'

const components = [
  pdSelectItem,
  pdSelectBox
];
const install = function (Vue) {
  if (install.installed) return
  components.map(component => {
    Vue.component(component.name, component)
  });
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
  }
};
export default{
  install,
  components,
  pdSelectItem,
  pdSelectBox
}
