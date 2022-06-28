<template>
  <div class="DepartmentManagement">
    <checkMembers
      :ischeckMembers="ischeckMembers"
      :departmentId="childdepartmentId"
      @Relatedcaseshow="ischeckMembers=false"
      @sure="ischeckMembers=false"
      @cancel="ischeckMembers=false"
    ></checkMembers>
    <addDepartments
      :departmentName="departmentName"
      :businessDepartmentvalue="businessDepartment"
      :description="description"
      :isaddDepartments="isaddDepartments2"
      @Relatedcaseshow="isaddDepartments2=false"
      @sure="addEventFormSubmitBtn"
      @update="updateEventFormSubmitBtn"
      @cancel="isaddDepartments2=false"
    ></addDepartments>
    <div class="head">
      <leftTile :imgurl="imgurl" :text="text" :text2="text2" />
    </div>
    <div class="isedit">
      <el-button @click="addevent" type="text">增加子部门</el-button>
      <el-button @click="updateEventForm" type="text">修改部门</el-button>
      <el-button @click="removeEvent" type="text">删除部门</el-button>
      <el-button @click="lookcheckMembers" type="text">查看部门成员</el-button>
    </div>
    <el-row>
      <div class="cont">
        <el-tree
          :data="data4"
          ref="tree"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          highlight-current="true"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
    </el-row>
  </div>
</template>
<script>
import TreeRender from "./tree_render";
import leftTile from "../component/leftTile"; //主页左侧头部
import addDepartments from "../DepartmentManagement/addDepartments"; //添加权限弹框
import checkMembers from "../DepartmentManagement/checkmember"; //添加权限弹框
import $ from "jquery";
export default {
  name: "Roleprivilege",
  //注册子组件
  components: {
    leftTile,
    addDepartments,
    checkMembers
  },
  props: {
    ischeckMembers: Boolean,
    isaddDepartments: Boolean
  },
  data() {
    return {
      choicecourtstatues: false, //判断是否选择部门
      departmentName: null, //传给子组件的部门名字
      businessDepartment: null,
      description: null, //传给子组件的介绍
      addEventdialogVisible: true,
      Node: null, //节点组件本身
      NodeData: null, //节点对应的 Node
      object: null, //传递给 data 属性的数组中该节点所对应的对象
      childdepartmentId: null,
      imgurl: require("../images/CaseManagement/案件信息管理图标.png"),
      text: "部门管理",
      text2: "BU MEN GUAN LI",
      addEventForm: {
        categoryName: "",
        categoryFlag: ""
      },
      ischeckMembers: false,
      isaddDepartments2: false,
      //树组件的数据
      eventCategoryTree: [
        {
          id: 1,
          label: "一级 1",
          addAble: true, //根据后台给的是否可添加节点，也可以根据当前的node节点自行判断
          delAble: false, //根据后台给的是否可删除节点，也可以根据当前的node节点自行判断
          parentId: "",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              addAble: true,
              delAble: true,
              parentId: "1"
            },
            {
              id: 5,
              label: "二级 2-1",
              addAble: true,
              delAble: true,
              parentId: "1"
            },
            {
              id: 6,
              label: "二级 2-2",
              addAble: true,
              delAble: true,
              parentId: "1"
            }
          ]
        }
      ],
      data4: [
        {
            departmentId:"",
          departmentName: "",
          childs: []
        }
      ],
      //树配置
      defaultProps: {
        children: "childs",
        label: "departmentName"
      }
    };
  },
  created() {
    this.getDepartmentTreeNodes();
  },
  mounted() {},
  destroyed() {},
  methods: {
    //保存节点参数
    handleNodeClick(s, d, n) {
      this.object = s;
      this.NodeData = d;
      this.Node = n;
      this.choicecourtstatues = true;
    },
    //9.14获取部门树结构
    getDepartmentTreeNodes() {
      let _this = this;
      _this.$http
        .post("/departmentManager/getDepartmentTreeNodes", {})
        .then(data => {
          console.log(data);
          if (data.code === 200) {
            this.data4[0].childs = data.data.childs;
            this.data4[0].departmentName = data.data.departmentName;
            this.data4[0].departmentId = data.data.departmentId;
            console.log(this.data4)
          }
        })
        .catch(err => {
          console.log(err, "/departmentManager/getDepartmentTreeNodes");
          _this.$msge("服务器异常，请稍后重试");
        });
    },
    checkMembers() {
      this.ischeckMembers = true;
    },
    //添加角色
    addDepartments() {
      console.log(200);
      this.isaddDepartments2 = true;
    },
    //注册弹框显示与否事件
    closenewcase() {
      this.$emit("Schedulingshow");
    },
    sure() {
      //console.log(22)
      this.$emit("sure");
    },
    cancel() {
      this.$emit("cancel");
    },

    /*树形控件添加节点，添加弹窗出现*/
    appendEvent(s, d, n) {
      this.addEventdialogVisible = true;
      this.triggerCurrenNodeData = d;
      this.triggerCurrenNode = n;
    },
    /*树形控件删除节点*/
    removeEvent() {
      var s = this.object;
      var d = this.NodeData;
      const parent = d.parent;
      if (!this.choicecourtstatues) {
        this.$msgw("请您选择部门");
        return;
      }
      console.log(s);
      if (s.childs.length > 0) {
        this.$msgw("不能删除带有节点的部门");
        return;
      }
      const children = parent.childNodes || parent.data;
      const index = children.findIndex(data => data.id === d.id);
      console.log(index, "索引");
      this.$confirm("确定要删除该节点吗？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("/departmentManager/deleteDepartmentTreeNode", {
              id: s.departmentId
            })
            .then(res => {
              console.log(res);
              if (res.code === 200) {
                //children.splice(index, 1);
                this.getDepartmentTreeNodes();
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //添加部门
    addevent() {
      if (!this.choicecourtstatues) {
        this.$msgw("请您选择部门");
        return;
      }
      this.isaddDepartments2 = true;
    },
    //9.12查询部门下人员分页信息
    lookcheckMembers() {
      if (!this.choicecourtstatues) {
        this.$msgw("请您选择部门");
        return;
      }
      this.ischeckMembers = true;
      this.childdepartmentId = this.object.departmentId;
    },
    updateEventForm() {
      if (!this.choicecourtstatues) {
        this.$msgw("请您选择部门");
        return;
      }
      this.isaddDepartments2 = true;
      this.businessDepartment = this.object.businessDepartment;
      this.description = this.object.description;
      this.departmentName = this.object.departmentName;
      console.log(
        this.businessDepartment,
        this.description,
        this.departmentName
      );
    },
    //修改部门树子结构
    updateEventFormSubmitBtn(formLabelAlign) {
      console.log(formLabelAlign);
      console.log(this.object);
      var s = this.object;
      var d = this.NodeData;
      const parent = d.parent;
      const children = parent.childNodes || parent.data;
      const index = children.findIndex(data => data.id === d.id);

      this.isaddDepartments2 = false;
      let _this = this;
      _this.$http
        .post("/departmentManager/saveDepartmentTreeNode", {
          departmentName: formLabelAlign.departmentName,
          description: formLabelAlign.description,
          businessDepartment: formLabelAlign.businessDepartment,
          parentDepartmentId: _this.object.parentDepartmentId,
          leaf: true,
          departmentId: _this.object.departmentId
        })
        .then(data => {
          console.log(data);
          if (data.code === 200) {
            _this.getDepartmentTreeNodes();
          }
        })
        .catch(err => {
          console.log(err, "/departmentManager/saveDepartmentTreeNode");
          _this.$msge("服务器异常，请稍后重试");
        });
    },
    /*9.15添加部门树子结构*/
    addEventFormSubmitBtn(formLabelAlign) {
      console.log(formLabelAlign);
      console.log(this.object);
      this.isaddDepartments2 = false;
      let _this = this;
      _this.$http
        .post("/departmentManager/saveDepartmentTreeNode", {
          departmentName: formLabelAlign.departmentName,
          description: formLabelAlign.description,
          businessDepartment: formLabelAlign.businessDepartment,
          parentDepartmentId: _this.object.departmentId,
          leaf: true
        })
        .then(data => {
          console.log(data);
          if (data.code === 200) {
            _this.getDepartmentTreeNodes();
          }
        })
        .catch(err => {
          console.log(err, "/departmentManager/saveDepartmentTreeNode");
          _this.$msge("服务器异常，请稍后重试");
        });
    }
  }
};
</script>
      
<style lang='less'>
.DepartmentManagement {
  .head {
    padding: 0.2rem 0 0.1rem;
  }
  padding: 0 0.2rem;
  /*操作颜色*/
  div.isedit {
    color: #409eff;
  }
  /*操作颜色*/
  div.isedit span {
    color: #409eff;
  }
  .el-tree-node__content {
    height: 0.5rem;
    line-height: 0.5rem;
  }
}
</style>