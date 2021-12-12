<template>
  <div class="apply-info">
    <div class="apply-header">
      <div class="header-icon">2</div>
      <div class="header-title">申请人员信息</div>
      <div class="header-page">2/5</div>
    </div>
    <div class="info-message">
      <div class="info-title">申请人信息</div>
      <div class="info-form">
        <van-form label-width="30%" @submit="onSubmit">
          <van-cell-group inset>
            <van-field
              v-model="applyName"
              label="姓名"
              placeholder="姓名"
              :rules="[{ required: true, message: '请填写姓名' }]"
            />
            <van-field
              readonly
              v-model="applySex"
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
            <van-field v-model="applyAge" label="年龄" placeholder="年龄" />
            <van-field
              v-model="applyIdcard"
              label="身份证号"
              placeholder="身份证号"
              :rules="[{ required: true, message: '请填写身份证号' }]"
            />
            <van-field
              readonly
              is-link
              name="area"
              v-model="result"
              label="户口所在地"
              placeholder="点击选择省市区"
              @click="showArea = true"
            />
            <van-popup v-model:show="showArea" position="bottom">
              <van-area
                :area-list="areaList"
                @confirm="onConfirmArea"
                @cancel="showArea = false"
              />
            </van-popup>
            <van-field
              v-model="applyHouseAddress"
              label="家庭住址"
              placeholder="家庭住址"
            />
            <van-field
              v-model="applyFamilySize"
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
          v-for="item in familyMemberList"
          :key="item.id"
          is-link
          :title="item.name"
          @click="handleToEdit(item.id, 'edit')"
        />
      </div>
    </div>
    <div class="footer-btn">
      <div>
        <van-button block @click="goBack">上一步</van-button>
      </div>
      <!-- <div>
        <van-button block @click="onSubmit">保存</van-button>
      </div> -->
      <div>
        <van-button block type="primary" @click="goNext">下一步</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { areaList } from "@vant/area-data";
import $localStorage from "@/utils/localStorage.js";
export default {
  setup() {
    const router = useRouter();
    // const route = useRoute();
    const showPicker = ref(false);
    const columns = ["男", "女"];
    const state = reactive({
      applyName: "",
      applySex: "",
      applyAge: "",
      applyIdcard: "",
      applyHouseAddress: "",
      applyFamilySize: "",
      applyProvince: "",
      applyCity: "",
      applyCounty: "",
      applyUserInfo: {},
      familyMemberList: [],
    });
    const result = ref("");
    const showArea = ref(false);
    onMounted(() => {
      init();
    });

    const init = async () => {
      state.applyUserInfo = JSON.parse($localStorage.get("applyUserInfo"));
      state.familyMemberList = JSON.parse(
        $localStorage.get("familyMemberList")
      );
      if (state.applyUserInfo) {
        state.applyName = state.applyUserInfo.applyName;
        state.applySex = state.applyUserInfo.applySex;
        state.applyAge = state.applyUserInfo.applyAge;
        state.applyIdcard = state.applyUserInfo.applyIdcard;
        state.applyHouseAddress = state.applyUserInfo.applyHouseAddress;
        state.applyFamilySize = state.applyUserInfo.applyFamilySize;
        state.applyCity = state.applyUserInfo.applyCity;
        state.applyProvince = state.applyUserInfo.applyProvince;
        state.applyCounty = state.applyUserInfo.applyCounty;
        result.value =
          state.applyProvince + "/" + state.applyCity + "/" + state.applyCounty;
      }
    };
    // 地区选择
    const onConfirmArea = (areaValues) => {
      console.log(areaValues);
      showArea.value = false;
      state.applyProvince = areaValues[0].code;
      state.applyCity = areaValues[1].code;
      state.applyCounty = areaValues[2].code;
      result.value = areaValues
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
    };
    // 性别选择
    const onConfirm = (value) => {
      state.applySex = value;
      showPicker.value = false;
    };
    const onSubmit = () => {
      console.log(state);
      Toast.success("保存到草稿箱");
    };
    const goBack = () => {
      saveLocal();
      router.push({
        path: "/build-apply/apply-notes",
      });
    };
    const goNext = () => {
      saveLocal();
      router.push({
        path: "/build-apply/apply-base",
      });
    };
    const saveLocal = () => {
      state.applyUserInfo = {};
      state.applyUserInfo.applyName = state.applyName;
      state.applyUserInfo.applySex = state.applySex;
      state.applyUserInfo.applyAge = state.applyAge;
      state.applyUserInfo.applyIdcard = state.applyIdcard;
      state.applyUserInfo.applyHouseAddress = state.applyHouseAddress;
      state.applyUserInfo.applyFamilySize = state.applyFamilySize;
      state.applyUserInfo.applyCity = state.applyCity;
      state.applyUserInfo.applyProvince = state.applyProvince;
      state.applyUserInfo.applyCounty = state.applyCounty;
      $localStorage.set("applyUserInfo", JSON.stringify(state.applyUserInfo));
    };

    const handleToEdit = (id, type) => {
      state.applyUserInfo = {};
      state.applyUserInfo.applyName = state.applyName;
      state.applyUserInfo.applySex = state.applySex;
      state.applyUserInfo.applyAge = state.applyAge;
      state.applyUserInfo.applyIdcard = state.applyIdcard;
      state.applyUserInfo.applyHouseAddress = state.applyHouseAddress;
      state.applyUserInfo.applyFamilySize = state.applyFamilySize;
      state.applyUserInfo.applyCity = state.applyCity;
      state.applyUserInfo.applyProvince = state.applyProvince;
      state.applyUserInfo.applyCounty = state.applyCounty;
      $localStorage.set("applyUserInfo", JSON.stringify(state.applyUserInfo));
      router.push({
        path: `/build-apply/edit-info`,
        query: { id: id, type: type },
      });
    };
    return {
      showPicker,
      columns,
      result,
      showArea,
      areaList,
      ...toRefs(state),
      goNext,
      onConfirm,
      onSubmit,
      handleToEdit,
      onConfirmArea,
      goBack,
    };
  },
};
</script>

<style lang="less" scpoed>
.apply-info {
  background-color: #f6fbfa;
  font-family: Microsoft YaHei;
  overflow: auto;
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