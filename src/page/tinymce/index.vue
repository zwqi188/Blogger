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
          </el-main>
        </el-container>
        <el-aside width="350px">
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

export default {
  name: 'index',
  data () {
    return {
      tinymceHtml: '请输入内容',
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
        images_upload_url: 'http://localhost:9999/uploadImage.json',
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
    tinymce.init({
    })
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
</style>
