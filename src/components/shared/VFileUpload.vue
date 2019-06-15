<template>
  <v-layout>
    <v-flex
      xs12
      class="text-xs-center text-sm-center text-md-center text-lg-center">
      <v-text-field
        v-model="imageName"
        label="Select Image"
        append-outer-icon="attach_file"
        @click="pickFile"/>
      <input
        ref="image"
        type="file"
        style="display: none"
        accept="image/*"
        @change="onFilePicked"
      >
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      imageName: '',
      imageUrl: '',
      imageFile: ''
    }
  },

  methods: {
    pickFile () {
      this.$refs.image.click()
    },
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) return
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
          this.$emit('file-picked', {
            file: this.imageFile,
            url: this.imageUrl
          })
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
