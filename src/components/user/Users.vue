<template>
  <div>
    <!-- 面包学导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 搜索与显示区域 -->

      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query"  clearable @clear="getUserList()">
            <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- y用户列表区域 -->
      <el-table :data="userdata" border stripe>
        <!-- type =index 就是索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template slot-scope="scope">
            <!-- scope.row 为当前行的字典数据 -->
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)" ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
            <el-button type="warning" icon="el-icon-setting" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1,2,5,10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import service from "../../service/BaseDao";
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      userdata: [],
      total: 0
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      service.post("/user/user-list/", this.queryInfo).then(data => {
        if (data.state != 1) return this.$message.error("获取用户列表失败");
        this.userdata = data.data;
        this.total = data.total;
        // console.log(data);
      });
    },
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize;
      this.getUserList();
      // console.log(newsize);
    },
    // 监听页码值 改变时间
    handleCurrentChange(page) {
      this.queryInfo.pagenum = page;
      this.getUserList();
    },

    //用户状态改变
    userStateChanged(userinfo) {
      // console.log(userinfo)
    }
  }
};
</script>


<style lang="less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
.el-pagination {
  margin-top: 15px;
}
</style>