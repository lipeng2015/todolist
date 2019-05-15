import Vuex from 'vuex';
// 通过引入的方式可以进行数据拆分
import defaultState from './state/state';
import mutations from './mutations/mutations';
import getters from './getters/getters';
import actions from './actions/actions';



export default ()=>{
    return new Vuex.Store({
        // 初始化的值
        state: defaultState,
        // 修改值
        mutations,
        getters,
        actions
    });
}