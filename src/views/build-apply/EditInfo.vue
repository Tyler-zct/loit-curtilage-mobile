<template>
  <div class="edit-info">
    <div class="info-message">
      <div class="info-title" v-if="type === 'add'">新增家庭成员</div>
      <div class="info-header" v-else>
        <div class="left">编辑家庭成员信息</div>
        <div class="right" @click="delUser">删除称员</div>
      </div>
      <div class="info-form">
        <van-form label-width="35%" @submit="onSubmit">
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
              v-model="relation"
              label="与申请人关系"
              placeholder="与申请人关系"
            />
            <van-field
              v-model="cardNum"
              label="身份证号"
              placeholder="身份证号"
              :rules="[{ required: true, message: '请填写身份证号' }]"
            />
            <van-field
              v-model="location"
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
        <van-button block type="primary" native-type="submit">
          保存
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref, toRefs } from "vue";
import { useRoute,useRouter } from "vue-router";
import { Toast } from "vant";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const showPicker = ref(false);
    const name = ref("");
    const sex = ref("");
    const age = ref("");
    const relation = ref("");
    const cardNum = ref("");
    const location = ref("");
    const columns = ["男", "女"];
    const state = reactive({
      userId: "",
      type: "",
    });
    onMounted(() => {
      init();
    });

    const init = async () => {
      Toast.loading({ message: "加载中...", forbidClick: true });
      const { id, type } = route.query;
      state.userId = id;
      state.type = type;
      console.log(state);
      Toast.clear();
    };
    const delUser = () => {
      console.log("删除成员!");
    };
    const toCancel = () => {
      router.push({
          path:'/build-apply/apply-info'
      })
    }
    const onConfirm = (value) => {
      sex.value = value;
      showPicker.value = false;
    };
    return {
      name,
      sex,
      age,
      relation,
      cardNum,
      location,
      showPicker,
      columns,
      ...toRefs(state),
      delUser,
      onConfirm,
      toCancel,
    };
  },
};
</script>

<style lang="less" scoped>
.edit-info {
  background-color: #f0f2f5;
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