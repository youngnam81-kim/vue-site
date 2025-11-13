<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal-content">
      <!-- <div class="modal-header">
        <h3>id : {{ id }}</h3>
        <button class="close-btn" @click="closeModal">×</button>
      </div> -->
      <div class="modal-header border-no">
        <h3>{{ title }}</h3>
        <button class="close-btn" @click="closeModal">x</button>
      </div>
      <div class="modal-body">
        <p>{{ message }}</p>
        <slot></slot>
      </div>
      <div class="modal-footer border-no">
        <slot name="footer border-no">
          <button @click="closeModal">확인</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id:{
      type: String,
      default: '모달 기본 id' 
    },
    title: {
      type: String,
      default: '모달 기본 title'
    },
    message: {
      type: String,
      default: '모달 기본 message'
    },
    data: {
      type: [Object, Array, String, Number],
      default: null
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    closeGlobalModal() {
      isModalVisible = false;
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  max-width: 600px;
  width: 80%;
  padding: 20px;
}

.modal-header{
  display: flex;
  justify-content: space-between;
}

.modal-footer{
  text-align: center;
}

.close-btn{
  padding: 10px;
  margin: 10px;
  margin-right: 0px;
}

.modal-body{
  min-height: 400px;
  width: 100%;
}
</style>