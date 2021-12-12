<template>
  <div class="apply-info">
    <div class="apply-header">
      <div class="header-icon">2</div>
      <div class="header-title">申请人员信息</div>
      <div class="header-page">2/{{ pageSize }}</div>
    </div>
    <div class="info-message">
      <div class="info-title">申请人信息</div>
      <div class="info-form">
        <van-form label-width="30%" @submit="onSubmit">
          <van-cell-group inset>
            <van-field
              v-model="applyForm.name"
              label="姓名"
              placeholder="姓名"
              :rules="[{ required: true, message: '请填写姓名' }]"
            />
            <van-field
              readonly
              v-model="applyForm.sex"
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
              v-model="applyForm.cardNum"
              label="身份证号"
              placeholder="身份证号"
              :rules="[{ required: true, message: '请填写身份证号' }]"
            />
            <van-field
              v-model="applyForm.location"
              label="户口所在地"
              placeholder="户口所在地"
            />
            <van-field
              v-model="applyForm.address"
              label="家庭住址"
              placeholder="家庭住址"
            />
            <van-field
              v-model="applyForm.homeNum"
              label="家庭人口数"
              placeholder="家庭人口数"
            />
          </van-cell-group>
        </van-form>
      </div>
    </div>
    <div class="info-message">
      <div class="info-header">
        <div class="left">家庭成员信息</div>
        <div class="right" @click="handleToEdit(0, 'add')">新增</div>
      </div>
      <div class="info-user">
        <van-cell
          v-for="item in userList"
          :key="item.id"
          is-link
          :title="item.name"
          @click="handleToEdit(item.id, 'edit')"
        />
      </div>
    </div>
    <div class="footer-btn">
      <div>
        <van-button block to="/build-apply/apply-notes">上一步</van-button>
      </div>
      <div>
        <van-button block @click="onSubmit">保存</van-button>
      </div>
      <div>
        <van-button block type="primary" @click="goNext">下一步</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
export default {
  setup() {
    const router = useRouter();
    const showPicker = ref(false);
    const columns = ["男", "女"];
    const applyForm = reactive({})
    const state = reactive({
      pageSize: 5,
      userList: [
        {
          id: 0,
          name: "陆辰",
        },
        {
          id: 1,
          name: "张文丽",
        },
        {
          id: 2,
          name: "陆小茗",
        },
      ],
    });
    const onConfirm = (value) => {
      applyForm.sex = value;
      showPicker.value = false;
    };
    const onSubmit = () => {
      console.log("onSubmit");
      Toast.success("保存到草稿箱");
    };
    const goNext = () => {
      router.push({
        path: "/build-apply/apply-base",
      });
    };
    const handleToEdit = (id, type) => {
      router.push({
        path: `/build-apply/edit-info`,
        query: { id: id, type: type },
      });
    };
    return {
      applyForm,
      showPicker,
      columns,
      ...toRefs(state),
      goNext,
      onConfirm,
      onSubmit,
      handleToEdit,
    };
  },
};
</script>

<style lang="less" scpoed>
.apply-info {
  background-color: #f0f2f5;
  overflow: auto;
  font-family: Microsoft YaHei;
}
.apply-header {
  display: flex;
  .header-icon {
    margin: 18px;
    width: 45px;
    height: 45px;
    background: #3487f6;
    border-radius: 50%;
    font-size: 27px;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    line-height: 45px;
  }
  .header-title {
    flex: 4 0;
    font-size: 26px;
    font-weight: bold;
    color: #252d42;
    line-height: 80px;
  }
  .header-page {
    flex: 1 0;
    font-size: 18px;
    font-weight: 400;
    color: #252d42;
    line-height: 80px;
  }
}
.info-message {
  background: #ffffff;
  border-radius: 15px;
  margin: 0 20px 20px 20px;
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
      color: #3487f6;
    }
  }
  .info-user {
    padding-bottom: 20px;
  }
}
.footer-btn {
  margin: 30px;
  display: flex;
  div {
    width: 100%;
    margin-right: 10px;
  }
}
</style>