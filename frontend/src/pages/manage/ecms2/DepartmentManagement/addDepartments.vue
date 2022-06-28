<template>
  <div class="addDepartments">
    <!--弹框-->
    <transition name="slide-fade">
      <div class="alert-window2" v-show="isaddDepartments">
        <div class="main">
          <img class="imgloge" src="../images/CaseManagement/casemanage.png" />
          <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
          <AlertleftTile :text="text" :text2="text2" />
          <div class="contentid">
            <el-form :label-position="labelPosition" :model="formLabelAlign">
              <el-form-item label="部门名称">
                <el-input v-model="formLabelAlign.departmentName"></el-input>
              </el-form-item>
              <el-form-item label="是否业务部门" class="casecss">
                <el-select v-model="formLabelAlign.businessDepartment" placeholder="请选择">
                  <el-option
                    v-for="item in businessDepartmentoption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="formLabelAlign.description"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="bt">
            <div class="qure" @click="qure">
              <img src="../images/courtsupervision/sure.png" />确定
            </div>

            <div class="cancel" @click="cancel">
              <img src="../images/courtsupervision/cancel.png" />取消
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
    
    <script>
import $ from "jquery";
import AlertleftTile from "../component/AlertleftTile";

export default {
  name: "addDepartments",
  props: {
    isaddDepartments: Boolean,
    businessDepartmentvalue: Boolean,
    description: String,
    departmentName: String
  },
  components: {
    AlertleftTile
  },
  data() {
    return {
      labelPosition: "left", //form表单左侧靠齐
      text: "添加部门",
      text2: "填写基本信息",
      businessDepartmentoption: [
        {
          value: 1,
          label: "是"
        },
        {
          value: 0,
          label: "否"
        }
      ], //是否业务部门
      formLabelAlign: {
        departmentName: "", //部门名称
        businessDepartment: "", //是否业务部门
        description: "" //描述
      }
    };
  },
  beforeCreate() {},
  created() {},
  mounted() {},
  watch: {
    description(val) {
      this.formLabelAlign.description = val;
    },
    businessDepartmentvalue(val) {
      this.formLabelAlign.businessDepartment = !!val ? 1 : 0;
    },
    departmentName(val) {
      this.formLabelAlign.departmentName = val;
    }
  },
  destroyed() {},
  methods: {
    //注册弹框显示与否事件
    showAlert() {
      this.$emit("Relatedcaseshow");
    },
    qure() {
      console.log(this.departmentName);
      if (
        !!this.description ||
        !!this.businessDepartmentvalue ||
        !!this.departmentName
      ) {
        this.$emit("update", this.formLabelAlign);
      } else {
        this.$emit("sure", this.formLabelAlign);
      }
    },
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>
    
    <style lang="less">
@import url("../css/common.less");
.addDepartments {
  /*弹框*/
  .main {
    width: 8rem;
    padding: 0 0.8rem;
    box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, 0.2),
      5px -3px 3px 0 rgba(38, 78, 119, 0.2);
    /*min-height:6.85rem;*/
    background: #fff;
    position: absolute;
    left: 60%;
    top: 1.5rem;
    margin-left: -7rem;
    /*margin-top:-3.425rem;*/
    border-radius: 2px;
    /*左上方login*/
    img.imgloge {
      position: absolute;
      top: 0.2rem;
      left: 0.2rem;
      width: 0.4rem;
    }
    /*关闭弹框*/
    img.alert-close {
      width: 0.18rem;
      position: absolute;
      top: 0.25rem;
      right: 0.35rem;
      cursor: pointer;
      z-index: 102;
    }
    .contentid {
      width: 100%;
      background: #eceff0;
      min-height: 4rem;
      padding: 0.5rem 0.2rem;
      /*label*/
      .el-form-item__content {
        margin-left: 1.5rem !important;
      }
      .el-form-item__label {
        width: 1.5rem !important;
        .f18();
      }
      .el-tabs__item {
        /*padding: 0 .2rem;*/
        /*height: .4rem;*/
        /*line-height: .4rem;*/
        font-size: 0.18rem !important;
      }
    }
    .up {
      width: 100%;
      /*分页*/
      .page {
        margin: 0.2rem 0;
        span {
          .f18();
        }
        input {
          .f18();
        }
        text-align: center;
        li.number {
          .f18();
        }
      }
    }
    /*底部*/
    .bt {
      width: 100%;
      margin: 0.2rem 0;
      & > div {
        cursor: pointer;
        .f20();
        line-height: 0.3rem;
      }
      img {
        width: 0.2rem;
        margin-right: 0.05rem;
      }
      .fc();
      .qure {
        color: #45a1d1;
        margin-right: 0.5rem;
      }
    }
  }
}
</style>