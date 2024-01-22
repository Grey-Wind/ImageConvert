<script setup>
import IntroduceItem from './IntroduceItem.vue'
import ImageConverterIcon from '../icons/IconImageConverter.vue'
</script>

<template>
    <IntroduceItem>
        <template #icon>
          <ImageConverterIcon />
        </template>
        <template #heading>图像转换器</template>
        <p>图像转换器可以快速将不同类型的图片转换成您所需要的格式。</p>
      </IntroduceItem>
</template>
