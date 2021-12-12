<template>
  <div class="apply-base">
    <div class="apply-header">
      <div class="header-icon">3</div>
      <div class="header-title">现宅基地情况</div>
      <div class="header-page">3/5</div>
    </div>
    <div class="info-message">
      <div class="info-title">现宅基地及农房情况</div>
      <div class="info-form">
        <van-form label-width="40%" @submit="onSubmit">
          <van-cell-group inset>
            <van-field
              v-model="homeForm.value1"
              label="宅基地面积"
              placeholder="宅基地面积"
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="homeForm.value2"
              label="人均宅基地面积"
              placeholder="人均宅基地面积"
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="homeForm.value3"
              label="权属证书号"
              placeholder="权属证书号"
            >
            </van-field>
            <van-field
              v-model="homeForm.value4"
              label="建筑面积"
              placeholder="建筑面积"
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="homeForm.value5"
              label="人均建筑面积"
              placeholder="人均建筑面积"
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="homeForm.value6"
              label="权属证书号"
              placeholder="权属证书号"
            >
            </van-field>
            <van-field label="现宅基地处置情况" label-width="100%"></van-field>
            <van-field name="radio">
              <template #input>
                <van-radio-group
                  v-model="homeForm.value7"
                  direction="horizontal"
                >
                  <van-radio name="1">保留</van-radio>
                  <van-radio name="2">退还村集体</van-radio>
                  <van-radio name="3">其他</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </van-cell-group>
        </van-form>
      </div>
    </div>
    <div class="info-message">
      <div class="info-title">拟申请宅基地及建房情况</div>
      <div class="info-form">
        <van-form label-width="45%" @submit="onSubmit">
          <van-cell-group inset>
            <van-field
              v-model="form.value1"
              label="中华街道"
              placeholder="中华街道"
            >
            </van-field>
            <van-field
              v-model="form.value2"
              label="宅基地面积"
              placeholder="宅基地面积"
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="form.value3"
              readonly
              label="西至"
              placeholder="西至"
              @click="toWest"
            >
              <template #extra>
                <van-icon class="form-icon" name="arrow" size="20" />
              </template>
            </van-field>
            <van-field
              v-model="form.value4"
              label="建设用地"
              placeholder="建设用地"
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="form.value5"
              label="未利用地"
              placeholder="未利用地"
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="form.value6"
              label="农用地"
              placeholder="农用地"
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field v-model="form.value7" label="耕地" placeholder="耕地">
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field v-model="form.value8" label="林地" placeholder="林地">
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="form.value9"
              label="建筑面积"
              placeholder="建筑面积"
            >
              <template #extra>
                <div>m<sup>2</sup></div>
              </template>
            </van-field>
            <van-field
              v-model="form.value10"
              label="建筑层数"
              placeholder="建筑层数"
            >
            </van-field>
            <van-field
              v-model="form.value11"
              label="建筑高度"
              placeholder="建筑高度"
            >
            </van-field>
            <van-field label="设计图纸"></van-field>
            <van-field name="radio">
              <template #input>
                <van-radio-group v-model="form.checked1" direction="horizontal">
                  <van-radio name="1">委托设计</van-radio>
                  <van-radio name="2">选通用图</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field
              label="是否征求相邻权利人意见"
              label-width="100%"
            ></van-field>
            <van-field name="radio">
              <template #input>
                <van-radio-group v-model="form.checked2" direction="horizontal">
                  <van-radio name="1">是</van-radio>
                  <van-radio name="2">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </van-cell-group>
        </van-form>
      </div>
    </div>
    <div class="footer-btn">
      <div>
        <van-button block to="/build-apply/apply-info">上一步</van-button>
      </div>
      <div>
        <van-button block @click="onSubmit">保存</van-button>
      </div>
      <div>
        <van-button block type="primary" to="/build-apply/build-info">下一步</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import $localStorage from '@/utils/localStorage.js'
export default {
  setup() {
    const router = useRouter();
    const homeForm = reactive({});
    const form = reactive({});
    const state = reactive({});
    const onSubmit = () => {
      console.log("onSubmit");
      Toast.success("保存到草稿箱");
    };
    const goNext = () => {
      router.push({
        path: "",
      });
    };
    const toWest = () => {
      router.push({
        path: "",
      });  
    }
    return {
      form,
      homeForm,
      state,
      onSubmit,
      goNext,
      toWest,
    };
  },
};
</script>

<style lang="less" scoped>
.apply-base {
  background-color: #f0f2f5;
  overflow: auto;
  font-family: Microsoft YaHei;
}
.apply-header {
  display: flex;
  .header-icon {
    // flex: 1 0;
    margin: 18px;
    width: 45px;
    height: 45px;
    background: #3487f6;
    border-radius: 50%;
    font-size: 27px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    line-height: 45px;
  }
  .header-title {
    flex: 4 0;
    font-size: 26px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #252d42;
    line-height: 80px;
  }
  .header-page {
    flex: 1 0;
    font-size: 18px;
    font-family: Microsoft YaHei;
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
  .form-icon {
    margin-top: 5px;
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