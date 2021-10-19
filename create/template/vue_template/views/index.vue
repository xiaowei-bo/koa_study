<template>
    <div>vue demo</div>
</template>

<script>
export default {
    data() {
        return {
            
        };
    },
    methods: {
        async getDemo() {
            const res = await this.$http({
                url: "/api/demo/index.paper",
                method: "GET"
            });
            console.log(res);
        }
    },
    created() {
        this.getDemo();
    }
};
</script>

<style lang='scss' scoped>
</style>