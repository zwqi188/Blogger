<template>
  <div class='tinymce'>
    <span class="tag-group-title">文章标题:</span>
    <el-input v-model="articleTitle" placeholder="请输入文章标题"></el-input>
    <span class="tag-group-title">文章正文:</span>
    <editor id='tinymce' v-model='tinymceHtml' :init='init'></editor>
    <div>{{tinymceHtml}}</div>
    <el-link>文章分类:</el-link>
    <el-select v-model="articleType" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-link>是否匿名:</el-link>
    <el-switch
      v-model="isHidden"
      active-color="#13ce66"
      inactive-color="#ff4949">
    </el-switch>
    <el-button type="primary" @click="uploadArticleFromServer()">发表</el-button>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/footer'
import Aside from '@/components/layout/aside'
import RequestUrl from '@/utils/RequestUrl'
import HTTP from '@/utils/HttpUtils'

export default {
  name: 'index',
  data: function () {
    return {
      tinymceHtml: '请输入内容',
      articleTitle: '',
      articleType: 2,
      options: [{'label': '生活剪影', 'value': 2}, {'label': '学习笔记', 'value': 1}, {'label': '福利专区', 'value': 3}],
      isHidden: true,
      init: {
        language_url: 'static/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: 'static/tinymce/skins/ui/oxide',
        height: 800,
        plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
        toolbar: 'undo redo | bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | table | link image code | removeformat',
        branding: false,
        menubar: false,
        images_upload_base_path: '',
        images_upload_credentials: false,
        automatic_uploads: false,
        images_upload_url: RequestUrl.SERVER_ADDRESS + RequestUrl.UPLOAD_IMAGE,
        file_picker_types: 'image'
      }
    }
  },
  components: {
    Editor,
    'v-header': Header,
    'v-footer': Footer,
    'v-aside': Aside
  },
  mounted () {
    tinymce.init({})
  },
  methods: {
    uploadArticleFromServer: function () {
      if (!this.articleTitle) {
        alert('请输入文章标题')
        return
      }
      if (!this.tinymceHtml) {
        alert('请输入文章内容')
        return
      }
      let params = {
        articleContent: this.tinymceHtml,
        articleType: this.articleType,
        articleTitle: this.articleTitle,
        masterId: 1
      }
      console.log(params)
      HTTP.post(RequestUrl.UPLOAD_ARTICLE, params, response => {
        if (response.status >= 200 && response.status < 300) {
          alert(response.data)
        } else {
          alert(response.message)
        }
      })
    }
  }
}
</script>

<style scoped>
  .tag-group-title {
    float: left;
  }
</style>
