export default {
    // 可以异步操作
    updateCountAsync(store,data){
        setTimeout(()=>{
            store.commit('updateCount',data.num);
        },data.time);
    }
}