<script>
    export default {
        name: 'tabs',
        props: {
            value: {
                type: [String, Number],
                require: true
            }
        },
        render(h){
            // return (
            //     <div class ='tabs'>
            //         <ul class = 'tabs-header'>
            //             {this.$slots.default}
            //         </ul>
            //     </div>
            // )
        }
    };
</script>