<template>
  <div class="edit-info">
    <div class="info-message">
      <div class="info-title" v-if="type === 'add'">新增家庭成员</div>
      <div class="info-header" v-else>
        <div class="left">编辑家庭成员信息</div>
        <div class="right" @click="delUser">删除称员</div>
      </div>
      <div class="info-form">
        <van-form label-width="35%">
          <van-cell-group inset>
            <van-field
              v-model="name"
              label="姓名"
              placeholder="姓名"
              :rules="[{ required: true, message: '请填写姓名' }]"
            />
            <van-field
              readonly
              v-model="sex"
              is-link
              name="picker"
              label="性别"
              placeholder="点击选择性别"
              @click="showPicker = true"
            />
            <van-popup v-model:show="showPicker" position="bottom">
              <van-picker
                :columns="columns"
                @confirm="onConfirm"
                @cancel="showPicker = false"
              />
            </van-popup>
            <van-field v-model="age" label="年龄" placeholder="年龄" />
            <van-field
              v-model="applyRelationship"
              label="与申请人关系"
              placeholder="与申请人关系"
            />
            <van-field
              v-model="idcard"
              label="身份证号"
              placeholder="身份证号"
              :rules="[{ required: true, message: '请填写身份证号' }]"
            />
            <van-field
              v-model="registeredResidence"
              label="户口所在地"
              placeholder="户口所在地"
            />
          </van-cell-group>
        </van-form>
      </div>
    </div>
    <div class="footer_btn">
      <div>
        <van-button block @click="toCancel">取消</van-button>
      </div>
      <div>
        <van-button block type="primary" @click="onSave"> 保存 </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { Toast } from "vant";
import { Dialog } from "vant";
import $localStorage from "@/utils/localStorage.js";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const showPicker = ref(false);
    const columns = ["男", "女"];
    const state = reactive({
      name: "",
      age: "",
      sex: "",
      applyRelationship: "",
      idcard: "",
      registeredResidence: "",
      userId: "",
      type: "",
      familyMemberList: [],
    });
    onMounted(() => {
      init();
    });

    const init = async () => {
      const { id, type } = route.query;
      state.userId = +id;
      state.type = type;
      state.familyMemberList = JSON.parse(
        $localStorage.get("familyMemberList")
      );
      console.log(state.familyMemberList);
      if (state.familyMemberList) {
        state.familyMemberList.forEach((res) => {
          if (res.id === state.userId) {
            state.name = res.name;
            state.age = res.age;
            state.sex = res.sex;
            state.applyRelationship = res.applyRelationship;
            state.idcard = res.idcard;
            state.registeredResidence = res.registeredResidence;
          }
        });
      } else {
        state.familyMemberList = [];
      }
    };
    const goRoute = () => {
      $localStorage.set("familyMemberList", state.familyMemberList);
      router.push({
        path: "/build-apply/apply-info",
      });
    };
    const delUser = () => {
      Dialog.confirm({
        title: "标题",
        message: "确认删除该成员吗?",
      }).then(() => {
        state.familyMemberList = state.familyMemberList.filter(
          (res) => res.id !== state.userId
        );
        goRoute();
      });
    };
    const toCancel = () => {
      router.push({
        path: "/build-apply/apply-info",
      });
    };
    const onConfirm = (value) => {
      state.sex = value;
      showPicker.value = false;
    };
    // 保存
    const onSave = () => {
      console.log(state.type);
      if (state.type === "add") {
        const form = {};
        form.name = state.name;
        form.sex = state.sex;
        form.age = state.age;
        form.applyRelationship = state.applyRelationship;
        form.idcard = state.idcard;
        form.registeredResidence = state.registeredResidence;
        form.id = state.familyMemberList ? state.familyMemberList.length : 0;
        state.familyMemberList.push(form);
        console.log(state.familyMemberList);
      } else {
        state.familyMemberList.forEach((res) => {
          if (res.id === state.userId) {
            res.name = state.name;
            res.age = state.age;
            res.sex = state.sex;
            res.applyRelationship = state.applyRelationship;
            res.idcard = state.idcard;
            res.registeredResidence = state.registeredResidence;
          }
        });
      }
      goRoute();
    };
    return {
      showPicker,
      columns,
      ...toRefs(state),
      delUser,
      onConfirm,
      toCancel,
      onSave,
      goRoute,
    };
  },
};
</script>

<style lang="less" scoped>
.edit-info {
  background-color: #f6fbfa;
  font-family: Microsoft YaHei;
}
.info-message {
  background: #ffffff;
  border-radius: 15px;
  margin: 20px;
  .info-title {
    padding: 15px;
    font-size: 18px;
    font-weight: bold;
    color: #2e3f6a;
    border-bottom: 1px solid #dee1eb;
  }
  .info-form {
    padding-bottom: 10px;
  }
  .info-header {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    .left {
      font-size: 18px;
      font-weight: bold;
      color: #2e3f6a;
    }
    .right {
      font-size: 16px;
      font-weight: 400;
      color: #ff0000;
    }
  }
  .info-user {
    padding-bottom: 20px;
  }
}
.footer_btn {
  margin: 20px;
  display: flex;
  justify-content: space-between;
  div {
    width: 48%;
  }
}
</style>