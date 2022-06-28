<template>
    <div class="tableBox">
        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                :max-height="maxHeight"
                @selection-change="handleSelectionChange">
            <el-table-column v-if="selection" type="selection"></el-table-column>
            <el-table-column type="index" label="序号" width="80px" :index="indexMethod">
            </el-table-column>
            <template v-for="(item,index) in tableKey">
                <slot v-if="item.slot" :name="item.slot"></slot>
                <el-table-column v-else
                        :key="index"
                        :prop="item.prop"
                        :label="item.label"
                        :width="item.width?item.width:''"
                        :show-overflow-tooltip="item.tooltip?item.tooltip:false"
                >
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "tableBox",
        props:{
            pageIndex:{
              default:1
            },
            tableData:{
                type:Array,
                default:[]
            },
            tableKey:{
                type:Array,
                default:[{prop:''}],
                required:true
            },
            selection:{
              type:Boolean,
              default:true
            },
            maxHeight:{
                type:[String,Number]
            }
        },
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {
            handleSelectionChange(v){
                this.$emit('handleSelectionChange',v)
            },
            indexMethod(index){
                return (this.pageIndex-1) * 10+index+1;//当前条数
            },
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less">
    @import url("../../css/common.less");
    .tableBox {
        cursor:pointer;
        th,td{
            text-align:center;
            padding:.16rem 0;
        }
        th{
            background:#cbe5f3;
            div{
                .f20();
                font-weight:400;
            }
        }
        td{
            div{
                .f18();
                span{
                    .f18()
                }
            }
            div.isedit span{
                color:#409EFF;
                margin-right:.1rem;
            }
        }
        /*暂无数据*/
        .el-table__empty-text{
            .f18();
        }
    }
</style>
<style lang="less">

</style>