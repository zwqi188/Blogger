<template>
  <div class="markdown">
    <div class="container">
      <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px"/>
    </div>
  </div>
</template>

<script>
import RequestUrl from '@/utils/RequestUrl'

export default {
  name: '',
  props: {
    value: {
      type: [String],
      required: true
    }
  },
  model: {
    event: 'change',
    prop: 'value'
  },
  components: {
  },
  data () {
    return {
      content: '',
      html: '',
      configs: {}
    }
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd (pos, $file) {
      let formdata = new FormData()
      this.http.post(RequestUrl.UPLOAD_IMAGE, formdata).then(res => {
        this.$refs.md.$img2Url(pos, res.location)
      }).catch(err => {
        console.log(err)
        this.$message.error(err)
      })
    },
    // 所有操作都会被解析重新渲染
    change (value, render) {
      // render 为 markdown 解析后的结果[html]
      // this.html = render
      this.$emit('change', this.content)
    }
  },
  mounted () {

  }
}
</script>
