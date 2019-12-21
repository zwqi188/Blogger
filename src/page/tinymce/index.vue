<template>
  <div class='tinymce'>
    <el-container>
      <el-header>
        <v-header></v-header>
      </el-header>
      <el-header>
        <v-breadCrumb></v-breadCrumb>
      </el-header>
      <el-container>
        <el-container>
          <el-main>
            <editor id='tinymce' v-model='tinymceHtml' :init='init'></editor>
            <div>{{tinymceHtml}}</div>
            <el-row>
              <el-link>文章分类:</el-link><el-select v-model="articleType" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-row>
            <el-row>
              <el-link>是否匿名:</el-link>
              <el-switch
                v-model="isHidden"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-row>
            <el-row>
              <el-button type="primary" @click="uploadArticleFromServer()">发表</el-button>
            </el-row>
          </el-main>
        </el-container>
        <el-aside width="17%">
          <v-aside></v-aside>
        </el-aside>
      </el-container>
      <el-container>
        <el-footer>
          <v-footer></v-footer>
        </el-footer>
      </el-container>
    </el-container>
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
import breadCrumb from '@/components/layout/breadcrumb'
import RequestUrl from '@/utils/RequestUrl'
import HTTP from '@/utils/HttpUtils'

export default {
  name: 'index',
  data () {
    return {
      tinymceHtml: '请输入内容',
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
    'v-aside': Aside,
    'v-breadCrumb': breadCrumb
  },
  mounted () {
    tinymce.init({})
  },
  methods: {
    handleImgUpload (blobInfo, success, failure) {
      let formdata = new FormData()
      formdata.set('upload_file', blobInfo.blob())
      console.log('handleImgUpload')
      // axios.post('/api/upload', formdata).then(res => {
      //     success(res.data.data.src)
      // }).catch(res => {
      //     failure('error')
      // })
    },
    images_upload_handler: (blobInfo, success, failure) => {
      console.log('images_upload_handler')
      this.handleImgUpload(blobInfo, success, failure)
    },
    file_picker_callback: function (callback, value, meta) {
      // Provide image and alt text for the image dialo
      // eslint-disable-next-line eqeqeq
      console.log('file_picker_callback')
      if (meta.filetype === 'image') {

        // 触发input的click事件，并取得file对象
        // 进行ajax上传图片
        // 在上传成功的回调函数中，调用callback(uploadedImageUrl);
      }
    },
    uploadArticleFromServer: () => {
      let params = {
        articleContent: this.tinymceHtml,
        articleType: this.articleType,
        articleTitle: 'test',
        masterId: 1
      }
      HTTP.post(RequestUrl.UPLOAD_ARTICLE, params, response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data)
        } else {
          console.log(response.message)
        }
      })
    }
  }
}
</script>

<style scoped>
  .el-header, .el-footer {
    margin: 0px;
    padding: 0px;
    width: 100%;
    text-align: center;
    line-height: 90px;
  }
  .el-row {
    padding-top: 20px;
    padding-left: 10px;
  }
</style>
