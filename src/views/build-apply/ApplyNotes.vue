<template>
  <div class="apply-notes">
    <div class="apply-header">
      <div class="header-icon">1</div>
      <div class="header-title">申请须知</div>
      <div class="header-page">1/{{ pageSize }}</div>
    </div>
    <div class="apply-condition">
      <div class="condition-header">申请条件</div>
      <div v-for="item in applyList" :key="item.id">
        <div class="title">{{ item.title }}</div>
        <ol class="content">
          <li v-for="res in item.list" :key="res.id">
            {{ res.content }}
          </li>
        </ol>
      </div>
    </div>
    <div class="apply-material">
      <div class="material-header">
        <div class="title">申报材料</div>
        <div class="more">请去乡镇领取后填写上传</div>
      </div>
      <div class="material-content">
        <ol>
          <li v-for="item in materialList" :key="item.id">
            {{ item.content }}
          </li>
        </ol>
      </div>
    </div>
    <div class="time-limit">
      <div class="title">办理时限</div>
      <div class="des">{{ jobDay }}个工作日</div>
    </div>
    <div class="footer-btn">
      <van-button type="primary" round block @click="goNext"
        >我已阅读上述内容，下一步</van-button
      >
    </div>
  </div>
</template>

<script>
import { reactive,toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const state = reactive({
      pageSize: 5,
      jobDay: 35,
      applyList: [
        {
          id: 1,
          title: "一、申请宅基地符合下列条件之一的，予以批准:",
          list: [
            {
              id: 0,
              content:
                "因无住宅或现有住宅宅基地面积明显低于法定标准，需要新建或扩建住宅的。",
            },
            {
              id: 1,
              content: "同户中兄弟姐妹或者子女已达到法定结婚年龄要求分户的。",
            },
            {
              id: 2,
              content:
                "因国家或者集体建设、实施镇乡、村庄规划以及进行公共设施与公益事业建设，需要拆迁安置的。",
            },
            { id: 3, content: "因发生或防御自然灾害，需要安置的。" },
            { id: 4, content: "原有住宅属D级危房需要拆除重建的。" },
            { id: 5, content: "向中心村、集镇或者农村住宅小区集聚的。" },
            { id: 6, content: "村民自愿退还全部旧宅基地的。" },
            { id: 7, content: "县政府批准同意的其他情形。" },
          ],
        },
        {
          id: 0,
          title: "二、申请宅基地有下列情形之一的，不予批准:",
          list: [
            {
              id: 0,
              content:
                "现有宅基地面积虽明显低于法定标准，但现有人均住宅建筑面积超过60平方米的；分户前人均住宅建筑面积已超过60平方米的。",
            },
            {
              id: 1,
              content: "年龄未满18周岁的。",
            },
            {
              id: 2,
              content:
                "申请的宅基地不符合乡镇国土空间规划、村庄规划或涉及占用永久基本农田、位于地质灾害隐患点的。",
            },
            {
              id: 3,
              content:
                "将原宅基地出卖、出租、赠与他人或擅自改作生产经营用途的。",
            },
            {
              id: 4,
              content:
                "农村村民申请异地新建住宅，不同意将旧宅基地退回村集体的。",
            },
            { id: 5, content: "其他不符合法律法规及政策规定的情形。" },
          ],
        },
      ],
      materialList: [
        { id: 0, content: "农村宅基地使用承诺书" },
        {
          id: 1,
          content: "股权证复印件、申请人身份证复印件、家庭成员户口本复印件",
        },

        {
          id: 2,
          content: "个人建房用地界限申请表（在红线图复印件四至签字盖章）",
        },

        {
          id: 3,
          content:
            "住宅建设用地规划红线图（地类不明确的需勘测定界报告、勘测定界图）",
        },
        { id: 4, content: "无宅基地证明（无旧宅基地的提供）" },
        { id: 5, content: "房屋设计图" },
        { id: 6, content: "危房鉴定书（原房屋为危房提供）" },
        { id: 7, content: "村民小组同意书" },
        {
          id: 7,
          content:
            "与相邻权利人签订的书面协议或相邻权利人在房屋设计图上签字确认的材料",
        },
        { id: 7, content: "村协议（传统保护村落或有特定要求的村落提供）" },
      ],
    });
    const goNext = () => {
      router.push({
        path: "/build-apply/apply-info",
      });
    };
    return {
     ...toRefs(state),
      goNext,
    };
  },
};
</script>

<style lang="less" scoped>
.apply-notes {
  background-color: #f6fbfa;
  overflow: auto;
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
.apply-condition {
  margin: 0 20px 20px 20px;
  padding: 15px;
  //   height: 412px;
  background: #ffffff;
  border-radius: 15px;
  .condition-header {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #2e3f6a;
    line-height: 20px;
  }
  .title {
    padding: 10px 0;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #3487f6;
    // line-height: 30px;
  }
  ol {
    list-style: decimal;
  }
  .content {
    margin-left: 15px;
    li {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #2e3f6a;
      padding: 5px 0;
    }
  }
}
.apply-material {
  ol {
    list-style: decimal;
  }
  margin: 20px;
  padding: 15px;
  background: #ffffff;
  border-radius: 15px;
  .material-header {
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #dee1eb;
    .title {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #2e3f6a;
    }
    .more {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #3487f6;
    }
  }
  .material-content {
    margin-left: 15px;
    li {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #2e3f6a;
      padding: 5px 0;
    }
  }
}
.time-limit {
  margin: 20px;
  padding: 15px;
  background: #ffffff;
  border-radius: 15px;
  .title {
    padding-bottom: 10px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #2e3f6a;
    border-bottom: 1px solid #dee1eb;
  }
  .des {
    padding: 10px 0;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #2e3f6a;
  }
}
.footer-btn {
  margin: 20px;
}
</style>